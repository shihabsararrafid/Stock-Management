'use client'
import { useProduct } from '@/app/hooks/useProductHook'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import AddItemForm from '@/component/header/AddItemDrwaer'
import { Anchor, Breadcrumbs, Button, Group, Image, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencil } from '@tabler/icons-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSWRConfig } from 'swr'

const ProductDetailsPage = ({ params }: { params: { productId: string } }) => {
  const searchParams = useSearchParams()
  const items = [
    { title: 'View/Restock', href: '/' },
    { title: searchParams.get('name'), href: `/products/${params.productId}` },
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
  const { product, isLoading } = useProduct(params.productId)
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
            src={product?.photoUrl}
            alt={`${product?.name} Image`}
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
              {product?.name}
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
        <Text c="dimmed">Stock</Text>
        <Text>{product?.stock}</Text>
      </div>
      <Modal
        centered
        size="xl"
        styles={{ root: { height: '600px' } }}
        opened={openedModal}
        onClose={() => {
          close()
          const url = `/api/product/${params.productId}`
          mutate(url)
        }}
      >
        <AddItemForm
          url={`/api/product/${product?.id}`}
          method="PATCH"
          initialValues={product}
          close={close}
        />
      </Modal>
    </div>
  )
}

export default ProductDetailsPage
