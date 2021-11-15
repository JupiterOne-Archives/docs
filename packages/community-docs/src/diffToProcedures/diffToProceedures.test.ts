
import {

  createArticleChange,
  handleNestedKnowledgeCategoryChanges,
  diffToProcedures
} from './index';
import {
  PATH_OF_DIRECTORY_TO_WATCH
} from '../utils/constants'
import {
  createDisplayName
} from './utils'
import { expectHandleNestedKnowledgeCategoryChanges, expectedSortedChanges } from './mocks'
import { VanillaArticle, ProcedureTypeEnum } from '../utils/types'

describe('diffToProceedures', () => {

  let exampleDiffs = [
    'getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md',
    'getting-started-admin/compliance-reporting/soc2-with-jupiterone.md',
    'getting-started-admin/jupiterone-query-language-copy.md',
    'getting-started-admin/jupiterone-query-language.md'
  ]
  beforeEach(() => {
    exampleDiffs = [
      'getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md',
      'getting-started-admin/compliance-reporting/soc2-with-jupiterone.md',
      'getting-started-admin/jupiterone-query-language-copy.md',
      'getting-started-admin/jupiterone-query-language.md'
    ]

  })
  describe('createDisplayName', () => {
    it('handles dashes', () => {
      const expected = 'Folder Name';
      const actual = createDisplayName('folder-name')
      expect(actual).toEqual(expected);
    })
    it('handles underscores', () => {
      const expected = 'Folder Name';
      const actual = createDisplayName('folder_name')
      expect(actual).toEqual(expected);
    })

  })

  describe('createArticleChange', () => {
    it('handles index files', () => {
      const actual = createArticleChange('index.md', 'k-category/index.md')
      const expected: VanillaArticle = {
        knowledgeCategoryID: null, //will need to create it and get it- for sub folders
        articleID: null,
        fileName: 'index.md',
        name: 'K Category',
        body: '',
        path: 'k-category/index.md',
        format: 'markdown',
        locale: 'en',
        procedureType:ProcedureTypeEnum.Article
      }
      expect(actual).toEqual(expected)
    })
    it('handles named files', () => {
      const actual = createArticleChange('article-title.md', 'k-category/article-title.md')
      const expected: VanillaArticle = {
        knowledgeCategoryID: null, //will need to create it and get it- for sub folders
        articleID: null,
        fileName: 'article-title.md',
        name: 'Article Title',
        body: '',
        path: 'k-category/article-title.md',
        format: 'markdown',
        locale: 'en',
        procedureType:ProcedureTypeEnum.Article
      }
      expect(expected).toEqual(actual)
    })
  })

  describe('handleNestedKnowledgeCategoryChanges', () => {
    it('returns expected sequence of procedures', () => {
      const expected = expectHandleNestedKnowledgeCategoryChanges
      const { completed } = handleNestedKnowledgeCategoryChanges({
        nestedCategoryChanges: [...exampleDiffs], // need to create a new array for each
        originalChangesArray: [...exampleDiffs], // need to create a new array for each
        parentIndex: 0,
      });
      expect(expected).toEqual(completed)

    })
    it('returns upon input nestedCategoryChanges length == 0', () => {

      const { completed } = handleNestedKnowledgeCategoryChanges({
        nestedCategoryChanges: [], // need to create a new array for each
        originalChangesArray: [], // need to create a new array for each
        parentIndex: 0,
      });
      expect(completed).toEqual([])

    })
  })

  describe('diffToProcedures', () => {
    it('takes in a list of diffs and returns procedures', () => {
      exampleDiffs = [
        `${PATH_OF_DIRECTORY_TO_WATCH}`,
        `${PATH_OF_DIRECTORY_TO_WATCH}getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md`,
        '',
        `${PATH_OF_DIRECTORY_TO_WATCH}getting-started-admin/compliance-reporting/soc2-with-jupiterone.md`,
        `${PATH_OF_DIRECTORY_TO_WATCH}getting-started-admin/compliance-reporting/soc2-with-jupiterone.png`,
        `${PATH_OF_DIRECTORY_TO_WATCH}getting-started-admin/jupiterone-query-language-copy.md`,
        `${PATH_OF_DIRECTORY_TO_WATCH}getting-started-admin/jupiterone-query-language.md`
      ]
      const actual = diffToProcedures(exampleDiffs)
      const expected = expectedSortedChanges
      expect(actual).toEqual(expected)
    })
  })


});
