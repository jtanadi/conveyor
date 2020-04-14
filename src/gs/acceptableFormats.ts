// Mapping of common format names and ghostscript "devices"
// https://www.ghostscript.com/doc/9.22/Devices.htm
const acceptableFormats = new Map()
acceptableFormats.set("png", "pngalpha")
acceptableFormats.set("jpg", "jpeg")
acceptableFormats.set("tif", "tiff24nc")
acceptableFormats.set("ps", "ps2write")
acceptableFormats.set("eps", "eps2write")
acceptableFormats.set("pdf", "pdf")

export default acceptableFormats
