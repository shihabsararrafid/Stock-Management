'use client'
import {
  Button,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

const LoginForm = (props: PaperProps) => {
  const router = useRouter()
  const handleLogin = async (value: any) => {
    console.log('16', value)
    try {
      const url = ''
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      })
      if (response.ok) {
        await Swal.fire({
          title: 'Successful',
          text: 'Login successful',
          icon: 'success',
        })
        router.push('/')
      } else {
        await Swal.fire({
          title: 'Error',
          text: 'Unknown Error Occurred',
          icon: 'error',
        })
      }
      return response.json()
    } catch (error) {
      console.log(error)
    }
  }
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  })

  return (
    <Paper w="50%" radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Gizantech Firmware
      </Text>
      <form onSubmit={form.onSubmit(handleLogin)}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Button type="submit" radius="xl">
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  )
}

export default LoginForm
