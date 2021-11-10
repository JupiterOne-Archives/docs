import axios from 'axios';
import { KnowledgeCategory, VanillaArticle } from './types';
import {
  DEV_URL,
  Authorization
} from './constants'


interface HeaderProps {
  [key: string]: string;
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
  testingFlag = process.argv.slice(2).includes('testing');
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

  post(relativeUrl: string, body: Partial<VanillaArticle|KnowledgeCategory>, headers?: HeaderProps) {
    return this.makeRequest({
      relativeUrl,
      headers: headers ? headers : {},
      body,
      method: RESTTypes.POST,
    });
  }

  patch(relativeUrl: string, body: Partial<VanillaArticle|KnowledgeCategory>, headers?: HeaderProps) {
    return this.makeRequest({
      relativeUrl,
      body,
      headers:headers||{},
      method: RESTTypes.PATCH,
    });
  }

  delete(relativeUrl: string, headers?: HeaderProps, body?: Partial<VanillaArticle|KnowledgeCategory>) {
    return this.makeRequest({
      relativeUrl,
      body,
      headers:headers||{},
      method: RESTTypes.DELETE,
    });
  }
  makePseudoRequest({
    relativeUrl,
    body,
    headers,
    method,
    options = {},
    dataReturned
  }: {
    relativeUrl: string;
    body?: Partial<VanillaArticle|KnowledgeCategory>;
    headers: HeaderProps;
    method: RESTTypes;
    options?: OptionsProps;
    dataReturned:any
  }) {

    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve({
          url: this.buildUrl(relativeUrl),
          headers: this.buildHeaders(headers),
          data: dataReturned,
          body,
          method,
          ...options,
        })
      })
    })
 
  }

  makeRequest({
    relativeUrl,
    body,
    headers,
    method,
    options = {},
  }: {
    relativeUrl: string;
    body?: Partial<VanillaArticle|KnowledgeCategory>;
    headers: HeaderProps;
    method: RESTTypes;
    options?: OptionsProps;
  }) {


    if(this.testingFlag){
      let dataReturned = {}
      console.log('PSeudoREQUEST')
      if(method ===RESTTypes.GET){

          dataReturned = []

      }
      if(method ===RESTTypes.POST){
if(relativeUrl.startsWith('knowledge-categories/')){
  dataReturned = {
    knowledgeCategoryID:(Math.floor(Math.random() * 10)+1)
  }
}else{
  dataReturned = {
    articleID:(Math.floor(Math.random() * 10)+1)
  }
}
        

    }
    if(method ===RESTTypes.PATCH){

      dataReturned = {}

  }

      return this.makePseudoRequest({
        relativeUrl,
        body,
        headers,
        method,
        options,
        dataReturned
      })
    }
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
