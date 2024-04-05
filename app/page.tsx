'use client'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import ProductCard from '@/component/product/productCard'
import { FuseSearch } from '@/lib/fuseSearch'
import { useEffect, useState } from 'react'
import { IProduct, useProducts } from './hooks/useProductHook'
const Homepage = () => {
  const { products, isLoading } = useProducts()
  const [searchItems, setSearhItems] = useState(products)
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
    keys: ['name'],
  }
  useEffect(() => {
    const search = sessionStorage.getItem('search')
    if (products) setSearhItems(products)
    if (window && products)
      window.addEventListener('storage', () => {
        const search = sessionStorage.getItem('search')
        // console.log('Change to local storage!', search)
        if (search?.trim() === '') setSearhItems(products)
        if (search) {
          const res = FuseSearch(products, fuseOptions, search)
          setSearhItems(res.map((r) => r.item) as unknown as IProduct[])
        }
        // ...
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])
  if (isLoading) {
    return <LoaderComponent />
  }

  return (
    <div>
      <section className="my-4 flex w-full justify-center ">
        <div className="grid w-full grid-cols-1 gap-8 px-5 sm:grid-cols-2  lg:w-[80%] lg:grid-cols-3 lg:gap-12 xl:grid-cols-4">
          {searchItems?.map((d) => <ProductCard product={d} key={d.id} />)}
        </div>
      </section>
    </div>
  )
}

export default Homepage
