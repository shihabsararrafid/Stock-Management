'use client'
import { Group, Stack } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { GoFileDirectory } from 'react-icons/go'
import { LuUsers } from 'react-icons/lu'
import { TbUserSquare } from 'react-icons/tb'
import classes from './HeaderMenu.module.css'
const BottomNavigation = () => {
  const links = [
    { link: '/', label: 'View/Restock', icon: <GoFileDirectory size={20} /> },
    { link: '/borrowers', label: 'Borrower', icon: <TbUserSquare size={20} /> },
    { link: '/users', label: 'Users', icon: <LuUsers size={20} /> },
  ]
  const linkUser = [
    { link: '/', label: 'Item', icon: <GoFileDirectory size={20} /> },
    { link: '/profile', label: 'User', icon: <LuUsers size={20} /> },
  ]
  const [active, setActive] = useState(links[0].link)
  const [role, setRole] = useState<string | null>(null)
  const pathName = usePathname()

  useEffect(() => {
    const role = window && sessionStorage.getItem('role')
    console.log(role)

    setRole(role ? role : 'user')
  }, [])
  const items = (role && role === 'admin' ? links : linkUser).map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.linkSmall}
      data-active={pathName === link.link || undefined}
      onClick={(event) => {
        // event.preventDefault()
        setActive(link.link)
      }}
    >
      <Stack align="center">
        {link.icon} {link.label}
      </Stack>
    </Link>
  ))
  return (
    <Group
      style={{ position: 'fixed', bottom: 0, background: 'white', width: '100%' }}
      h={100}
      hiddenFrom="xs"
    >
      <div className="fixed bottom-0 left-0 z-50 flex h-24 w-full justify-center border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
        {items}
      </div>
    </Group>
  )
}

export default BottomNavigation
