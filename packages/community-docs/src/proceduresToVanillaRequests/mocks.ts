import {
    VanillaKnowledgeCategory,
    VanillaArticle,
    ProcedureTypeEnum
} from '../utils'

export const matchingVanillaKnowledgeArticle = {
    name: 'Soc2 With Jupiterone Copy',
    knowledgeCategoryID: 22,
    articleID: 43, // used in path
} as VanillaArticle

export const vanillaKnowledgeArticle = {
    name: 'Soc2 With Jupiterone',
    knowledgeCategoryID: 33,
    articleID: 2, // used in path
} as VanillaArticle
export const procedureArticle = {

    knowledgeCategoryID: null,
    articleID: null,
    fileName: 'soc2-with-jupiterone-copy.md',
    name: 'Soc2 With Jupiterone Copy',
    body: '',
    path: 'getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md',
    format: 'markdown',
    locale: 'en',
    procedureType: 'Article'

} as VanillaArticle
export const vanillaKnowledgeCategory = {
    parentID: 8,
    knowledgeBaseID: 1,
    name: 'Compliance Reporting',
    fileName: 'compliance-reporting',
    desciption: '',
    knowledgeCategoryID: 23,
    path: 'getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md',
    childrenPath: 'compliance-reporting',
    procedureType: ProcedureTypeEnum.Category
} as VanillaKnowledgeCategory

export const procedureKnowledgeCategory = {
    parentID: null,
    knowledgeBaseID: 1,
    name: 'Soc2 Reporting',
    fileName: 'soc2-reporting',
    desciption: '',
    knowledgeCategoryID: null,
    path: 'getting-started-admin/soc2-reporting/soc2-with-jupiterone-copy.md',
    childrenPath: 'soc2-reporting',
    procedureType: ProcedureTypeEnum.Category
}
export const matchingProcedureKnowledgeCategory = {
    parentID: null,
    knowledgeBaseID: 1,
    name: 'Compliance Reporting',
    fileName: 'compliance-reporting',
    desciption: '',
    knowledgeCategoryID: null,
    path: 'getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md',
    childrenPath: 'compliance-reporting',
    procedureType: ProcedureTypeEnum.Category
}

export const proceduresMock = [
    {
      parentID: null,
      knowledgeBaseID: 1,
      name: 'Getting Started Admin',
      fileName: 'getting-started-admin',
      desciption: '',
      knowledgeCategoryID: null,
      path: 'getting-started-admin/jupiterone-query-language-copy.md',
      childrenPath: 'getting-started-admin',
      procedureType: 'Category'
    },
    {
      knowledgeCategoryID: null,
      articleID: null,
      fileName: 'jupiterone-query-language-copy.md',
      name: 'Jupiterone Query Language Copy',
      body: '',
      path: 'getting-started-admin/jupiterone-query-language-copy.md',
      format: 'markdown',
      locale: 'en',
      procedureType: 'Article'
    },
    {
      knowledgeCategoryID: null,
      articleID: null,
      fileName: 'jupiterone-query-language.md',
      name: 'Jupiterone Query Language',
      body: '',
      path: 'getting-started-admin/jupiterone-query-language.md',
      format: 'markdown',
      locale: 'en',
      procedureType: 'Article'
    },
    {
      parentID: null,
      knowledgeBaseID: 1,
      name: 'Compliance Reporting',
      fileName: 'compliance-reporting',
      desciption: '',
      knowledgeCategoryID: null,
      path: 'getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md',
      childrenPath: 'compliance-reporting',
      procedureType: 'Category'
    },
    {
      knowledgeCategoryID: null,
      articleID: null,
      fileName: 'soc2-with-jupiterone-copy.md',
      name: 'Soc2 With Jupiterone Copy',
      body: '',
      path: 'getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md',
      format: 'markdown',
      locale: 'en',
      procedureType: 'Article'
    },
    {
      knowledgeCategoryID: null,
      articleID: null,
      fileName: 'soc2-with-jupiterone.md',
      name: 'Soc2 With Jupiterone',
      body: '',
      path: 'getting-started-admin/compliance-reporting/soc2-with-jupiterone.md',
      format: 'markdown',
      locale: 'en',
      procedureType: 'Article'
    }
  ] as (VanillaArticle | VanillaKnowledgeCategory)[]