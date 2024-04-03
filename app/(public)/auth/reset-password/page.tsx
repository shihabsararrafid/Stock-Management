'use client'
import { Button, Container, Group, Paper, PasswordInput, Text, Title } from '@mantine/core'
//   import { IconArrowLeft } from '@tabler/icons-react';
import { useForm } from '@mantine/form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Swal from 'sweetalert2'
import classes from './style.module.css'

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const form = useForm({
    initialValues: { password: '' },
    validateInputOnChange: true,
    validate: {
      password: (value) => (value?.length < 6 ? 'Password must be at least 6 character' : null),
    },
  })
  return (
    <div className="flex h-screen items-center justify-center">
      <Container size={460} my={30}>
        <Title className={classes.title} ta="center">
          Reset your password
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your new password
        </Text>
        <form
          onSubmit={async (event) => {
            event.preventDefault()
            // if (form.errors) returns
            setLoading(true)
            const token = searchParams.get('token')
            if (!token) {
              await Swal.fire('Error', 'Token is required', 'error')
              setLoading(false)
              return
            }
            try {
              const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify({ ...form.values, token }),
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
              })
              if (res.ok) {
                await Swal.fire('Success', 'Password Reset Successfully', 'success')
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
          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <PasswordInput
              name="password"
              my={10}
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps('password')}
            />
            <Group justify="space-between" mt="lg" className={classes.controls}>
              <Button loading={loading} type="submit" bg="#D85722" className={classes.control}>
                Reset password
              </Button>
            </Group>
          </Paper>
        </form>
      </Container>
    </div>
  )
}
