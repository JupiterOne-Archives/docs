import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import FormData from "form-data";
import { Logger } from "./Logging";
import { KnowledgeCategory, VanillaArticle } from "./utils";
import { Authorization, DEV_URL } from "./utils/constants";
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
    this.baseUrl = baseUrl;
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

  debounceRequests(request: Promise<any>, timeout = 5000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(request);
      }, timeout);
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
    Logger.info(
      `making debounced request to relativeUrl:${relativeUrl}\n body:${body}\n, method: ${method}\n, options:${options}\n`
    );
    return this.debounceRequests(
      axios.request({
        url: this.buildUrl(relativeUrl),
        headers: this.buildHeaders(headers),
        data: body,
        method,
        ...options,
      })
    );
  }
}

// use env variable instead
export const httpClient = new HttpClient(DEV_URL);
