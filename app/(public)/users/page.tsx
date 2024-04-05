'use client'
import { IUser, useUsers } from '@/app/hooks/useUserHook'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import UserRow from '@/component/user/userRow'
import { FuseSearch } from '@/lib/fuseSearch'
import { Text } from '@mantine/core'
import { useEffect, useState } from 'react'

const AllUserPage = () => {
  const { users, isLoading } = useUsers()
  const [searchItems, setSearhItems] = useState(users)
  const fuseOptions = {
    keys: ['username'],
  }
  // console.log(users)
  useEffect(() => {
    const search = sessionStorage.getItem('search')
    if (users) setSearhItems(users)
    if (window && users)
      window.addEventListener('storage', () => {
        const search = sessionStorage.getItem('search')

        // console.log(array, 'inital value')
        // console.log('Change to local storage!', search)
        if (search?.trim() === '') setSearhItems(users)
        if (search) {
          const res = FuseSearch(users, fuseOptions, search).map(
            (r) => r.item,
          ) as unknown as IUser[]
          // console.log(res, 'this is result')

          setSearhItems(res)
          // console.log(res)
        }
        // ...
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users])
  if (isLoading) return <LoaderComponent />
  return (
    <div className="mx-auto w-[70%]">
      {searchItems?.map((user) => <UserRow user={user} key={user.id} />)}
      {searchItems?.length === 0 && (
        <Text ta="center" size="lg">
          No User is Found
        </Text>
      )}
    </div>
  )
}

export default AllUserPage
