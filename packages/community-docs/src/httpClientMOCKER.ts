import { DEV_URL, KnowledgeCategory, VanillaArticle } from "./utils";
import { Authorization } from "./utils/constants";

interface HeaderProps {
  [key: string]: string;
}

interface OptionsProps {
  params?: { [key: string]: string | number };
}

interface mockReturns {
  get: any[];
  patch: any[];
  delete: any[];
  post: any[];
}

export default class HttpClientMOCKER {
  baseUrl = "";
  payloadReturns: mockReturns = { get: [], post: [], patch: [], delete: [] };
  testingFlag = process.argv.slice(2).includes("testing");
  headers: HeaderProps = {};
  constructor(payloadReturns: mockReturns, baseUrl = DEV_URL) {
    this.baseUrl = baseUrl;
    this.payloadReturns = payloadReturns;
  }

  buildUrl(relativeUrl: string) {
    return relativeUrl.startsWith("/")
      ? this.baseUrl + relativeUrl
      : `${this.baseUrl}/${relativeUrl}`;
  }

  buildHeaders(
    headers: HeaderProps = {
      "Content-Type": "application/json",
    }
  ): HeaderProps {
    this.headers.Authorization = Authorization;

    return { ...headers, Authorization: this.headers.Authorization };
  }

  get(relativeUrl: string, options?: OptionsProps) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: this.buildUrl(relativeUrl),
          headers: this.buildHeaders(),
          data: this.payloadReturns.get.shift(),
        });
      });
    });
  }

  post(
    relativeUrl: string,
    body: Partial<VanillaArticle | KnowledgeCategory>,
    headers?: HeaderProps
  ) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: this.buildUrl(relativeUrl),
          headers: this.buildHeaders(headers),
          data: this.payloadReturns.post.shift(),
          body,
        });
      });
    });
  }

  patch(
    relativeUrl: string,
    body: Partial<VanillaArticle | KnowledgeCategory>,
    headers?: HeaderProps
  ) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: this.buildUrl(relativeUrl),
          headers: this.buildHeaders(headers),
          data: this.payloadReturns.patch.shift(),
          body,
        });
      });
    });
  }
  makePseudoRequest() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
      });
    });
  }
  makeRequest() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
      });
    });
  }
  delete(
    relativeUrl: string,
    headers?: HeaderProps,
    body?: Partial<VanillaArticle | KnowledgeCategory>
  ) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: this.buildUrl(relativeUrl),
          headers: this.buildHeaders(headers),
          data: this.payloadReturns.delete.shift(),
          body,
        });
      });
    });
  }
}

export const httpClient = new HttpClientMOCKER({
  get: [],
  post: [],
  patch: [],
  delete: [],
});
