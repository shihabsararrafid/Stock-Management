'use client'
import { useUser } from '@/app/hooks/useUserHook'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import UserCreateForm from '@/component/user/userForm'
import { Anchor, Breadcrumbs, Button, Group, Image, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencil } from '@tabler/icons-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSWRConfig } from 'swr'

const UserDetailPage = ({ params }: { params: { userId: string } }) => {
  const searchParams = useSearchParams()
  const items = [
    { title: 'Users', href: '/users' },
    { title: searchParams.get('name'), href: `/users/${params.userId}` },
  ].map((item, index) => (
    <Anchor
      c={item.href === '/' ? 'gray' : 'black'}
      fw={item.href === '/' ? undefined : 700}
      href={item.href}
      key={index}
      component={Link}
    >
      {item.title}
    </Anchor>
  ))
  const { user, isLoading } = useUser(params.userId)
  const { mutate } = useSWRConfig()
  const [openedModal, { open, close }] = useDisclosure(false)
  if (isLoading) return <LoaderComponent />
  return (
    <div className="mx-auto mt-10 w-[90%] lg:w-[70%]">
      <Breadcrumbs separator=">">{items}</Breadcrumbs>
      <section className="mt-4">
        <Group align="start">
          <Image
            style={{ width: '300px', height: '250px', borderRadius: 10, border: '1px solid black' }}
            src={user?.image}
            alt={`${user?.username} Image`}
          />
          <div
            style={{
              height: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Text styles={{ root: { fontSize: 36 } }} size="xl" fw={700}>
              {user?.username}
            </Text>
            <Button
              onClick={open}
              w="fit-content"
              style={{ border: '1px solid black' }}
              variant="outline"
              c="black"
              leftSection={<IconPencil />}
            >
              Edit
            </Button>
          </div>
        </Group>
      </section>
      <div className="mt-5">
        <Text c="dimmed">Email</Text>
        <Text>{user?.email}</Text>
      </div>
      <Modal
        centered
        size="xl"
        styles={{ root: { height: openedModal ? '600px' : 0 } }}
        opened={openedModal}
        onClose={() => {
          close()
          const url = `/api/product/${params.userId}`
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
  )
}

export default UserDetailPage
