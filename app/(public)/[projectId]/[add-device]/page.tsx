'use client'
import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

const AddDevice = ({ params }: { params: { projectId: string } }) => {
  const router = useRouter()
  const form = useForm({
    initialValues: {
      name: '',
    },
  })

  const handleNewDevice = async (values: any) => {
    const data = { projectId: parseInt(params.projectId), name: values.name }
    // console.log(values)
    try {
      const url = ''
      const response = await fetch('/api/device', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        await Swal.fire({
          title: 'Successful',
          text: 'Device Added',
          icon: 'success',
        })
        router.push(`/${params.projectId}`)
      } else throw new Error('Invalid Server Response')
      return response.json()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <section className="my-5">
        <p className="text-5xl font-bold">Add New Device</p>
      </section>
      <section className="lg:mx-96 ">
        <form onSubmit={form.onSubmit(handleNewDevice)}>
          <TextInput label="Device Name" placeholder="" {...form.getInputProps('name')} />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </section>
    </div>
  )
}

export default AddDevice
