// 17" @ 250 DPI
const MAX_PIXELS = 17 * 250

export default (dims: number[][]): number[] => {
  return dims.map((dim: number[]) => {
    if (dim[0] < dim[1]) {
      // Portrait, scale to height
      return Math.round(MAX_PIXELS / dim[1])
    } else {
      // Landscape or square, scale to width
      return Math.round(MAX_PIXELS / dim[0])
    }
  })
}
