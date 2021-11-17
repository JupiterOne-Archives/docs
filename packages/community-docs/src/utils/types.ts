export interface KnowledgeBase {
  uriCode: string; // the location of the knowledge base
  viewType: string; // guide or help
  name: string;
  description: string;
  sortArticles: "manual" | "name" | "dateInserted" | "dateInsertedDesc";
}
export interface KnowledgeCategory {
  knowledgeBaseID: null | number; // 1 is the docs
  knowledgeCategoryID: null | number;
  parentID: null | number; // unique id of the parent, if its right after the /docs folder its 1(knowledgeBaseID)
  childrenPath: string; // key added to add correct articles to category
  path?: string; // the path we use during diff
  name: string;
  // displayName: string;
  description: string;
  sort?: number | null;
  url?: string | null;
  sortChildren?: null | "name" | "dateInserted" | "dateInsertedDesc" | "manual";
  foreignID?: null | string; // to link to external srcs
}

export enum ProcedureTypeEnum {
  Category = "Category",
  Article = "Article",
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
  fileName: null | string;

  // addition we added
  procedureType: ProcedureTypeEnum;
  path?: string; // the path we use during diff
  requestCompleted?: boolean;
  displayName?: string;
  description?: string;
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
    | "text"
    | "textex"
    | "markdown"
    | "wysiwyg"
    | "html"
    | "bbcode"
    | "rich";
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
  articleID: number | null;
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
    | "text"
    | "textex"
    | "markdown"
    | "wysiwyg"
    | "html"
    | "bbcode"
    | "rich";
  score?: number;
  seoDescription?: string | null;
  slug?: string;
  status?: "undeleted" | "deleted" | "published";
  translationStatus?: "up-to-date" | "out-of-date" | "not-translated"; // from schema.. but also can see 'published'.. what else is missing?
  updateUserID?: number;
  featured?: boolean;
  dateFeatured?: string;
  url?: string;
  views?: number;
  foreignID?: string | null;
  sort?: number;

  // things we have added
  path?: string;
  fileName: null | string;
  requestCompleted?: boolean;
  procedureType: ProcedureTypeEnum;
}
