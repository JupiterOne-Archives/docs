export interface KnowledgeBase {
  uriCode: string; // the location of the knowledge base
  viewType: string; // guide or help
  name: string;
  desciption: string;
  sortArticles: 'manual' | 'name' | 'dateInserted' | 'dateInsertedDesc';
}
export interface KnowledgeCategory {
  knowledgeBaseID: null | number; // 1 is the docs
  knowledgeCategoryID: null | number;
  parentID: null | number; // unique id of the parent, if its right after the /docs folder its 1(knowledgeBaseID)
  childrenPath: string; // key added to add correct articles to category
  path?: string; // the path we use during diff
  name: string;
  // displayName: string;
  desciption: string;
  sort?: number | null;
  url?: string | null;
  sortChildren?: null | 'name' | 'dateInserted' | 'dateInsertedDesc' | 'manual';
  foreignID?: null | string; // to link to external srcs
}
export interface Article {
  knowledgeCategoryID: number | null;
  articleID: number | null;
  name: string;
  body: string;
  format:
    | 'text'
    | 'textex'
    | 'markdown'
    | 'wysiwyg'
    | 'html'
    | 'bbcode'
    | 'rich';
  locale: string;
  sort?: number;
  discussionId?: number;
  foreignID?: null | string;
  fileRehosting?: {
    description: string;
    enabled: boolean;
    requestHeaders: any;
  };
  // things not on vanilla schema
  fileName: string;
  path: string;
  ArticleID?: string; //(will need to remove or edit the previous Article)
}
export enum ProcedureTypeEnum{
  Category='Category',
Article='Article',
}

export interface VanillaKnowledgeCategory {
  knowledgeCategoryID: number | null;
  name: string;
  parentID: number | null;
  knowledgeBaseID: number;
  sortChildren?: null;
  sort?: number;
  insertUserID?: number;
  dateInserted?: string;
  updateUserID?: number;
  dateUpdated?: string;
  lastUpdatedArticleID?: null | string;
  lastUpdatedUserID?: null | string;
  articleCount?: number;
  articleCountRecursive?: number;
  childCategoryCount?: number;
  url?: string;
  foreignID?: null | string;
  fileName: null|string;




  // addition we added
procedureType:ProcedureTypeEnum;
  path?: string; // the path we use during diff
requestCompleted?:boolean;
  displayName?: string;
  desciption?: string;
  childrenPath: string; // key added to add correct articles to category
}
export interface VanillaArticlePatch {
  articleID: number;
  body: string | null;
  dateInserted: string;
  dateUpdated: string;
  excerpt: string | null;
  insertUserID: number;
  knowledgeCategoryID: number | null;
  locale: string; //'en'
  name: string | null;
  format:
  | 'text'
  | 'textex'
  | 'markdown'
  | 'wysiwyg'
  | 'html'
  | 'bbcode'
  | 'rich';
  outline: {
    level: number;
    ref: string; //Heading blot reference id. Ex: #title
    text: string; // heading text line
  }[];
  score: number;
  discussionID: number;
  foreignID?: string | null;
  fileRehosting?: {
    description: string;
    enabled: boolean;
    requestHandler: string[];
  };
}

export interface VanillaArticle {
  articleID: number|null|undefined;
  knowledgeCategoryID: number | null;
  body: string | null;
  dateInserted?: string;
  dateUpdated?: string;
  excerpt?: string | null;
  insertUserID?: number;
  locale: string; //'en'
  name: string | null;
  outline?: {
    level: number;
    ref: string; //Heading blot reference id. Ex: #title
    text: string; // heading text line
  };
  format:
  | 'text'
  | 'textex'
  | 'markdown'
  | 'wysiwyg'
  | 'html'
  | 'bbcode'
  | 'rich';
  score?: number;
  seoDescription?: string | null;
  slug?: string;
  status?: 'undeleted' | 'deleted' | 'published';
  translationStatus?: 'up-to-date' | 'out-of-date' | 'not-translated'; // from schema.. but also can see 'published'.. what else is missing?
  updateUserID?: number;
  featured?: boolean;
  dateFeatured?: string;
  url?: string;
  views?: number;
  foreignID?: string | null;
  sort?:number;

// things we have added
  path?: string;
  fileName:null|string;
  requestCompleted?:boolean;
  procedureType:ProcedureTypeEnum;
  // displayName?:string;
  // articleID: 4,
  // articleRevisionID: 5,
  // knowledgeCategoryID: 7,
  // knowledgeBaseID: 1,
  // name: 'compliance art',
  // seoName: null,
  // seoDescription: null,
  // slug: '4-compliance-art',
  // sort: null,
  // score: 0,
  // views: 0,
  // url: 'https://jupiterone.vanillastaging.com/kb/articles/4-compliance-art',
  // insertUserID: 12,
  // dateInserted: '2021-11-03T16:50:22+00:00',
  // updateUserID: 12,
  // dateUpdated: '2021-11-03T16:50:22+00:00',
  // insertUser: {
  //   userID: 12,
  //   name: 'Carter Hesterman',
  //   url: 'https://jupiterone.vanillastaging.com/profile/Carter%20Hesterman',
  //   photoUrl: 'https://w8.vanillicon.com/v2/89e33ddc07b00da9d5c485f42bf08d0a.svg',
  //   dateLastActive: '2021-11-08T15:14:24+00:00',
  //   banned: 0,
  //   punished: 0,
  //   private: false,
  //   label: 'admin'
  // },
  // updateUser: {
  //   userID: 0,
  //   name: 'unknown',
  //   url: 'https://jupiterone.vanillastaging.com/profile/',
  //   photoUrl: 'https://w3.vanillicon.com/v2/310b86e0b62b828562fc91c7be5380a9.svg',
  //   dateLastActive: '2021-11-08T18:51:33+00:00',
  //   banned: 0,
  //   punished: 0,
  //   private: false
  // },
  // status: 'published',
  // locale: 'en',
  // featured: false,
  // translationStatus: 'up-to-date',
  // foreignID: null
}
