import PDFParser from "pdf2json"

// Not sure why it's this
const MAGIC_NUMBER = 4.5

export default (pdfPath: string): Promise<number[][]> => {
  const pdfParser = new PDFParser()

  pdfParser.loadPDF(pdfPath)

  return new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", (errData) => {
      reject(errData.parseError)
    })

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const pageDims = pdfData.formImage.Pages.map((page) => {
        // page.Width is accessible because of modified pdf.js
        const width = page.Width / MAGIC_NUMBER
        const height = page.Height / MAGIC_NUMBER
        return [width, height]
      })

      resolve(pageDims)
    })
  })
}
