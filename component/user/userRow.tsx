import { IUser } from '@/app/hooks/useUserHook'
import {
  ActionIcon,
  Avatar,
  Divider,
  Group,
  Indicator,
  Menu,
  Modal,
  Stack,
  Text,
  Tooltip,
  rem,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useSWRConfig } from 'swr'
import UserCreateForm from './userForm'

const UserRow = ({ user }: { user: IUser }) => {
  const { mutate } = useSWRConfig()
  const [openedModal, { open, close }] = useDisclosure(false)
  const deleteUser = async () => {
    try {
      const res = await fetch(`/api/user/${user.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        await Swal.fire('Success', 'User Deleted', 'success')

        mutate('/api/user')
      } else {
        const data = await res.json()

        throw new Error(data instanceof Error ? data.message : 'Invalid Server Response')
      }
    } catch (error) {
      await Swal.fire('Error', 'Invalid Server Response', 'error')
    } finally {
    }
  }
  return (
    <div className="cursor-pointer hover:bg-gray-200">
      <Group my={10} justify="space-between">
        <Group>
          <Indicator label={`${user.role}`} size={16} color="orange">
            <Avatar size="xl" variant="filled" radius="md" src={user.image ?? ''} />
          </Indicator>
          <Link href={`/users/${user.id}?name=${user.username}`}>
            <Stack>
              <Text fw={600}>{user.username}</Text>
              <Text>{user.department}</Text>
            </Stack>
          </Link>
        </Group>

        <Menu trigger="click" withinPortal position="bottom-end" shadow="md">
          <Tooltip label="Menu">
            <Menu.Target>
              <ActionIcon variant="default">
                <IconDots style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Menu.Target>
          </Tooltip>

          <Menu.Dropdown>
            <Menu.Item
              onClick={open}
              leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              onClick={deleteUser}
              leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
              color="red"
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Divider size="sm" c="black" />
      <Modal
        centered
        size="xl"
        styles={{ root: { height: '600px' } }}
        opened={openedModal}
        onClose={() => {
          close()
          const url = `/api/users/${user.id}`
          mutate(url)
        }}
      >
        <UserCreateForm
          url={`/api/user/${user?.id}`}
          method="PATCH"
          initialValues={user}
          close={close}
        />
      </Modal>
    </div>
    // </Link>
  )
}

export default UserRow
