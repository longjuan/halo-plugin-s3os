/* tslint:disable */
/* eslint-disable */
/**
 * Halo
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.18.0-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { LinkRequest } from '../models';
// @ts-ignore
import type { LinkResult } from '../models';
// @ts-ignore
import type { Policy } from '../models';
// @ts-ignore
import type { S3ListResult } from '../models';
/**
 * S3LinkControllerApi - axios parameter creator
 * @export
 */
export const S3LinkControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {LinkRequest} linkRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addAttachmentRecord: async (linkRequest: LinkRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'linkRequest' is not null or undefined
            assertParamExists('addAttachmentRecord', 'linkRequest', linkRequest)
            const localVarPath = `/apis/s3os.halo.run/v1alpha1/attachments/link`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(linkRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} policyName 
         * @param {number} pageSize 
         * @param {string} [continuationToken] 
         * @param {string} [continuationObject] 
         * @param {boolean} [unlinked] 
         * @param {string} [filePrefix] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listObjects: async (policyName: string, pageSize: number, continuationToken?: string, continuationObject?: string, unlinked?: boolean, filePrefix?: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'policyName' is not null or undefined
            assertParamExists('listObjects', 'policyName', policyName)
            // verify required parameter 'pageSize' is not null or undefined
            assertParamExists('listObjects', 'pageSize', pageSize)
            const localVarPath = `/apis/s3os.halo.run/v1alpha1/objects/{policyName}`
                .replace(`{${"policyName"}}`, encodeURIComponent(String(policyName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (continuationToken !== undefined) {
                localVarQueryParameter['continuationToken'] = continuationToken;
            }

            if (continuationObject !== undefined) {
                localVarQueryParameter['continuationObject'] = continuationObject;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }

            if (unlinked !== undefined) {
                localVarQueryParameter['unlinked'] = unlinked;
            }

            if (filePrefix !== undefined) {
                localVarQueryParameter['filePrefix'] = filePrefix;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listS3Policies: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/apis/s3os.halo.run/v1alpha1/policies/s3`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * S3LinkControllerApi - functional programming interface
 * @export
 */
export const S3LinkControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = S3LinkControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {LinkRequest} linkRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addAttachmentRecord(linkRequest: LinkRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LinkResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addAttachmentRecord(linkRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['S3LinkControllerApi.addAttachmentRecord']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} policyName 
         * @param {number} pageSize 
         * @param {string} [continuationToken] 
         * @param {string} [continuationObject] 
         * @param {boolean} [unlinked] 
         * @param {string} [filePrefix] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listObjects(policyName: string, pageSize: number, continuationToken?: string, continuationObject?: string, unlinked?: boolean, filePrefix?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<S3ListResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listObjects(policyName, pageSize, continuationToken, continuationObject, unlinked, filePrefix, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['S3LinkControllerApi.listObjects']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listS3Policies(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Policy>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listS3Policies(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['S3LinkControllerApi.listS3Policies']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * S3LinkControllerApi - factory interface
 * @export
 */
export const S3LinkControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = S3LinkControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {S3LinkControllerApiAddAttachmentRecordRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addAttachmentRecord(requestParameters: S3LinkControllerApiAddAttachmentRecordRequest, options?: RawAxiosRequestConfig): AxiosPromise<LinkResult> {
            return localVarFp.addAttachmentRecord(requestParameters.linkRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {S3LinkControllerApiListObjectsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listObjects(requestParameters: S3LinkControllerApiListObjectsRequest, options?: RawAxiosRequestConfig): AxiosPromise<S3ListResult> {
            return localVarFp.listObjects(requestParameters.policyName, requestParameters.pageSize, requestParameters.continuationToken, requestParameters.continuationObject, requestParameters.unlinked, requestParameters.filePrefix, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listS3Policies(options?: RawAxiosRequestConfig): AxiosPromise<Array<Policy>> {
            return localVarFp.listS3Policies(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for addAttachmentRecord operation in S3LinkControllerApi.
 * @export
 * @interface S3LinkControllerApiAddAttachmentRecordRequest
 */
export interface S3LinkControllerApiAddAttachmentRecordRequest {
    /**
     * 
     * @type {LinkRequest}
     * @memberof S3LinkControllerApiAddAttachmentRecord
     */
    readonly linkRequest: LinkRequest
}

/**
 * Request parameters for listObjects operation in S3LinkControllerApi.
 * @export
 * @interface S3LinkControllerApiListObjectsRequest
 */
export interface S3LinkControllerApiListObjectsRequest {
    /**
     * 
     * @type {string}
     * @memberof S3LinkControllerApiListObjects
     */
    readonly policyName: string

    /**
     * 
     * @type {number}
     * @memberof S3LinkControllerApiListObjects
     */
    readonly pageSize: number

    /**
     * 
     * @type {string}
     * @memberof S3LinkControllerApiListObjects
     */
    readonly continuationToken?: string

    /**
     * 
     * @type {string}
     * @memberof S3LinkControllerApiListObjects
     */
    readonly continuationObject?: string

    /**
     * 
     * @type {boolean}
     * @memberof S3LinkControllerApiListObjects
     */
    readonly unlinked?: boolean

    /**
     * 
     * @type {string}
     * @memberof S3LinkControllerApiListObjects
     */
    readonly filePrefix?: string
}

/**
 * S3LinkControllerApi - object-oriented interface
 * @export
 * @class S3LinkControllerApi
 * @extends {BaseAPI}
 */
export class S3LinkControllerApi extends BaseAPI {
    /**
     * 
     * @param {S3LinkControllerApiAddAttachmentRecordRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof S3LinkControllerApi
     */
    public addAttachmentRecord(requestParameters: S3LinkControllerApiAddAttachmentRecordRequest, options?: RawAxiosRequestConfig) {
        return S3LinkControllerApiFp(this.configuration).addAttachmentRecord(requestParameters.linkRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {S3LinkControllerApiListObjectsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof S3LinkControllerApi
     */
    public listObjects(requestParameters: S3LinkControllerApiListObjectsRequest, options?: RawAxiosRequestConfig) {
        return S3LinkControllerApiFp(this.configuration).listObjects(requestParameters.policyName, requestParameters.pageSize, requestParameters.continuationToken, requestParameters.continuationObject, requestParameters.unlinked, requestParameters.filePrefix, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof S3LinkControllerApi
     */
    public listS3Policies(options?: RawAxiosRequestConfig) {
        return S3LinkControllerApiFp(this.configuration).listS3Policies(options).then((request) => request(this.axios, this.basePath));
    }
}

