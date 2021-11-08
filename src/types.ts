export interface KnowledgeBase {
  uriCode: string; // the location of the knowledge base
  viewType: string; // guide or help
  name: string;
  desciption: string;
  sortArticles: 'manual' | 'name' | 'dateInserted' | 'dateInsertedDesc';
}
export interface KnowledgeCategory {
  knowledgeBaseID: null | number; // 1 is the docs
  knowledgeCategoryID?: null | number;
  parentID: null | number; // unique id of the parent
  hasChildren: boolean; // to determine if its creation order matters
  path?: string; // the path we use during diff
  name: string;
  displayName: string;
  desciption: string;
  sort?: number | null;
  url?: string | null;
  sortChildren?: null | 'name' | 'dateInserted' | 'dateInsertedDesc' | 'manual';
  foreignID?: null | string; // to link to external srcs
}
export interface Article {
  knowledgeCategoryID: number | null;
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
  local: string;
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

export interface VanillaKnowledgeCategory {
  knowledgeCategoryID: number;
  name: string;
  parentID: number | null;
  knowledgeBaseID: number;
  sortChildren: null;
  sort: number;
  insertUserID: number;
  dateInserted: string;
  updateUserID: number;
  dateUpdated: string;
  lastUpdatedArticleID: null | string;
  lastUpdatedUserID: null | string;
  articleCount: number;
  articleCountRecursive: number;
  childCategoryCount: number;
  url: string;
  foreignID: null | string;
}
