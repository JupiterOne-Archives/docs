import {
    addVanillaCategoryToProcedure,
    addVanillaArticleInfoToProcedure,
    addVanillaArticlesToProcedures
} from './'


import {
    matchingVanillaKnowledgeArticle,
    vanillaKnowledgeArticle,
    procedureArticle,
    vanillaKnowledgeCategory,
    procedureKnowledgeCategory,
    matchingProcedureKnowledgeCategory,
    proceduresMock
} from './mocks'
describe('ProceduresToVanillaRequests', () => {
    let matchingVanillaKnowledgeArticletemp = matchingVanillaKnowledgeArticle
    let vanillaKnowledgeArticletemp = vanillaKnowledgeArticle
    let procedureArticletemp = procedureArticle
    let vanillaKnowledgeCategorytemp = vanillaKnowledgeCategory
    let procedureKnowledgeCategorytemp = procedureKnowledgeCategory
    let matchingProcedureKnowledgeCategorytemp = matchingProcedureKnowledgeCategory
    let proceduresMocktemp = proceduresMock
    beforeEach(() => {
        matchingVanillaKnowledgeArticletemp = matchingVanillaKnowledgeArticle
        vanillaKnowledgeArticletemp = vanillaKnowledgeArticle
        procedureArticletemp = procedureArticle
        vanillaKnowledgeCategorytemp = vanillaKnowledgeCategory
        procedureKnowledgeCategorytemp = procedureKnowledgeCategory
        matchingProcedureKnowledgeCategorytemp = matchingProcedureKnowledgeCategory
        proceduresMocktemp = proceduresMock
    })
    describe('addVanillaCategoryToProcedure', () => {
        it('returns the procedure if no match from vanilla return', () => {
            const expected = procedureKnowledgeCategorytemp
            const actual = addVanillaCategoryToProcedure(
                procedureKnowledgeCategorytemp,
                [vanillaKnowledgeCategorytemp]
            )

            expect(actual).toEqual(expected)
        })
        it('returns addition of knowledge return to the procedure', () => {
            const expected = {
                "childrenPath": "compliance-reporting",
                "desciption": "",
                "fileName": "compliance-reporting",
                "foreignID": undefined,
                "knowledgeBaseID": 1,
                "knowledgeCategoryID": 23,
                "name": "Compliance Reporting",
                "parentID": 8,
                "path": "getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
                "procedureType": "Category",
                "sort": undefined,
                "sortChildren": undefined,
                "url": undefined,

            }
            const actual = addVanillaCategoryToProcedure(
                matchingProcedureKnowledgeCategorytemp,
                [vanillaKnowledgeCategorytemp]
            )

            expect(actual).toEqual(expected)
        })
    })

    describe('addVanillaArticleToProcedure', () => {
        it('returns the procedure if no match from vanilla return', () => {
            const expected = procedureArticletemp
            const actual = addVanillaArticleInfoToProcedure(
                procedureArticletemp,
                [vanillaKnowledgeArticletemp]
            )

            expect(actual).toEqual(expected)
        })
        it('returns addition of knowledge return to the procedure', () => {
            const expected = {
                "articleID": 43,
                "body": "",
                "fileName": "soc2-with-jupiterone-copy.md",
                "format": "markdown",
                "knowledgeCategoryID": 22,
                "locale": "en",
                "name": "Soc2 With Jupiterone Copy",
                "path": "getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
                "procedureType": "Article",
            }
            const actual = addVanillaArticleInfoToProcedure(
                procedureArticletemp,
                [matchingVanillaKnowledgeArticletemp]
            )

            expect(actual).toEqual(expected)
        })
    })
    describe('addVanillaArticlesToProcedures', () => {
        it('return proceduresWithVanillaCategoryInfo', () => {
            const expected = [
                {
                    "childrenPath": "getting-started-admin",
                    "desciption": "",
                    "fileName": "getting-started-admin",
                    "knowledgeBaseID": 1,
                    "knowledgeCategoryID": null,
                    "name": "Getting Started Admin",
                    "parentID": null,
                    "path": "getting-started-admin/jupiterone-query-language-copy.md",
                    "procedureType": "Category",
                },
                {
                    "articleID": null,
                    "body": "",
                    "fileName": "jupiterone-query-language-copy.md",
                    "format": "markdown",
                    "knowledgeCategoryID": null,
                    "locale": "en",
                    "name": "Jupiterone Query Language Copy",
                    "path": "getting-started-admin/jupiterone-query-language-copy.md",
                    "procedureType": "Article",
                },
                {
                    "articleID": null,
                    "body": "",
                    "fileName": "jupiterone-query-language.md",
                    "format": "markdown",
                    "knowledgeCategoryID": null,
                    "locale": "en",
                    "name": "Jupiterone Query Language",
                    "path": "getting-started-admin/jupiterone-query-language.md",
                    "procedureType": "Article",
                },
                {
                    "childrenPath": "compliance-reporting",
                    "desciption": "",
                    "fileName": "compliance-reporting",
                    "knowledgeBaseID": 1,
                    "knowledgeCategoryID": null,
                    "name": "Compliance Reporting",
                    "parentID": null,
                    "path": "getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
                    "procedureType": "Category",
                },
                {
                    "articleID": 43,
                    "body": "",
                    "fileName": "soc2-with-jupiterone-copy.md",
                    "format": "markdown",
                    "knowledgeCategoryID": 22,
                    "locale": "en",
                    "name": "Soc2 With Jupiterone Copy",
                    "path": "getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
                    "procedureType": "Article",
                },
                {
                    "articleID": null,
                    "body": "",
                    "fileName": "soc2-with-jupiterone.md",
                    "format": "markdown",
                    "knowledgeCategoryID": null,
                    "locale": "en",
                    "name": "Soc2 With Jupiterone",
                    "path": "getting-started-admin/compliance-reporting/soc2-with-jupiterone.md",
                    "procedureType": "Article",
                },
            ]
            const actual = addVanillaArticlesToProcedures(proceduresMocktemp, [matchingVanillaKnowledgeArticletemp])
            expect(actual).toEqual(expected)
        })
    })
})