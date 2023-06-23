import { priceFilter } from './priceFilter'

const filters = {
  priceFilter
}
export default filters

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: {
      priceFilter: (input: number) => string
    }
  }
}

export {}
