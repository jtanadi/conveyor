# Conveyor
Converyor-belt-like service for file conversion.

Currently supports PDF -> PNG -> S3, but in the future should support a variety of input and output file types, as well as an option to download as zip.

**In development: API is subject to change**

## Current API Endpoints
`/api/ping` - Wakes server up
`/api/upload` - Takes PDF as body, converts to PNG, and uploads to S3

## Proposed API
### Images
`/api/convert/image` - Converts file into `png` (default) and uploads to S3 by default
`/api/convert/image?out=jpg` - Converts file into `jpg` and uploads to S3 by default
`/api/convert/image?out=pdf&download` - Converts file into `pdf` and allows client to download (as zip)

### Document
`/api/convert/document?out=docx&download` - Converts file into `docx` and allows client to download (as zip)
`/api/convert/document?out=gdoc` - Converts file into Google Doc

Input file type can be gathered from header.

