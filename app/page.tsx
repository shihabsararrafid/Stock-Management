'use client'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import ProductCard from '@/component/product/productCard'
import { useProducts } from './hooks/useProductHook'

const Homepage = () => {
  const { products, isError, mutate, isLoading } = useProducts()
  // console.log(data)
  const url = ''

  if (isLoading) {
    return <LoaderComponent />
  }
  return (
    <div>
      <section className="my-4 flex w-full justify-center ">
        <div className="grid w-full grid-cols-1 gap-8 px-5 sm:grid-cols-2  lg:w-[80%] lg:grid-cols-3 lg:gap-12 xl:grid-cols-4">
          {/* change projectData to data*/}
          {products?.map((d) => <ProductCard product={d} key={d.id} />)}
          {/* {data?.map((item) => (
            <CardComp
              key={item.id}
              title={item.name}
              desc={item.description}
              btnLabel="Details"
              link={`/${encodeURIComponent(item.id)}`}
            />
          ))} */}
        </div>
      </section>
    </div>
  )
}

export default Homepage
