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
const fetcher: Fetcher<allProductResponse, string> = (url) =>
  fetch(url).then((r) => r.json() as unknown as allProductResponse)
export function useProducts() {
  const { data, error, isLoading, mutate } = useSWR(`/api/product`, fetcher)

  return {
    products: data?.products,
    isLoading,
    isError: error,
    mutate,
  }
}
