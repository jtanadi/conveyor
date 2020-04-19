// Based on 17 x 11 @ 150 DPI
const MAX_PIXELS = {
  WIDTH: 2550,
  HEIGHT: 1650,
}

export default (dims: number[][]): number[] => {
  return dims.map((dim: number[]) => {
    if (dim[0] < dim[1]) {
      // Portrait, scale to height
      return Math.round(MAX_PIXELS.HEIGHT / dim[1])
    } else {
      // Landscape or square, scale to width
      return Math.round(MAX_PIXELS.WIDTH / dim[0])
    }
  })
}
