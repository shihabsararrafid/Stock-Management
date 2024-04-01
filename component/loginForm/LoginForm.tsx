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
import Link from 'next/link'
import classes from './LoginFrom.module.css'

export function LoginForm() {
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

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@example.com" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor c="#D85722" component={Link} href="/auth/forgot-password" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button bg="#D85722" fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  )
}
