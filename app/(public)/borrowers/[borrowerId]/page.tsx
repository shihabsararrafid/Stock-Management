'use client'
import { useBorrowSingleUser } from '@/app/hooks/useBorrowLists'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Group,
  Image,
  Modal,
  Table,
  Text,
  Tooltip,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
import { useSWRConfig } from 'swr'

const BorrowersDetailPage = ({ params }: { params: { borrowerId: string } }) => {
  const searchParams = useSearchParams()
  const items = [
    { title: 'Borrowers', href: '/borrowers' },
    { title: searchParams.get('name'), href: `/borrowers/${params.borrowerId}` },
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
  const { borrows, isLoading } = useBorrowSingleUser(params.borrowerId)
  const { mutate } = useSWRConfig()
  const [openedModal, { open, close }] = useDisclosure(false)
  if (isLoading) return <LoaderComponent />

  const deleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/borrow/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        await Swal.fire('Success', 'List Deleted', 'success')
        const url = `/api/borrow/${params.borrowerId}`
        mutate(url)
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
    <div className="mx-auto mt-10 w-[90%] lg:w-[70%]">
      <Breadcrumbs separator=">">{items}</Breadcrumbs>
      <section className="mt-4">
        <Group align="start">
          <Image
            style={{ width: '300px', height: '250px', borderRadius: 10, border: '1px solid black' }}
            src={borrows?.[0].user.image || ''}
            alt={`${borrows?.[0].user?.username} Image`}
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
              {borrows?.[0].user?.username}
            </Text>
          </div>
        </Group>
      </section>
      <div className="mt-5">
        <Text c="dimmed">Email</Text>
        <Text>{borrows?.[0].user?.email}</Text>
      </div>
      <div className="w-1/2">
        <Table>
          <Table.Tr>
            <Table.Th>Product Name</Table.Th>
            <Table.Th>Count</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
          {borrows?.map((borrow) => (
            <Table.Tr key={borrow.id}>
              <Table.Td>{borrow?.product?.name}</Table.Td>
              <Table.Td>{borrow?.value}</Table.Td>
              <Table.Td>{format(new Date(borrow?.createdAt), 'dd-MMM-yyyy hh:mm a')}</Table.Td>
              <Table.Td>
                <Group gap={2}>
                  <Tooltip label="Edit">
                    <ActionIcon>
                      <IconPencil />
                    </ActionIcon>
                  </Tooltip>
                  {/* <Space w={20} /> */}
                  <Tooltip label="Delete">
                    <ActionIcon onClick={() => deleteUser(borrow.id)}>
                      <IconTrash />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table>
      </div>
      <Modal
        centered
        size="xl"
        styles={{ root: { height: '600px' } }}
        opened={openedModal}
        onClose={() => {
          close()
          const url = `/api/product/${params.borrowerId}`
          mutate(url)
        }}
      ></Modal>
    </div>
  )
}

export default BorrowersDetailPage
