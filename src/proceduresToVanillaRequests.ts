import fs from 'fs';
import path from 'path';
import HttpClient from './httpClient';
import { Article, KnowledgeCategory, VanillaArticle, VanillaKnowledgeCategory } from './types';
import { getAllArticles, getKnowedgeCategories, createKnowledgeCategory,createArticle,editArticle } from './VanillaAPI';

export const markdownToString = async (filePath: string):Promise<string|void> => {
  // we also want to use this to see if the file got deleted! the git diff wont differenitate
const fileLocation = path.join(__dirname,'../docs',`/${filePath}`)
 return fs.readFile(fileLocation, (err, buffer) => {
    if (err) {
      console.error(err, 'Error with file buffer', filePath);
      return;
    }
    return buffer.toString();
  });
};

const isKnowledgeCategoryType = (
  procedure: Article | KnowledgeCategory
): procedure is KnowledgeCategory => {
  return (procedure as KnowledgeCategory).hasChildren;
};

const isArticleType = (
  procedure: Article | KnowledgeCategory
): procedure is Article => {
  return Boolean((procedure as Article).format);
};

const addVanillaCategoryToProcedure = (
  procedure: Article | KnowledgeCategory,
  vanillaReturn: VanillaKnowledgeCategory[]
) => {
  if (isKnowledgeCategoryType(procedure)) {
    let procedureTarget: KnowledgeCategory = procedure;
    const match = vanillaReturn.filter(
      (v) => v.name === procedureTarget.displayName
    );
    if (match.length) {
      procedureTarget = {
        ...procedureTarget,
        knowledgeCategoryID: match[0].knowledgeCategoryID,
        parentID: match[0].parentID,
        knowledgeBaseID: match[0].knowledgeBaseID,
        sortChildren: match[0].sortChildren,
        sort: match[0].sort,
        url: match[0].url,
        foreignID: match[0].foreignID,
      };
    }
    return procedureTarget;
  }
  return procedure;
};

const addExistingKnowledgeCategoriesToProceedures = (
  procedures: (Article | KnowledgeCategory)[],
  vanillaReturn: VanillaKnowledgeCategory[]
) => {
  if (!vanillaReturn || !vanillaReturn.length) {
    return procedures;
  }
  const proceduresWithVanillaCategoryInfo: (Article | KnowledgeCategory)[] = [];
  procedures.forEach((p) => {
    proceduresWithVanillaCategoryInfo.push(
      addVanillaCategoryToProcedure(p, vanillaReturn)
    );
  });

  return proceduresWithVanillaCategoryInfo;
};

export const addVanillaArticleInfoToProcedure = (
  procedure: Article,
  vanillaArticles: VanillaArticle[]
) => {
  let procedureTarget = procedure;
  const match = vanillaArticles.filter((v) => v.name === procedureTarget.name);
  if (match.length) {
    procedureTarget = {
      ...procedureTarget,
      knowledgeCategoryID: match[0].knowledgeCategoryID,
      articleID: match[0].articleID, // used in path
      locale: 'en',
      format: 'markdown',
    };
  }

  return procedureTarget;
};

export const addVanillaArticlesToProcedures = (
  procedures: (Article | KnowledgeCategory)[],
  vanillaArticles: VanillaArticle[]
) => {
  const proceduresWithVanillaCategoryInfo: (Article | KnowledgeCategory)[] = [];
  procedures.forEach((p) => {
    if (isArticleType(p)) {
      proceduresWithVanillaCategoryInfo.push(
        addVanillaArticleInfoToProcedure(p, vanillaArticles)
      );
    } else {
      proceduresWithVanillaCategoryInfo.push(p);
    }
  });
  return proceduresWithVanillaCategoryInfo;
};

