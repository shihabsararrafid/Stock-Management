'use client'
import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import Swal from 'sweetalert2'
const AddNewProject = () => {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
    },
  })

  const handleNewProject = async (values: any) => {
    console.log(values)
    try {
      const url = ''
      const response = await fetch('/api/project', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      if (response.ok)
        Swal.fire({
          title: 'Successful',
          text: 'Project Added',
          icon: 'success',
        })
      else {
        Swal.fire({
          title: 'Error',
          // text: 'Project Added',
          icon: 'error',
        })
      }
      return response.json()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <section className="my-5">
        <p className="text-5xl font-bold">Add New Project</p>
      </section>
      <section className="lg:mx-96 ">
        <form onSubmit={form.onSubmit(handleNewProject)}>
          <TextInput
            withAsterisk
            label="Project Name"
            placeholder=""
            {...form.getInputProps('name')}
          />
          <TextInput
            withAsterisk
            label="Description"
            placeholder=""
            {...form.getInputProps('description')}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </section>
    </div>
  )
}

export default AddNewProject
