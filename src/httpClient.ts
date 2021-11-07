import axios from 'axios';
const DEV_URL = 'https://jupiterone.vanillastaging.com/api/v2/';
const Authorization =
  '';

interface HeaderProps {
  [key: string]: string;
}

enum RESTTypes {
  POST = 'post',
  PUT = 'put',
  GET = 'get',
  PATCH = 'patch',
  DELETE = 'delete',
}

export default class HttpClient {
  baseUrl = '';
  headers: HeaderProps = {};
  constructor(baseUrl = DEV_URL) {
    this.baseUrl = baseUrl;
  }

  buildUrl(relativeUrl: string) {
    return relativeUrl.startsWith('/')
      ? this.baseUrl + relativeUrl
      : `${this.baseUrl}/${relativeUrl}`;
  }

  buildHeaders(
    headers: HeaderProps = {
      'Content-Type': 'application/json',
    }
  ): HeaderProps {
    this.headers.Authorization = Authorization;

    return { ...headers, Arthorization: this.headers.Authorization };
  }

  get(relativeUrl: string) {
    return this.makeRequest({
      relativeUrl,
      headers: this.buildHeaders(),
      method: RESTTypes.GET,
    });
  }

  post(relativeUrl: string, body: string, headers: HeaderProps) {
    return this.makeRequest({
      relativeUrl,
      headers,
      body,
      method: RESTTypes.POST,
    });
  }

  patch(relativeUrl: string, body: string, headers: HeaderProps) {
    return this.makeRequest({
      relativeUrl,
      body,
      headers,
      method: RESTTypes.PATCH,
    });
  }

  delete(relativeUrl: string, headers: HeaderProps, body?: string) {
    return this.makeRequest({
      relativeUrl,
      body,
      headers,
      method: RESTTypes.DELETE,
    });
  }

  makeRequest({
    relativeUrl,
    body,
    headers,
    method,
  }: {
    relativeUrl: string;
    body?: string;
    headers: HeaderProps;
    method: RESTTypes;
  }) {
    return axios.request({
      url: this.buildUrl(relativeUrl),
      headers: this.buildHeaders(headers),
      data: body,
      method,
    });
  }
}

// use env variable instead
export const httpClient = new HttpClient(DEV_URL);
