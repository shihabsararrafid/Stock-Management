import useSWR, { Fetcher } from 'swr'
import { IProduct } from './useProductHook'
interface generalResponse {
  message: string
}

export interface IBorrow {
  userId: string
  id: string
  product: IProduct
  value: number
  createdAt: Date
}
interface profileGetResponse extends generalResponse {
  data: {
    image: string | null
    id: string
    role: string
    username: string
    email: string
    department: string | null
    borrowList: IBorrow[]
  }
}

const fetcher: Fetcher<profileGetResponse, string> = (url) =>
  fetch(url).then((r) => r.json() as unknown as profileGetResponse)

export function useGetProfile() {
  const { data, error, isLoading, mutate } = useSWR(`/api/auth/profile`, fetcher)

  return {
    data: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}
