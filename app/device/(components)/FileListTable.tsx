'use client'
import { Table } from '@mantine/core'
import { format } from 'date-fns'
import { individualFileType } from './LoadFIles'

const FileListTable = ({ files }: { files: individualFileType[] }) => {
  return (
    <Table>
      <Table.Tr>
        <Table.Th>Sl No</Table.Th>
        <Table.Th>Update Type</Table.Th>
        <Table.Th>Uploaded At</Table.Th>
        <Table.Th>Link</Table.Th>
      </Table.Tr>
      {files.map((file, index) => (
        <Table.Tr key={file.id}>
          <Table.Td>{index + 1}</Table.Td>
          <Table.Td>{file.updateType}</Table.Td>
          <Table.Td>{format(new Date(file.createdAt), 'dd-MMM-yyyy -> hh:mm a')}</Table.Td>
          <Table.Td>
            <a className="text-blue-500 underline" href={file.fileLink} target="_blank">
              Download
            </a>
          </Table.Td>
        </Table.Tr>
      ))}
    </Table>
  )
}

export default FileListTable
