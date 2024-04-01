export interface projectType {
  id: number
  name: string
  description: string
}
export interface deviceListType {
  id: string
  isUpdated: boolean
  name: string | null
  projectId: number
}
