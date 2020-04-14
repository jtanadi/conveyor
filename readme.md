# Conveyor

Converyor-belt-like service for file conversion.

Currently supports PDF -> image -> S3, but in the future should support a variety of input and output file types, as well as an option to download as zip.

## Using Conveyor

Conveyor converts with `GhostScript` and uses a task queue to keep track of files to be converted and uploaded. When a task has been completed, the service sends data to a `pingback` address.

### Sending Files

To convert a file, send it as the **body** to the `/api/convert/pdf` endpoint, with the following **required headers**:

```
Content-Type: application/pdf
x-Pingback: https://example.com/pingback
```

Conveyor also accepts the following optional header and will forward it to the provided `pingback` address. Forwarded data will remain as a string and will be sent in the body.

```
x-Forward-Data: { some: data, toBe: forwarded, as: string }
```

### `pingback`

After a `pdf` has been converted and uploaded to S3, Conveyor will send a `POST` request to the provided `pingback` address.

The body of the request will take the following form:

```js
{
  // name of directory where pages are stored
  s3Dir: "abcdef123",

  // array of page files
  files: [
    "page001.png",
    "page002.png",
    "page003.png",
    etc.
  ],

  // forwardData will be included if provided
  forwardData: "{ 'some': 'data', 'toBe': 'forwarded', 'as': 'string' }"
}
```

## Current API Endpoints

**In development: API is subject to change**

### `GET /api/ping`

Wakes server up

### `PUT /api/convert/pdf`

Converts PDF into one of a handful of supported image types, specified as a querystring parameter. Conveyor **defaults to `png`** when no image type is specified.

Example querystring options:

```
/api/convert/pdf?out=jpg
/api/convert/pdf?out=tif
```

## Future Development

Some features or future development of Conveyor

### Download

Support the ability to download converted files (as zip), like so:

```
/api/convert/pdf?out=tif&download
```

### Document

Convert to other document formats

Convert to `docx` or a Google Doc

```
/api/convert/document?out=docx&download

/api/convert/document?out=gdoc
```
