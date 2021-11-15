
export const expectedSortedChanges =[
    {
      parentID: null,
      knowledgeBaseID: 1,
      name: 'Getting Started Admin',
      fileName: 'getting-started-admin',
      desciption: '',
      knowledgeCategoryID: null,
      path: 'getting-started-admin/jupiterone-query-language-copy.md',
      childrenPath: 'getting-started-admin',
      procedureType:'Category'
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
      procedureType:'Article'
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
      procedureType:'Article'
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
      procedureType:'Category'
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
      procedureType:'Article'
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
      procedureType:'Article'
    }
  ]

  export const expectHandleNestedKnowledgeCategoryChanges=[
    {
      parentID: null,
      knowledgeBaseID: 1,
      name: 'Getting Started Admin',
      fileName: 'getting-started-admin',
      desciption: '',
      knowledgeCategoryID: null,
      path: 'getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md',
      childrenPath: 'getting-started-admin',
      procedureType:'Category'
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
      procedureType:'Category'
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
      procedureType:'Article'
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
      procedureType:'Article'
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
      procedureType:'Article'
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
      procedureType:'Article'
    }
  ]