import { IProduct } from '@/app/hooks/useProductHook'
import { ActionIcon, Card, Group, Image, Menu, Text, rem } from '@mantine/core'
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Card bg="#EAEAEA" withBorder shadow="sm" radius="md">
      <Card.Section bg="white" style={{ position: 'relative', padding: 5, height: '100%' }} mt="sm">
        <Group style={{ position: 'absolute', right: 0 }} justify="end">
          <Menu trigger="hover" withinPortal position="bottom-end" shadow="md">
            <Menu.Target>
              <ActionIcon color="#A5A6A5">
                <IconDots style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}>
                Edit
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                color="red"
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Image
          style={{ width: '100%', height: '100%' }}
          src={product?.photoUrl}
          alt={`${product.name} Image`}
        />
      </Card.Section>
      <Text span fw={700} inherit c="black">
        {product.name}
      </Text>{' '}
      <Text>{product.stock}</Text>
    </Card>
  )
}
