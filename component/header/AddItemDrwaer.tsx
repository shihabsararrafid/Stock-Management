import {
  Box,
  Button,
  FileInput,
  Group,
  Loader,
  NumberInput,
  Space,
  TextInput,
  rem,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { IconXboxX } from '@tabler/icons-react'
import { PutBlobResult } from '@vercel/blob'
import { useState } from 'react'
import { FaRegFileImage } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { useSWRConfig } from 'swr'

export default function AddItemForm({
  close,
  initialValues,
  url,
  method,
}: {
  close: () => void
  initialValues?: { name: string; photoUrl: string; stock: number }
  url?: string
  method?: string
}) {
  const [isImageUploading, setImageUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(initialValues ? true : false)
  const [key, setKey] = useState(1000)
  const { mutate } = useSWRConfig()
  const form = useForm({
    initialValues: {
      name: initialValues?.name ?? '',
      photoUrl: initialValues?.photoUrl ?? '',
      stock: initialValues?.stock ?? 0,
    },
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
            const res = await fetch(url ? url : '/api/product', {
              method: method ? method : 'POST',
              body: JSON.stringify(form.values),
              headers: {
                'Content-Type': 'application/json',
              },
            })
            if (res.ok) {
              await Swal.fire('Success', 'Product Added', 'success')
              setKey(key + 1)
              mutate('/api/product')
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
        {!showPreview && (
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
            // value={initialValues?.photoUrl}
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
        )}
        {showPreview && (
          <TextInput
            variant="filled"
            label="Image"
            withAsterisk
            description=" "
            leftSection={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                style={{ width: rem(22), height: rem(22) }}
                alt="Initial Image"
                src={initialValues?.photoUrl}
              ></img>
            }
            rightSection={
              <IconXboxX
                onClick={() => {
                  // console.log(form.v);
                  modals.openConfirmModal({
                    title: 'Delete',
                    centered: true,
                    children: (
                      <>
                        <span className="d-block h4">Are you sure to remove image?</span>
                      </>
                    ),
                    labels: { confirm: 'Delete', cancel: 'Cancel' },
                    onConfirm: () => {
                      form.setFieldValue('photoUrl', '')
                      setShowPreview(false)
                    },
                  })
                }}
                size={20}
              />
            }
          ></TextInput>
        )}
        <Space h={200} />
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
