import { useProducts } from '@/app/hooks/useProductHook'
import { useUsers } from '@/app/hooks/useUserHook'
import { Box, Button, Group, NumberInput, Select, Space } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useSWRConfig } from 'swr'
import LoaderComponent from '../Loader/LoaderComponent'

export default function AddBorrower({
  close,
  initialValues,
  url,
  method,
}: {
  close: () => void
  initialValues?: { productId: string; userId: string; value: number; createdAt: Date }
  url?: string
  method?: string
}) {
  const [isImageUploading, setImageUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(initialValues ? true : false)
  const [key, setKey] = useState(1000)
  const { products, isLoading } = useProducts()
  const { users, isLoading: isLoading1 } = useUsers()
  const { mutate } = useSWRConfig()
  const form = useForm({
    initialValues: {
      productId: initialValues?.productId ?? '',
      userId: initialValues?.userId ?? '',
      value: initialValues?.value ?? 0,
      createdAt: initialValues?.createdAt ?? new Date(),
    },
    validateInputOnChange: true,
    validate: {
      productId: (value) => (value.length < 5 ? 'Product is Required' : null),
      userId: (value) => (value.length < 5 ? 'Product is Required' : null),
    },
  })
  if (isLoading || isLoading1) return <LoaderComponent />
  const productOption = products?.map((product) => ({ label: product.name, value: product.id }))
  const userOPtions = users?.map((user) => ({ label: user.username, value: user.id }))
  return (
    <Box key={key} w="100%">
      <form
        onSubmit={async (event) => {
          event.preventDefault()

          setLoading(true)
          try {
            const res = await fetch(url ? url : '/api/borrow', {
              method: method ? method : 'POST',
              body: JSON.stringify(form.values),
              headers: {
                'Content-Type': 'application/json',
              },
            })
            if (res.ok) {
              await Swal.fire('Success', 'Borrower Added', 'success')
              setKey(key + 1)
              mutate('/api/product')
              close()
              //   mutate()
              !url ?? form.reset()
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
        <Select
          mt="lg"
          rightSection={<></>}
          label="Select Product"
          description=" "
          searchable
          variant="filled"
          placeholder="Select Product Name"
          required
          data={productOption}
          {...form.getInputProps('productId')}
        />

        <NumberInput
          mt="lg"
          rightSection={<></>}
          label="Stock"
          description=" "
          variant="filled"
          required
          placeholder="Enter Stock Amount"
          min={0}
          max={
            form.values.productId !== ''
              ? products?.find((product) => product.id === form.values.productId)?.stock
              : undefined
          }
          {...form.getInputProps('value')}
        />
        <Select
          rightSection={<></>}
          label="Select User"
          mt="lg"
          description=" "
          searchable
          variant="filled"
          required
          placeholder="Select User Name"
          data={userOPtions}
          {...form.getInputProps('userId')}
        />
        <DateTimePicker
          mt="lg"
          clearable
          description=" "
          variant="filled"
          required
          defaultValue={new Date()}
          label="Pick date and time"
          placeholder="Pick date and time"
          {...form.getInputProps('createdAt')}
        />
        <Space h={200} />
        <Group style={{ position: 'absolute', bottom: 15 }}>
          <Button
            disabled={Object.keys(form.errors).length !== 0}
            loading={loading}
            bg="#CD5320"
            type="submit"
            mt="sm"
          >
            Submit
          </Button>
          <Button onClick={close} variant="default" type="submit" mt="sm">
            Cancel
          </Button>
        </Group>
      </form>
    </Box>
  )
}
