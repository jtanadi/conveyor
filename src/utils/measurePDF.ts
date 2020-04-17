import PDFParser from "pdf2json"

const pdfParser = new PDFParser()

// Not sure why it's this
const MAGIC_NUMBER = 4.5

export default (pdfPath: string): Promise<number[][]> => {
  pdfParser.loadPDF(pdfPath)

  return new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", (errData) => {
      reject(errData.parseError)
    })

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const pageDims: number[][] = []

      const width = pdfData.formImage.Width / MAGIC_NUMBER
      const pages = pdfData.formImage.Pages

      for (const page of pages) {
        const height = page.Height / MAGIC_NUMBER
        pageDims.push([width, height])
      }

      resolve(pageDims)
    })
  })
}
