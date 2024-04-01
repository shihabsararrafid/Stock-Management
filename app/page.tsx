'use client'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import CardComp from '@/component/card/CardComp'
import { projectType } from '@/types/project'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const projectData = [
  {
    id: 1,
    title: 'Gizantech',
    desc: 'Website firmware',
  },
  {
    id: 2,
    title: 'Jason',
    desc: 'Jason website firmware',
  },
  {
    id: 3,
    title: 'Smith',
    desc: 'Smith device Firmware',
  },
]

const Homepage = () => {
  const [data, setData] = useState<projectType[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const url = ''

  useEffect(() => {
    setIsLoading(true)
    fetch('/api/project', { credentials: 'include' })
      .then((res) => res.json())
      .then((data: any) => {
        setData(data.data as projectType[])
      })
      .catch((error) => Swal.fire('Error', 'Invalid Server Response', 'error'))
      .finally(() => setIsLoading(false))
  }, [])
  if (isLoading) {
    return <LoaderComponent />
  }
  return (
    <div>
      <section className="my-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
          {/* change projectData to data*/}
          {data?.map((item) => (
            <CardComp
              key={item.id}
              title={item.name}
              desc={item.description}
              btnLabel="Details"
              link={`/${encodeURIComponent(item.id)}`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Homepage
