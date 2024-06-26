import { IProduct } from '@/app/hooks/useProductHook'
import { ActionIcon, Box, Card, Group, Image, Menu, Modal, Text, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useSWRConfig } from 'swr'
import AddItemForm from '../header/AddItemDrwaer'

export default function ProductCard({ product }: { product: IProduct }) {
  const { mutate } = useSWRConfig()
  const [openedModal, { open, close }] = useDisclosure(false)
  const [role, setRole] = useState('user')
  const deleteProduct = async () => {
    try {
      const res = await fetch(`/api/product/${product.id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        await Swal.fire('Success', 'Product Deleted', 'success')

        mutate('/api/product')
      } else {
        const data = await res.json()

        throw new Error(data instanceof Error ? data.message : 'Invalid Server Response')
      }
    } catch (error) {
      await Swal.fire('Error', 'Invalid Server Response', 'error')
    } finally {
    }
  }
  useEffect(() => {
    const role = sessionStorage.getItem('role')
    role && setRole(role)
  }, [])
  return (
    <Card bg="#EAEAEA" withBorder shadow="sm" radius="md">
      <Card.Section bg="white" style={{ position: 'relative', padding: 5, height: '100%' }} mt="sm">
        <Group style={{ position: 'absolute', right: 0 }} justify="end">
          <Menu trigger="hover" withinPortal position="bottom-end" shadow="md">
            {role === 'admin' && (
              <Menu.Target>
                <ActionIcon color="#A5A6A5">
                  <IconDots style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
              </Menu.Target>
            )}

            <Menu.Dropdown>
              <Menu.Item
                onClick={open}
                leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                onClick={deleteProduct}
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                color="red"
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Image
          style={{ width: '100%', height: '100%' }}
          src={product?.photoUrl}
          alt={`${product.name} Image`}
        />
      </Card.Section>
      <Box
        component={Link}
        href={
          role === 'user'
            ? `/products/borrow/${product.id}?name=${product.name}`
            : `/products/${product.id}?name=${product.name}`
        }
      >
        <Text span fw={700} inherit c="black">
          {product.name}
        </Text>{' '}
        <Text>{product.stock}</Text>
      </Box>
      <Modal
        centered
        size="xl"
        styles={{ root: { height: openedModal ? '600px' : 0 } }}
        opened={openedModal}
        onClose={close}
      >
        <AddItemForm
          url={`/api/product/${product.id}`}
          method="PATCH"
          initialValues={product}
          close={close}
        />
      </Modal>
    </Card>
  )
}
