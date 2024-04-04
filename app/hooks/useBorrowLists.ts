import useSWR, { Fetcher } from 'swr'
import { IProduct } from './useProductHook'
import { IUser } from './useUserHook'
interface generalResponse {
  message: string
  success: boolean
}

export interface IBorrow {
  userId: string
  name: string
  product: IProduct
  user: IUser
}
interface allBorrowListResponse extends generalResponse {
  borrowLists: { [key: string]: IBorrow[] }
}
interface singleBorrowResponse extends generalResponse {
  data: {
    product: IProduct
    value: number
    id: string
    user: IUser
    createdAt: Date
  }[]
}
const fetcher: Fetcher<allBorrowListResponse, string> = (url) =>
  fetch(url).then((r) => r.json() as unknown as allBorrowListResponse)
const singleProductFetcher: Fetcher<singleBorrowResponse, string> = (url) =>
  fetch(url).then((r) => r.json() as unknown as singleBorrowResponse)
export function useBorrowLists() {
  const { data, error, isLoading, mutate } = useSWR(`/api/borrow`, fetcher)

  return {
    borrowLists: data?.borrowLists,
    isLoading,
    isError: error,
    mutate,
  }
}
export function useBorrowSingleUser(id: string) {
  const { data, error, isLoading, mutate } = useSWR(`/api/borrow/${id}`, singleProductFetcher)

  return {
    borrows: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}
