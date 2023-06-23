import type { Product } from '@/types/product'
import request from '../utils/request'
import type { Params, ResponseType } from '@/types'

export function getProductList(params: Params): Promise<ResponseType<Product>> {
  return request({
    url: '/products',
    method: 'get',
    params
  })
}

export function addProduct(data: Product): Promise<Product> {
  return request({
    url: '/products',
    method: 'POST',
    data
  })
}

export function editProduct(data: Product): Promise<Product> {
  const { id } = data
  return request({
    url: `/products/${id}`,
    method: 'PUT',
    data
  })
}

export function delProduct(id: string): Promise<Product> {
  return request({
    url: `/products/${id}`,
    method: 'DELETE'
  })
}

const productApi = {
  getProductList,
  delProduct
}

export default productApi
