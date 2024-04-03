'use client'
import LoaderComponent from '@/component/Loader/LoaderComponent'
import CardComp from '@/component/card/CardComp'
import { projectType } from '@/types/project'
import { useState } from 'react'

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
