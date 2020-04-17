// Based on 17 x 11 @ 150 DPI
const MAX_PIXELS = {
  WIDTH: 2550,
  HEIGHT: 1650,
}

export default (dims: number[][]): number => {
  let maxWidth = -Infinity
  let maxHeight = -Infinity

  for (const dim of dims) {
    if (dim[0] > maxWidth) {
      maxWidth = dim[0]
    }

    if (dim[1] > maxHeight) {
      maxHeight = dim[1]
    }
  }

  if (maxHeight >= maxWidth) {
    return MAX_PIXELS.HEIGHT / maxHeight
  }

  return MAX_PIXELS.WIDTH / maxWidth
}
