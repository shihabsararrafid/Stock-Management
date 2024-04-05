'use client'
import { useProduct } from '@/app/hooks/useProductHook'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import { Anchor, Avatar, Breadcrumbs, Button, Group, NumberInput, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useSWRConfig } from 'swr'

const ProductDetailsPage = ({ params }: { params: { productId: string } }) => {
  const searchParams = useSearchParams()
  const [userId, serUserId] = useState('')
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
  const [loading, setLoading] = useState(false)
  const [openedModal, { open, close }] = useDisclosure(false)
  useEffect(() => {
    const userId = sessionStorage.getItem('userId')
    userId && serUserId(userId)
  }, [])
  if (isLoading) return <LoaderComponent />
  return (
    <div className="mx-auto mt-10 w-[90%] lg:w-[70%]">
      <Breadcrumbs separator=">">{items}</Breadcrumbs>
      <section className="mt-4">
        <Group align="start">
          <Avatar
            variant="filled"
            size={300}
            color="violet"
            // style={{ borderRadius: 10, border: '1px solid black' }}
            src={product?.photoUrl}
            alt={`${product?.name} Image`}
          >
            {(product?.name.split(' ')[0][0], product?.name.split(' ')[1][0])}
          </Avatar>
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
          </div>
        </Group>
      </section>
      <div className="mt-5">
        <Text c="dimmed">Stock</Text>
        <Text>{product?.stock}</Text>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1>Enter the loan amount</h1>
        <form
          action="
        "
          className="w-full"
          onSubmit={async (event) => {
            event.preventDefault()

            setLoading(true)
            console.log((event.target as HTMLFormElement).stock.value)
            const data = {
              productId: params.productId,
              userId: userId,
              value: parseInt((event.target as HTMLFormElement).stock.value),
              createdAt: new Date(),
            }
            // return
            try {
              const res = await fetch('/api/borrow', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              if (res.ok) {
                await Swal.fire('Success', 'Borrower Added', 'success')
                mutate('/api/profile')
                window.location.reload()
              } else {
                const data = await res.json()
                console.log(data, 'data')
                throw new Error(data instanceof Error ? data.message : 'Invalid Server Response')
              }
            } catch (error) {
              await Swal.fire('Error', 'Invalid Server Response', 'error')
            } finally {
              setLoading(false)
            }
          }}
        >
          <NumberInput
            placeholder="Enter amount"
            min={0}
            my={20}
            name="stock"
            max={product?.stock}
            label="Loan Amount"
            withAsterisk
            rightSection={<></>}
            variant="filled"
          ></NumberInput>
          <Button loading={loading} bg="#CD5320" type="submit" mt="sm">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ProductDetailsPage
