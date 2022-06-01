import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import FormData from "form-data";
import { logger } from "./loggingUtil";
import { KnowledgeCategory, VanillaArticle } from "./utils";
import {
  Authorization,
  DEV_URL,
  PROD_URL,
  REQUEST_DELAY,
} from "./utils/constants";
enum RESTTypes {
  POST = "post",
  PUT = "put",
  GET = "get",
  PATCH = "patch",
  DELETE = "delete",
}

export default class HttpClient {
  baseUrl = "";
  headers: AxiosRequestHeaders = {};
  constructor(baseUrl = DEV_URL) {
    this.baseUrl = process.env.targetVanillaEnv === "prod" ? PROD_URL : DEV_URL;
  }

  buildUrl(relativeUrl: string) {
    return relativeUrl.startsWith("/")
      ? this.baseUrl + relativeUrl
      : `${this.baseUrl}/${relativeUrl}`;
  }

  buildHeaders(
    headers: AxiosRequestHeaders = {
      "Content-Type": "application/json",
    }
  ): AxiosRequestHeaders {
    this.headers.Authorization = Authorization;

    return { ...headers, Authorization: this.headers.Authorization };
  }

  get(relativeUrl: string, options?: AxiosRequestConfig) {
    return this.makeRequest({
      relativeUrl,
      headers: this.buildHeaders(),
      method: RESTTypes.GET,
      options,
    });
  }

  uploadMedia(data: FormData) {
    const headers = {
      ...data.getHeaders(),
    };
    return axios.post(this.buildUrl("media"), data, {
      headers,
      params: {
        access_token: Authorization.split(" ")[1],
      },
    });
  }

  post(
    relativeUrl: string,
    body: Partial<VanillaArticle | KnowledgeCategory>,
    headers?: AxiosRequestHeaders
  ) {
    return this.makeRequest({
      relativeUrl,
      headers: headers ? headers : {},
      body,
      method: RESTTypes.POST,
    });
  }

  patch(
    relativeUrl: string,
    body: Partial<VanillaArticle | KnowledgeCategory>,
    headers?: AxiosRequestHeaders
  ) {
    return this.makeRequest({
      relativeUrl,
      body,
      headers: headers || {},
      method: RESTTypes.PATCH,
    });
  }

  delete(
    relativeUrl: string,
    headers?: AxiosRequestHeaders,
    body?: Partial<VanillaArticle | KnowledgeCategory>
  ) {
    return this.makeRequest({
      relativeUrl,
      body,
      headers: headers || {},
      method: RESTTypes.DELETE,
    });
  }

  debounceRequests(request: Promise<any>, timeout = REQUEST_DELAY) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(request);
      }, timeout);
    }).catch((error) => {
      logger.error(`Error in debounceRequests: ${JSON.stringify(error)}`);
    });
  }

  makeRequest({
    relativeUrl,
    body,
    headers,
    method,
    options = {},
  }: {
    relativeUrl: string;
    body?: Partial<VanillaArticle | KnowledgeCategory>;
    headers: AxiosRequestHeaders;
    method: RESTTypes;
    options?: AxiosRequestConfig;
  }) {
    try {
      const requestBody = {
        url: this.buildUrl(relativeUrl),
        headers: this.buildHeaders(headers),
        data: body,
        method,
        ...options,
      };

      logger.info(`------------ MAKING ${method} REQUEST ------------`);
      logger.info(`REQUEST URL: ${requestBody.url}`);
      logger.info(`REQUEST DATA ${JSON.stringify(requestBody.data)}`);
      logger.info("------------ END REQUEST DATA ------------");

      return this.debounceRequests(
        axios.request(requestBody).catch((e) => {
          if (e?.response?.status === 403) {
            logger.error("Error from Vanilla Auth! Check the TOKEN");
            return Promise.reject(e);
          } else {
            logger.error(`Error from axios.request: ${JSON.stringify(e)}`);
            return Promise.reject(e);
          }
        })
      );
    } catch (e) {
      logger.info("Error message in HTTPClient catch");
      logger.error(JSON.stringify(e));
      return e;
    }
  }
}

// use env variable instead
export const httpClient = new HttpClient(DEV_URL);
