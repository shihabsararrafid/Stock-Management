import useSWR, { Fetcher } from 'swr'
interface generalResponse {
  message: string
  success: boolean
}
export interface IUser {
  image: string | null
  id: string
  role: string
  username: string
  email: string
  department: string | null
}
interface allUserResponse extends generalResponse {
  users: IUser[]
}
interface singleUserResponse extends generalResponse {
  user: IUser
}
const fetcher: Fetcher<allUserResponse, string> = (url) =>
  fetch(url).then((r) => r.json() as unknown as allUserResponse)
const singleUserFetcher: Fetcher<singleUserResponse, string> = (url) =>
  fetch(url).then((r) => r.json() as unknown as singleUserResponse)
export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR(`/api/user`, fetcher)

  return {
    users: data?.users,
    isLoading,
    isError: error,
    mutate,
  }
}
export function useProduct(id: string) {
  const { data, error, isLoading, mutate } = useSWR(`/api/user/${id}`, singleUserFetcher)

  return {
    user: data?.user,
    isLoading,
    isError: error,
    mutate,
  }
}
