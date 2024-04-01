import { Box, Button, FileInput, Group, NumberInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { FaRegFileImage } from 'react-icons/fa'

export default function AddItemForm() {
  const form = useForm({
    initialValues: { name: '', email: '', age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
    },
  })

  return (
    <Box w="100%">
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          variant="filled"
          label="Item Name"
          description=" "
          placeholder="Name"
          {...form.getInputProps('name')}
        />

        <NumberInput
          mt="lg"
          rightSection={<></>}
          label="Stock"
          description=" "
          variant="filled"
          placeholder="Enter Stock Amount"
          min={0}
          {...form.getInputProps('age')}
        />
        <FileInput
          mt="lg"
          clearable
          leftSection={<FaRegFileImage size={20} />}
          label="Image"
          accept="image/*"
          description=" "
          variant="filled"
          placeholder="Upload Image"
          leftSectionPointerEvents="none"
        />
        <Group style={{ position: 'absolute', bottom: 15 }}>
          <Button bg="#CD5320" type="submit" mt="sm">
            Submit
          </Button>
          <Button variant="default" type="submit" mt="sm">
            Cancel
          </Button>
        </Group>
      </form>
    </Box>
  )
}
