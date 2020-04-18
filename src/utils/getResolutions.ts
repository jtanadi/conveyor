// Based on 17 x 11 @ 150 DPI
const MAX_PIXELS = {
  WIDTH: 2550,
  HEIGHT: 1650,
}

export default (dims: number[][]): number[] => {
  let maxWidth = 0
  let maxHeight = 0

  for (const dim of dims) {
    if (dim[0] > maxWidth) {
      maxWidth = dim[0]
    }

    if (dim[1] > maxHeight) {
      maxHeight = dim[1]
    }
  }

  return dims.map((dim: number[]) => {
    if (dim[0] < dim[1]) {
      return Math.round(MAX_PIXELS.WIDTH / dim[0])
    } else {
      return Math.round(MAX_PIXELS.HEIGHT / dim[1])
    }
  })
}