const procedureToArticle = async (
  httpClient:HttpClient,
  procedureWorkedOn:Article,
  previousknowledgeCategoryID:null|number|undefined,
  completedProcedures:(Article | KnowledgeCategory)[]
  ):Promise<Article> =>{
  if(procedureWorkedOn.articleID===null &&completedProcedures?.length){
    // create a new article
    // needs the knowledgeCategory of previous procedure
    
    if(!previousknowledgeCategoryID){
      console.error('something went wrong, did not receive kcID')
      return procedureWorkedOn
    }
    const body =await markdownToString(procedureWorkedOn.path)
    console.log(body, '**************BODY****',body, '&&&&&&&&&&')
    if(body){
      const articleRequest:Partial<VanillaArticle>=  {
        body,
        format: "markdown",
       knowledgeCategoryID:previousknowledgeCategoryID,
        locale: "en",
        name: procedureWorkedOn.name,
        sort: 0
      }
      const createdArticle = await createArticle(httpClient,articleRequest)
      if(createdArticle?.articleID){
        procedureWorkedOn= addVanillaArticleInfoToProcedure(procedureWorkedOn,[createdArticle])
      }
      
    }
    
    
      }else{
        const body =await markdownToString(procedureWorkedOn.path)
console.log(body, '**************BODY****',body, '&&&&&&&&&&')
if(body && procedureWorkedOn.articleID){
  const articleRequest:Partial<VanillaArticle>=  {
    body,
    format: "markdown",
   knowledgeCategoryID:previousknowledgeCategoryID,
    locale: "en",
    name: procedureWorkedOn.name,
    sort: 0
  }
  const createdArticle = await editArticle(httpClient,procedureWorkedOn.articleID,articleRequest)
  if(createdArticle?.articleID){
    procedureWorkedOn= addVanillaArticleInfoToProcedure(procedureWorkedOn,[createdArticle])
  }
  }
      }
      return procedureWorkedOn
}

export const useProceduresForVanillaRequests =async (
  procedures: (Article | KnowledgeCategory)[],

  completedProcedures?:(Article | KnowledgeCategory)[])=>{
    const httpClient = new HttpClient();
    let tempCompletedProcedures=completedProcedures?[...completedProcedures]:[]
    let tempProcedures = [...procedures]
    const previousknowledgeCategoryID = tempCompletedProcedures[tempCompletedProcedures.length-1]?.knowledgeCategoryID
  // this needs to be syncronous, going in order of the procedures. 
  // for example - a new folder with a markdown file, we need to make a 
  // new knowledgeCategory and use its id to create the new article
let procedureWorkedOn = tempProcedures.shift()
if(!procedureWorkedOn){
  return completedProcedures
}

if(isArticleType(procedureWorkedOn)){
  procedureWorkedOn=await procedureToArticle(
    httpClient,
    procedureWorkedOn,
    previousknowledgeCategoryID,
    tempCompletedProcedures
    )

}else{
  if(!procedureWorkedOn.knowledgeCategoryID){
// create a KnowledgeCategory
  } else{
    // edit an existing knowledgeCategory
  }

}

tempCompletedProcedures.push(procedureWorkedOn)
useProceduresForVanillaRequests(tempProcedures,tempCompletedProcedures)
}

export const proceduresToVanillaRequests = async (
  procedures: (Article | KnowledgeCategory)[]
) => {
  if (procedures && procedures.length) {
    const httpClient = new HttpClient();

    const existingknowledgeCategoryInfo = await getKnowedgeCategories(
      httpClient
    );

    const articles = await getAllArticles(
      httpClient,
      existingknowledgeCategoryInfo
    );

    const proceduresWithVanillaCategories =
      addExistingKnowledgeCategoriesToProceedures(
        procedures,
        existingknowledgeCategoryInfo
      );
    console.log(
      'proceduresWithVanillaCategories((((((',
      proceduresWithVanillaCategories,
      'proceduresWithVanillaCategories'
    );
    const proceduresWithArticleInfo = addVanillaArticlesToProcedures(
      procedures,
      articles
    );
    
    console.log(
      'proceduresWithArticleInfo*********FINAL FORM',
      proceduresWithArticleInfo,
      'FINAL FORM---proceduresWithVanillaCategories'
    );
    
    // make categories first, return their ID on the procedure so the article can be tied to it.
  }
};
