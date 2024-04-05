'use client'
import { IBorrow, useBorrowLists } from '@/app/hooks/useBorrowLists'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import BorrowListRow from '@/component/borrow/borrowListRow'
import { FuseSearch } from '@/lib/fuseSearch'
import { useEffect, useState } from 'react'

const BorrowerPage = () => {
  const { borrowLists, isLoading } = useBorrowLists()
  const [searchItems, setSearhItems] = useState(borrowLists)
  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ['user.username'],
  }
  useEffect(() => {
    const search = sessionStorage.getItem('search')
    if (borrowLists) setSearhItems(borrowLists)
    if (window && borrowLists)
      window.addEventListener('storage', () => {
        const search = sessionStorage.getItem('search')
        const array = Object.values(borrowLists).flat()
        // console.log(array, 'inital value')
        // console.log('Change to local storage!', search)
        if (search?.trim() === '') setSearhItems(borrowLists)
        if (search) {
          const res = FuseSearch(array, fuseOptions, search).map(
            (r) => r.item,
          ) as unknown as IBorrow[]
          // console.log(res, 'this is result')
          const searchBorrowList: { [key: string]: any[] } = {} // Define the type of searchBorrowList
          const groupedByUserId = res.reduce((acc, borrowList) => {
            const userId = borrowList.user.username
            if (!acc[userId]) {
              acc[userId] = []
            }
            acc[userId].push(borrowList)
            return acc
          }, searchBorrowList)
          setSearhItems(searchBorrowList)
          // console.log(res)
        }
        // ...
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [borrowLists])
  if (isLoading) return <LoaderComponent />
  return (
    <div className="mx-auto w-[70%]">
      {searchItems &&
        Object.keys(searchItems).map((key) => (
          <BorrowListRow
            user={searchItems[key][0]?.user}
            products={searchItems[key].map((l) => l.product)}
            key={key}
          />
        ))}
    </div>
  )
}

export default BorrowerPage
