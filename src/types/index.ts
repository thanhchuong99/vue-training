export interface PageTable<T> {
  list: Array<T>
  total: number
}

export interface Params {
  _page?: number
  _limit?: number
  _q: string | undefined
}

export interface ResponseType<T> {
  list: T[]
  total: number
}
