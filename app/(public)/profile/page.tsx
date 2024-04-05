'use client'
import { useGetProfile } from '@/app/hooks/useGetProfile'
import { IProduct } from '@/app/hooks/useProductHook'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import { Avatar, Modal, Table, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { format } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
import { useSWRConfig } from 'swr'

const BorrowersDetailPage = ({ params }: { params: { borrowerId: string } }) => {
  const searchParams = useSearchParams()

  const { data, isLoading } = useGetProfile()
  const { mutate } = useSWRConfig()

  if (isLoading) return <LoaderComponent />

  return (
    <div className="mx-auto mt-10 flex w-full flex-col items-center justify-center">
      <section className="mt-4">
        <div>
          <Avatar size={200} src={data?.image || ''} alt={`${data?.username} Image`} />

          <Text styles={{ root: { fontSize: 36 } }} size="xl" fw={700}>
            {data?.username}
          </Text>
          <Text c="blue">{data?.email}</Text>
        </div>
      </section>

      <h1 className="text-2xl font-semibold">List of Borrowed Items</h1>
      <div className="w-full lg:w-1/2">
        <Table>
          <Table.Tr>
            <Table.Th>Product Name</Table.Th>
            <Table.Th>Qty</Table.Th>
            <Table.Th>Date</Table.Th>
          </Table.Tr>
          {data?.borrowList?.map((borrow) => <TableRow borrow={borrow} key={borrow.id}></TableRow>)}
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
    userId: string
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
        // const url = `/api/borrow/${borrow.user.id}`
        // mutate(url)
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
      </Table.Tr>
      <Modal
        centered
        size="xl"
        styles={{ root: { height: '600px' } }}
        opened={openedModal}
        onClose={() => {
          close()
          //   const url = `/api/borrow/${borrow.user.id}`
          //   mutate(url)
        }}
      >
        {/* <AddBorrower
          method="PATCH"
          url={`/api/borrow/${borrow.id}`}
          initialValues={{
            productId: borrow.product.id,
            createdAt: new Date(borrow.createdAt),
            userId: borrow.user.id,
            value: borrow.value,
          }}
          close={close}
        /> */}
      </Modal>
    </>
  )
}
