'use client'

import UploadForm from '@/component/uploadForm/UploadForm'
import { Button, Group, Modal, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ReactNode } from 'react'

const IndividualDevicePageHeader = ({
  params,
  children,
}: {
  params: { deviceId: string }
  children: ReactNode
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <div>
      <Group justify="space-between">
        <Title>Uploaded File List</Title>
        <Button onClick={open}>Upload New file</Button>
      </Group>
      <Modal title="Upload Binary File" opened={opened} onClose={close} centered>
        <UploadForm id={params.deviceId} open={open} close={close} />
      </Modal>
      {children}
    </div>
  )
}

export default IndividualDevicePageHeader
