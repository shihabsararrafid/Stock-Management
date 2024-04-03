import useSWR, { Fetcher } from 'swr'
interface generalResponse {
  message: string
  success: boolean
}
export interface IProduct {
  id: string
  name: string
  photoUrl: string
  stock: number
}
interface allProductResponse extends generalResponse {
  products: IProduct[]
}
interface singleProductResponse extends generalResponse {
  data: IProduct
}
const fetcher: Fetcher<allProductResponse, string> = (url) =>
  fetch(url).then((r) => r.json() as unknown as allProductResponse)
const singleProductFetcher: Fetcher<singleProductResponse, string> = (url) =>
  fetch(url).then((r) => r.json() as unknown as singleProductResponse)
export function useProducts() {
  const { data, error, isLoading, mutate } = useSWR(`/api/product`, fetcher)

  return {
    products: data?.products,
    isLoading,
    isError: error,
    mutate,
  }
}
export function useProduct(id: string) {
  const { data, error, isLoading, mutate } = useSWR(`/api/product/${id}`, singleProductFetcher)

  return {
    product: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}
