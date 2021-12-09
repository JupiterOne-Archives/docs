# docs-community

# Dos and Donts

Dont name any two folders or markdown with the same name.

- We currently match an article by its file name (after removing dashes/underscores and capitalizing) against what is being returned for the name of the article.

Continue to reference other markdowns as if they lived in the same directory.

- After merging these links get replaced with their location on vanilla forums.

Example usage:
` [2]: ./jupiterone-api.md#entity-and-relationship-synchronization [1]: ../../docs/data-model/org-grc.md Learn more [here] (https://github.com/JupiterOne/docs/blob/main/docs/parameters.md#jupiterone-parameter-service). [security cyber asset inventory](../asset-inventory-filters.md)`

# Needs

Token from vanilla to pass in when running locally.

## Overview

### How the scripts functions

- `getDiff` returns the changes in the most recent merge.
- `updateCommunityDocs` cleans up the paths, filters out irrelevant path and converts to consumable array for `diffToProcedures`
- `diffToProcedures` takes a git diff change, and converts it to an array of Article/KnowledgeCategories which is then added in order to the other generated git diff procedures. Order is important as a Knowledge category must be made or referenced before an article can be added to it.
- `procedureToVanillaRequests` takes the created procedures, queries published Vanilla Articles and Knowledge categories and adds reliant info to the procedures. It then uploads referenced images for articles (from links in markdown to local files) and adds the returned uri from Vanilla into the markdown. It then proceeds to synchronously (has to wait for the previous items to be made) create Articles
  and Knowledge categories via `VanillaAPI`

## Usage

- After a branch has been merged to `main` differences between the two will be used to create/remove/edit articles and Knowledge categories

- Folders added or changed will create new Knowledge Categories with each child of that directory becoming either `Articles` or additional child (nested) Knowledge Categories.

## Requirements and Gotchas

- When naming new (or renaming) files and directories `-` and `_` are replaced with a space and each first letter in each word is capitaled to become that Knowledge Category's or Article's name.

- References to images in markdown are limited to the same directory as the docs directory.

- Images larger than 15 mb are supported but tend to fail during upload. You can make a change to the markdown file that references the image to try again.

- Vanilla has a limit on the number or requests per hour and will lock out the account for an hour if that limit is exceeded. To prevent this, a delay is added to the requests to Vanilla forums when a merge trigger changes to Vanilla Forums.

- Knowledge Categories are matched on name regardless of WHERE they reside. So if there already exists a category for `hot-to/compliance/making-policies.md` policies and you are merging a change a new directory `getting-started/compliance/policies.md`, the new file policies.md will be added as an article to
  'hot-to/compliance/'

## Dev Info and Notes

childrenPath used to see if one category belongs in another

Generate procedures per array of paths, default will be for commit changes. Currently targets all of PATH_OF_DIRECTORY_TO_WATCH
Auth is a token that is in a git ignore file
SHOULD_REALLY_UPLOAD_IMAGES set to true will upload all referenced assets (in markdown files for articles) and replace their link with that of the return from Vanilla's upload media route. This takes far too long to do during debugging and creation but was tested thoroughly.

Deleting of categories handled last. As procedures information is mapped to actual vanilla resources that already exist, articles are deleted and categories are marked for deletion. Vanilla does not support the deleting of categories that have items. To resolve this, articles are deleted first. We then sort the marked Knowledge categories by length of their path structure. Longer paths (deeper nested) get deleted first as deletable procedures are consumed.

Logging has been added (Logging.ts). This might not be the final solution but will write out error, info and debugging info into the info folders corresponding markdown files. If we change it later we just need to add the new tool to the abstraction layer in logging.ts.

Test mocks may not be accurate on data structure but do check the behavior of their target functions.
