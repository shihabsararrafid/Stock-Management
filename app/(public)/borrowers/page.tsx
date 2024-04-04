'use client'
import { useBorrowLists } from '@/app/hooks/useBorrowLists'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import BorrowListRow from '@/component/borrow/borrowListRow'

const BorrowerPage = () => {
  const { borrowLists, isLoading } = useBorrowLists()

  if (isLoading) return <LoaderComponent />
  return (
    <div className="mx-auto w-[70%]">
      {borrowLists &&
        Object.keys(borrowLists).map((key) => (
          <BorrowListRow
            user={borrowLists[key][0].user}
            products={borrowLists[key].map((l) => l.product)}
            key={key}
          />
        ))}
    </div>
  )
}

export default BorrowerPage
