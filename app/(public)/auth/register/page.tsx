'use client'
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Link from 'next/link'

const RegisterPage = () => {
  const form = useForm({
    initialValues: { username: '', email: '', confirmPassword: '', password: '' },

    // functions will be used to validate values at corresponding key
    validateInputOnChange: true,
    validate: {
      username: (value) =>
        value.trim().length < 5 ? 'User Name Must be at least 5 character' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value?.length < 6 ? 'Password must be at least 6 character' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  })
  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={form.onSubmit(console.log)}>
        <Container size={720} my={40}>
          <Title ta="center">Create Your Account</Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Already have an account ?{' '}
            <Anchor c="#D85722" href="/auth/login" size="sm" component={Link}>
              Log In
            </Anchor>
          </Text>

          <Paper w="400px" withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              name="email"
              my={10}
              label="Email"
              placeholder="you@example.com"
              required
              {...form.getInputProps('email')}
            />
            <TextInput
              name="username"
              my={10}
              label="Username"
              placeholder="Type Your Username"
              required
              {...form.getInputProps('username')}
            />
            <PasswordInput
              name="password"
              my={10}
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              my={10}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Your password"
              required
              mt="md"
              {...form.getInputProps('confirmPassword')}
            />
            <Group justify="space-between" mt="lg">
              <Checkbox label="Accept Terms and Condition" />
            </Group>
            <Button type="submit" bg="#D85722" fullWidth mt="xl">
              Register
            </Button>
          </Paper>
        </Container>
      </form>
    </div>
  )
}

export default RegisterPage
