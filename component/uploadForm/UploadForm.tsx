import { Box, Button, FileInput, Group, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import Swal from 'sweetalert2'

const UploadForm = ({ id, open, close }: { id?: string; open: Function; close: Function }) => {
  const form = useForm({
    initialValues: {
      select: '',
      file: [],
    },
  })

  const handleUpload = async (values: any) => {
    const data = new FormData()
    data.set('updateType', values.select)
    data.set('file', values.file)
    console.log(values)
    try {
      const response = await fetch(`/api/device/${id}/file-upload`, {
        method: 'POST',

        body: data,
      })
      if (response.ok) {
        // window.location.reload()
        Swal.fire({
          title: 'Successful',
          // text: " ",
          icon: 'success',
        })
        window.location.reload()
      } else throw new Error('Invalid Server Response')
      return response.json()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(handleUpload)}>
        {/* <TextInput
          withAsterisk
          label="Name"
          placeholder="Device name"
          {...form.getInputProps('name')}
        /> */}
        {/* <FileInput clearable label="Upload firmware" placeholder="Firmware" {...form.getInputProps('firmware')} /> */}

        <Select
          clearable
          label="Select Type"
          placeholder=""
          data={[
            { label: 'Firmware', value: 'firmware' },
            { label: 'FileSystem', value: 'filesystem' },
          ]}
          {...form.getInputProps('select')}
        />
        <FileInput clearable label="Upload" placeholder="Code" {...form.getInputProps('file')} />

        <Group justify="flex-end" mt="md">
          <Button type="submit" onSubmit={() => close}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default UploadForm
