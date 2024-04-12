package run.halo.s3os;

import static run.halo.s3os.S3OsAttachmentHandler.MULTIPART_MIN_PART_SIZE;
import static run.halo.s3os.S3OsAttachmentHandler.checkResult;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import javax.imageio.ImageIO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.halo.app.plugin.ApiVersion;
import software.amazon.awssdk.services.s3.model.CompleteMultipartUploadRequest;
import software.amazon.awssdk.services.s3.model.CompletedMultipartUpload;
import software.amazon.awssdk.services.s3.model.CreateMultipartUploadRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.utils.SdkAutoCloseable;

@ApiVersion("s3os.halo.run/v1alpha1")
@RestController
@RequiredArgsConstructor
@Slf4j
public class PolicyConfigValidationController {
    private final S3OsAttachmentHandler handler;

    @PostMapping("/configmap/policy/validation")
    public Mono<Void> validatePolicyConfig(@RequestBody S3OsProperties properties) {
        var filename = "halo-s3-plugin-test-file-" + System.currentTimeMillis() + ".jpg";


        return createImage()
            .flatMap(bytes -> {
                DataBuffer dataBuffer = new DefaultDataBufferFactory().wrap(bytes);
                var content = Flux.just(dataBuffer);
                return Mono.using(() -> handler.buildS3Client(properties),
                    client -> {
                        var uploadState =
                            new S3OsAttachmentHandler.UploadState(properties, filename, false);

                        return handler.checkFileExistsAndRename(uploadState, client)
                            // init multipart upload
                            .flatMap(state -> Mono.fromCallable(() -> client.createMultipartUpload(
                                CreateMultipartUploadRequest.builder()
                                    .bucket(properties.getBucket())
                                    .contentType(state.contentType)
                                    .key(state.objectKey)
                                    .build())))
                            .doOnNext((response) -> {
                                checkResult(response, "createMultipartUpload");
                                uploadState.uploadId = response.uploadId();
                            })
                            .thenMany(handler.reshape(content, MULTIPART_MIN_PART_SIZE))
                            // buffer to part
                            .windowUntil((buffer) -> {
                                uploadState.buffered += buffer.readableByteCount();
                                if (uploadState.buffered >= MULTIPART_MIN_PART_SIZE) {
                                    uploadState.buffered = 0;
                                    return true;
                                } else {
                                    return false;
                                }
                            })
                            // upload part
                            .concatMap((window) -> window.collectList().flatMap((bufferList) -> {
                                var buffer = S3OsAttachmentHandler.concatBuffers(bufferList);
                                return handler.uploadPart(uploadState, buffer, client);
                            }))
                            .reduce(uploadState, (state, completedPart) -> {
                                state.completedParts.put(completedPart.partNumber(), completedPart);
                                return state;
                            })
                            // complete multipart upload
                            .flatMap((state) -> Mono.just(client.completeMultipartUpload(
                                CompleteMultipartUploadRequest
                                    .builder()
                                    .bucket(properties.getBucket())
                                    .uploadId(state.uploadId)
                                    .multipartUpload(CompletedMultipartUpload.builder()
                                        .parts(state.completedParts.values())
                                        .build())
                                    .key(state.objectKey)
                                    .build())
                            ))
                            // get object metadata
                            .flatMap((response) -> {
                                checkResult(response, "completeUpload");
                                return Mono.just(client.headObject(
                                    HeadObjectRequest.builder()
                                        .bucket(properties.getBucket())
                                        .key(uploadState.objectKey)
                                        .build()
                                ));
                            })
                            // check object metadata
                            .doOnNext((response) -> {
                                checkResult(response, "headObject");
                            })
                            // delete object
                            .flatMap((response) -> Mono.just(client.deleteObject(
                                software.amazon.awssdk.services.s3.model.DeleteObjectRequest.builder()
                                    .bucket(properties.getBucket())
                                    .key(uploadState.objectKey)
                                    .build()
                            )))
                            .doOnNext((response) -> checkResult(response, "deleteObject"))
                            .then();
                    },
                    SdkAutoCloseable::close);
            })
            .onErrorMap(S3ExceptionHandler::map);
    }

    private Mono<byte[]> createImage() {
        return Mono.fromCallable(() -> {
            BufferedImage image = new BufferedImage(250, 100, BufferedImage.TYPE_INT_RGB);
            Graphics2D g = image.createGraphics();
            g.setColor(Color.WHITE);
            g.fillRect(0, 0, 250, 100);
            g.setColor(Color.BLACK);
            g.drawString("Halo S3 plugin test, you can delete this file.", 0, 50);
            g.dispose();
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            ImageIO.write(image, "jpg", out);
            return out.toByteArray();
        });
    }
}
