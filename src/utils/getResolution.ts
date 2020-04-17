// Based on 17 x 11 @ 150 DPI
const MAX_PIXELS = {
  WIDTH: 2550,
  HEIGHT: 1650,
}

export default (dims: number[][]): number => {
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

  if (maxHeight >= maxWidth) {
    return Math.round(MAX_PIXELS.HEIGHT / maxHeight)
  }

  return Math.round(MAX_PIXELS.WIDTH / maxWidth)
}
