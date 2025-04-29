export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const swap = (arr: number[], i: number, j: number) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
  return arr
}

export const defaultCompare = (a: number, b: number) => {
  if (a === b) {
    return 0
  }
  return a < b ? -1 : 1
}
