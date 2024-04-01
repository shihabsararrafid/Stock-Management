'use client'
import logo from '@/public/logo/gt-logo.svg'
import { Burger, Container } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Image from 'next/image'
import Link from 'next/link'
import classes from './HeaderMenu.module.css'

const links = [
  { link: '/about', label: 'About' },
  {
    link: '#1',
    label: 'Learn',
  },
  { link: '/about', label: 'About' },
  {
    link: '#2',
    label: 'Support',
  },
]

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false)

  // const items = links.map((link) => {
  //   const menuItems = link.links?.map((item) => <Menu.Item key={item.link}>{item.label}</Menu.Item>)

  //   if (menuItems) {
  //     return (
  //       <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
  //         <Menu.Target>
  //           <a
  //             href={link.link}
  //             className={classes.link}
  //             onClick={(event) => event.preventDefault()}
  //           >
  //             <Center>
  //               <span className={classes.linkLabel}>{link.label}</span>
  //               <MdOutlineKeyboardArrowDown />
  //             </Center>
  //           </a>
  //         </Menu.Target>
  //         <Menu.Dropdown>{menuItems}</Menu.Dropdown>
  //       </Menu>
  //     )
  //   }

  //   return (
  //     <a
  //       key={link.label}
  //       href={link.link}
  //       className={classes.link}
  //       onClick={(event) => event.preventDefault()}
  //     >
  //       {link.label}
  //     </a>
  //   )
  // })

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          {/* <MantineLogo size={28} /> */}
          <p className="text-xl font-bold">
            <Link href="/">
              <Image alt="GT-Logo" src={logo} width={150} height={200} />
            </Link>
          </p>
          {/* <Group gap={5} visibleFrom="sm">
            {items}
          </Group> */}
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  )
}

export default HeaderMenu
