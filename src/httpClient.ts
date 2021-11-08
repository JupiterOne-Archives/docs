import axios from 'axios';
const DEV_URL = 'https://jupiterone.vanillastaging.com/api/v2';
const Authorization =
  'Bearer va.7YJcKgRxs_CwgHcfyUxxVPj0-9zPBNLl.NQlIdA.L_L1KFi';

interface HeaderProps {
  [key: string]: string;
}
export interface BodyProps {
  [key: string]: string | number | null;
}
interface OptionsProps {
  params?: { [key: string]: string | number };
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

  get(relativeUrl: string, options?: OptionsProps) {
    return this.makeRequest({
      relativeUrl,
      headers: this.buildHeaders(),
      method: RESTTypes.GET,
      options,
    });
  }

  post(relativeUrl: string, body: BodyProps, headers?: HeaderProps) {
    return this.makeRequest({
      relativeUrl,
      headers: headers ? headers : {},
      body,
      method: RESTTypes.POST,
    });
  }

  patch(relativeUrl: string, body: BodyProps, headers: HeaderProps) {
    return this.makeRequest({
      relativeUrl,
      body,
      headers,
      method: RESTTypes.PATCH,
    });
  }

  delete(relativeUrl: string, headers: HeaderProps, body?: BodyProps) {
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
    options = {},
  }: {
    relativeUrl: string;
    body?: BodyProps;
    headers: HeaderProps;
    method: RESTTypes;
    options?: OptionsProps;
  }) {
    return axios.request({
      url: this.buildUrl(relativeUrl),
      headers: this.buildHeaders(headers),
      data: body,
      method,
      ...options,
    });
  }
}

// use env variable instead
export const httpClient = new HttpClient(DEV_URL);
