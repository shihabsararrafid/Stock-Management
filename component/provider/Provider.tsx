'use client'

import { MantineProvider } from '@mantine/core'

import { ModalsProvider } from '@mantine/modals'

import '@mantine/core/styles.css'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="light">
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  )
}
