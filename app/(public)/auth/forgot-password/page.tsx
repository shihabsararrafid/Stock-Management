'use client'
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core'
//   import { IconArrowLeft } from '@tabler/icons-react';
import { useForm } from '@mantine/form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import Swal from 'sweetalert2'
import classes from './style.module.css'

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm({
    initialValues: { email: '' },
  })
  return (
    <div className="flex h-screen items-center justify-center">
      <Container size={460} my={30}>
        <Title className={classes.title} ta="center">
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>
        <form
          onSubmit={async (event) => {
            event.preventDefault()
            // if (form.errors) returns
            setLoading(true)
            try {
              const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify(form.values),
                headers: {
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
              })
              if (res.ok) {
                await Swal.fire('Success', 'Check Your Email Inbox', 'success')
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
            <TextInput
              {...form.getInputProps('email')}
              label="Your email"
              placeholder="me@domain.com"
              required
            />
            <Group justify="space-between" mt="lg" className={classes.controls}>
              <Anchor c="dimmed" size="sm" className={classes.control}>
                <Center inline>
                  <LuArrowLeft style={{ width: rem(12), height: rem(12) }} />
                  <Box component={Link} href={'/auth/login'} ml={5}>
                    Back to the login page
                  </Box>
                </Center>
              </Anchor>
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
