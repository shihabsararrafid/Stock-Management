'use client'
import { useBorrowSingleUser } from '@/app/hooks/useBorrowLists'
import { IProduct } from '@/app/hooks/useProductHook'
import { IUser } from '@/app/hooks/useUserHook'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import AddBorrower from '@/component/borrow/AddBorrower'
import {
  ActionIcon,
  Anchor,
  Avatar,
  Breadcrumbs,
  Group,
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
          <Avatar
            variant="filled"
            size={200}
            src={borrows?.[0]?.user?.image || ''}
            alt={`${borrows?.[0]?.user?.username} Image`}
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
              {borrows?.[0]?.user?.username}
            </Text>
          </div>
        </Group>
      </section>
      <div className="mt-5">
        <Text c="dimmed">Email</Text>
        <Text>{borrows?.[0]?.user?.email}</Text>
      </div>
      <div className="w-full lg:w-1/2">
        <Table>
          <Table.Tr>
            <Table.Th>Product Name</Table.Th>
            <Table.Th>Count</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
          {borrows?.map((borrow) => <TableRow borrow={borrow} key={borrow.id}></TableRow>)}
        </Table>
      </div>
    </div>
  )
}

export default BorrowersDetailPage

const TableRow = ({
  borrow,
}: {
  borrow: {
    product: IProduct
    value: number
    id: string
    user: IUser
    createdAt: Date
  }
}) => {
  const { mutate } = useSWRConfig()
  const [openedModal, { open, close }] = useDisclosure(false)
  const deleteBorrow = async () => {
    try {
      const res = await fetch(`/api/borrow/${borrow.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        await Swal.fire('Success', 'List Deleted', 'success')
        const url = `/api/borrow/${borrow.user.id}`
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
    <>
      <Table.Tr>
        <Table.Td>{borrow?.product?.name}</Table.Td>
        <Table.Td>{borrow?.value}</Table.Td>
        <Table.Td>{format(new Date(borrow?.createdAt), 'dd-MMM-yyyy hh:mm a')}</Table.Td>
        <Table.Td>
          <Group gap={2}>
            <Tooltip label="Edit">
              <ActionIcon onClick={open}>
                <IconPencil />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete">
              <ActionIcon onClick={deleteBorrow}>
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Table.Td>
      </Table.Tr>
      <Modal
        centered
        size="xl"
        styles={{ root: { height: '600px' } }}
        opened={openedModal}
        onClose={() => {
          close()
          const url = `/api/borrow/${borrow.user.id}`
          mutate(url)
        }}
      >
        <AddBorrower
          method="PATCH"
          url={`/api/borrow/${borrow.id}`}
          initialValues={{
            productId: borrow.product.id,
            createdAt: new Date(borrow.createdAt),
            userId: borrow.user.id,
            value: borrow.value,
          }}
          close={close}
        />
      </Modal>
    </>
  )
}
