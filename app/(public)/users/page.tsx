'use client'
import { useUsers } from '@/app/hooks/useUserHook'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import UserRow from '@/component/user/userRow'

const AllUserPage = () => {
  const { users, isLoading } = useUsers()
  console.log(users)
  if (isLoading) return <LoaderComponent />
  return (
    <div className="mx-auto w-[70%]">
      {users?.map((user) => <UserRow user={user} key={user.id} />)}
    </div>
  )
}

export default AllUserPage
