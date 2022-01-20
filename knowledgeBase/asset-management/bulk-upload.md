# Bulk Upload

JupiterOne supports the bulk upload of entity and relationship data via a JSON file. This is done in the Assets app.

## Data Format

For the bulk upload process to succeed, the file must adhere to the bulk upload schema defined [here](../APIs_and-integrations/bulk-upload-schema.md).

## Guide

Navigate to the **Assets** app -> Click the plus (Add Entity) button -> Either drag your file into the drop zone, or click the drop zone to select your file.

You will be prompted to select (or enter a new) "scope" for the upload. A scope identifies relationships to update or delete during diffing. Previously existing entities/relationships within the same scope that no longer exist in the latest upload are deleted.

## Public API

JupiterOne exposes a public REST API to programmatically perform bulk entity and relationship uploads. The details on that API can be seen [here](../APIs_and-integrations/jupiterone-api.md).

## Notes

Depending on the size of the uploaded file, the entities and relationships may not show up in the Inventory Table right away. Hold tight! JupiterOne is processing your data, and it will show up in your Inventory soon.
