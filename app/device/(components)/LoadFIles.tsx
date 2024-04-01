'use client'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import FileListTable from './FileListTable'

export interface responseType {
  success: boolean
  message: string
  data: {
    files: individualFileType[]
  }
}
export interface individualFileType {
  id: number
  updateType: string
  fileLink: string
  isLatest: boolean
  deviceId: string
  createdAt: string
}
const LoadFiles = ({ deviceId }: { deviceId: string }) => {
  const [fileList, setFileList] = useState<individualFileType[] | null>(null)
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/device/${deviceId}?filesInclude=true`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (res.ok) {
          const data = (await res.json()) as responseType
          const fileList = data?.data?.files
          setFileList(fileList)
        } else throw new Error('Unknown Error Occurred')
      } catch (error) {
        Swal.fire(
          'Error',
          error instanceof Error ? error.message : 'Invalid Server Response',
          'error',
        )
      }
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>{fileList && <FileListTable files={fileList} />}</div>
}

export default LoadFiles
