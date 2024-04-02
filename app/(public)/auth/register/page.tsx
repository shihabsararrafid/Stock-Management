'use client'
import { checkUniqueness } from '@/lib/checkuniqueness'
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
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const RegisterPage = () => {
  const [loading, setLoading] = useState(false)
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
  useEffect(() => {
    const load = async () => {
      const res = await checkUniqueness({ username: form.values.username })
      if (res) form.setFieldError('username', res)
      else form.setFieldError('username', null)
    }
    if (form.values.username.length > 5) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.username])
  useEffect(() => {
    const load = async () => {
      const res = await checkUniqueness({ email: form.values.email })
      if (res) form.setFieldError('email', res)
      else form.setFieldError('email', null)
    }
    if (!form.errors.email) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.email])
  const router = useRouter()
  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={async (event) => {
          const { confirmPassword, ...others } = form.values
          event.preventDefault()
          // if (form.errors) returns
          setLoading(true)
          try {
            const res = await fetch('/api/auth/register', {
              method: 'POST',
              body: JSON.stringify(others),
              headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
            if (res.ok) {
              await Swal.fire('Success', 'User Created Successfully', 'success')
              router.push('/auth/login')
            } else {
              const data = await res.json()
              console.log(data, 'data')
              throw new Error(data instanceof Error ? data.message : 'Invalid Server Response')
            }
          } catch (error) {
            console.log(error)
            Swal.fire('Error', 'Invalid Server Response')
          } finally {
            setLoading(false)
          }
        }}
      >
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
              // onChange={(event)=>{

              // }}
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
            <Button
              loading={loading}
              disabled={Object.keys(form.errors).length !== 0}
              type="submit"
              bg="#D85722"
              fullWidth
              mt="xl"
            >
              Register
            </Button>
          </Paper>
        </Container>
      </form>
    </div>
  )
}

export default RegisterPage
