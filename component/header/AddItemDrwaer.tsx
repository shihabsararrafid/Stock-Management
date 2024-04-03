import { Box, Button, FileInput, Group, Loader, NumberInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { PutBlobResult } from '@vercel/blob'
import { useState } from 'react'
import { FaRegFileImage } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { useSWRConfig } from 'swr'

export default function AddItemForm({ close }: { close: () => void }) {
  const [isImageUploading, setImageUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [key, setKey] = useState(1000)
  const { mutate } = useSWRConfig()
  const form = useForm({
    initialValues: { name: '', photoUrl: '', stock: 0 },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      photoUrl: (value) => (!value ? 'Image is required' : null),
    },
  })

  return (
    <Box key={key} w="100%">
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          if (form.values.photoUrl.length === 0) {
            form.setFieldError('photoUrl', 'Image is required')
            return
          }
          setLoading(true)
          try {
            const res = await fetch('/api/product', {
              method: 'POST',
              body: JSON.stringify(form.values),
              headers: {
                'Content-Type': 'application/json',
              },
            })
            if (res.ok) {
              await Swal.fire('Success', 'Product Added', 'success')
              setKey(key + 1)
              mutate('/api/product')
              form.reset()
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
        <TextInput
          variant="filled"
          label="Item Name"
          description=" "
          required
          placeholder="Name"
          {...form.getInputProps('name')}
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
          {...form.getInputProps('stock')}
        />
        <FileInput
          mt="lg"
          onChange={async (event) => {
            if (!event) {
              form.setFieldValue('photoUrl', '')
              return
            }
            setImageUploading(true)
            try {
              const response = await fetch(`/api/image/upload?filename=${event?.name}`, {
                method: 'POST',
                body: event,
              })
              const newBlob = (await response.json()) as PutBlobResult
              if (response.ok) {
                form.setFieldValue('photoUrl', newBlob.url)
              } else throw new Error('Invalid Server Response')
            } catch (error) {
              await Swal.fire('Error', 'Unable to upload image', 'error')
            } finally {
              setImageUploading(false)
            }
          }}
          clearable
          name="photoUrl"
          leftSection={<FaRegFileImage size={20} />}
          rightSection={isImageUploading ? <Loader size={20} /> : undefined}
          label="Image"
          accept="image/*"
          description=" "
          variant="filled"
          placeholder="Upload Image"
          required
          leftSectionPointerEvents="none"
        />
        <Group style={{ position: 'absolute', bottom: 15 }}>
          <Button
            disabled={form.values.photoUrl.length === 0}
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
