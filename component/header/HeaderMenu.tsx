'use client'
import { Burger, Button, Container, Drawer, Group, Text, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { GoFileDirectory, GoPlus } from 'react-icons/go'
import { IoSearch } from 'react-icons/io5'
import { LuUsers } from 'react-icons/lu'
import { TbUserSquare } from 'react-icons/tb'
// import { MantineLogo } from '@mantinex/mantine-logo'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import Swal from 'sweetalert2'
import AddBorrower from '../borrow/AddBorrower'
import AddItemForm from './AddItemDrwaer'
import classes from './HeaderMenu.module.css'

const links = [
  { link: '/', label: 'View/Restock', icon: <GoFileDirectory size={20} /> },
  { link: '/borrowers', label: 'Borrower', icon: <TbUserSquare size={20} /> },
  { link: '/users', label: 'Users', icon: <LuUsers size={20} /> },
]

export function Header() {
  const [opened, { toggle }] = useDisclosure(false)
  const [active, setActive] = useState(links[0].link)
  const [openedModal, { open, close }] = useDisclosure(false)
  const [isLoading, setLoading] = useState(false)
  const route = useRouter()
  const pathName = usePathname()
  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={pathName === link.link || undefined}
      onClick={(event) => {
        // event.preventDefault()
        setActive(link.link)
      }}
    >
      {link.icon} {link.label}
    </Link>
  ))
  const handleLogout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        // body: JSON.stringify(form.values),
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      if (res.ok) {
        await Swal.fire('Success', 'Log Out Successfully', 'success')
        route.push('/auth/login')
      } else throw new Error('Invalid Server Response')
    } catch (error) {
      await Swal.fire(
        'Error',
        error instanceof Error ? error.message : 'Invalid Server Response',
        'error',
      )
      setLoading(false)
    }
  }

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {' '}
        <Text component={Link} href={`/`} fw={600} c="white" size="xl">
          {' '}
          StockMate
        </Text>
        <Group className="-ml-10" justify="space-between">
          <Group gap={10} visibleFrom="xs">
            {items}
          </Group>
          <Button loading={isLoading} onClick={handleLogout} bg="white" c="black">
            Log Out
          </Button>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Group>
      </Container>
      {links.find((link) => link.link === pathName) && (
        <Group mt={30} className="w-[80%]" justify="space-evenly">
          <Text c="white" size="xl" fw={600}>
            {links.find((link) => link.link === pathName)?.label}
          </Text>
          <Group>
            <TextInput
              styles={{ root: { color: 'white' } }}
              classNames={classes}
              variant="filled"
              leftSectionPointerEvents="none"
              leftSection={<IoSearch color="white" />}
              placeholder="Search"
            />
            <Button
              onClick={open}
              radius="md"
              leftSection={<GoPlus size={20} />}
              bg="white"
              c="#CF5C2D"
            >
              Add
            </Button>
          </Group>
        </Group>
      )}
      <Drawer
        // styles={{ title: { textAlign: 'center' } }}
        position="right"
        opened={openedModal}
        onClose={close}
        // title="Authentication"
      >
        <h1 style={{ textAlign: 'center', fontWeight: 600 }} className="text-center font-semibold">
          {pathName.startsWith('/borrowers') ? 'Add Borrower' : 'Add Item'}
        </h1>
        {pathName.startsWith('/borrowers') ? (
          <AddBorrower close={close} />
        ) : (
          <AddItemForm close={close} />
        )}
        {/* Drawer content */}
      </Drawer>
    </header>
  )
}
