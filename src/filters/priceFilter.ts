export const priceFilter = (input: number) => {
  if (isNaN(input) || !input) {
    return '-'
  }

  return `$${input.toFixed(2)}`
}
