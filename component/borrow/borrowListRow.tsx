import { IProduct } from '@/app/hooks/useProductHook'
import { IUser } from '@/app/hooks/useUserHook'
import { Avatar, Divider, Group, Indicator, Stack, Text } from '@mantine/core'
import Link from 'next/link'

const BorrowListRow = ({ user, products }: { user: IUser; products: IProduct[] }) => {
  return (
    <div className="cursor-pointer hover:bg-gray-200">
      <Group my={10} justify="space-between">
        <Group>
          <Indicator label={`${user.role}`} size={16} color="orange">
            <Avatar size="xl" variant="filled" radius="md" src={user.image ?? ''} />
          </Indicator>
          <Link href={`/borrowers/${user.id}?name=${user.username}`}>
            <Stack>
              <Text fw={600}>{user.username}</Text>
              <div>
                {products
                  .filter(
                    (product, index, self) => self.findIndex((v) => v.id === product.id) === index,
                  )
                  .map((product, index) => (
                    <Text component="span" key={product.id}>
                      {product.name} {index !== products.length - 1 && ','}
                    </Text>
                  ))}
              </div>
            </Stack>
          </Link>
        </Group>
      </Group>
      <Divider size="sm" c="black" />
    </div>
    // </Link>
  )
}

export default BorrowListRow
