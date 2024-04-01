'use client'
import { Burger, Button, Container, Drawer, Group, Text, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { GoFileDirectory, GoPlus } from 'react-icons/go'
import { IoSearch } from 'react-icons/io5'
import { LuUsers } from 'react-icons/lu'
import { TbUserSquare } from 'react-icons/tb'
// import { MantineLogo } from '@mantinex/mantine-logo'
import { useState } from 'react'
import AddItemForm from './AddItemDrwaer'
import classes from './HeaderMenu.module.css'

const links = [
  { link: '/about', label: 'View/Restock', icon: <GoFileDirectory size={20} /> },
  { link: '/learn', label: 'Borrower', icon: <TbUserSquare size={20} /> },
  { link: '/pricing', label: 'Users', icon: <LuUsers size={20} /> },
]

export function Header() {
  const [opened, { toggle }] = useDisclosure(false)
  const [active, setActive] = useState(links[0].link)
  const [openedModal, { open, close }] = useDisclosure(false)

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault()
        setActive(link.link)
      }}
    >
      {link.icon} {link.label}
    </a>
  ))

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {' '}
        <Text fw={600} c="white" size="xl">
          {' '}
          StockMate
        </Text>
        <Group className="-ml-10" justify="space-between">
          <Group gap={10} visibleFrom="xs">
            {items}
          </Group>
          <Button bg="white" c="black">
            Log Out
          </Button>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Group>
      </Container>
      <Group mt={30} className="w-[80%]" justify="space-evenly">
        <Text c="white" size="xl" fw={600}>
          View/Restock
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
      <Drawer
        // styles={{ title: { textAlign: 'center' } }}
        position="right"
        opened={openedModal}
        onClose={close}
        // title="Authentication"
      >
        <h1 style={{ textAlign: 'center', fontWeight: 600 }} className="text-center font-semibold">
          Add Item
        </h1>
        <AddItemForm />
        {/* Drawer content */}
      </Drawer>
    </header>
  )
}
