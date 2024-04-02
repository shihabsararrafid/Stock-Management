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
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Swal from 'sweetalert2'
import classes from './LoginFrom.module.css'

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: { username: '', password: '' },

    // functions will be used to validate values at corresponding key
  })
  const router = useRouter()
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor c="#D85722" href="/auth/register" size="sm" component={Link}>
          Create account
        </Anchor>
      </Text>
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          setLoading(true)
          try {
            const res = await fetch('/api/auth/login', {
              method: 'POST',
              body: JSON.stringify(form.values),
              headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
            if (res.ok) {
              await Swal.fire('Success', 'User Login', 'success')
              router.push('/')
            } else {
              const data = await res.json()
              // console.log(data, 'data')
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
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Username"
            placeholder="you@example.com"
            required
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor c="#D85722" component={Link} href="/auth/forgot-password" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" loading={loading} bg="#D85722" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
