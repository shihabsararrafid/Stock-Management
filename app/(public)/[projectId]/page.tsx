'use client'
import ButtonComp from '@/component/button/ButtonComp'
import CardComp from '@/component/card/CardComp'
import { deviceListType } from '@/types/project'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const ProjectPage = ({ params }: { params: { projectId: string } }) => {
  const [data, setData] = useState<deviceListType[] | null>(null)

  const current = usePathname()
  const projectName = current.slice(1)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const url = ''
    setIsLoading(true)
    fetch(`/api/project/${params.projectId}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data: any) => {
        setData(data.data.device as deviceListType[])
      })
      .catch((error) => {
        Swal.fire('Error', error?.message, 'error')
      })
      .finally(() => setIsLoading(false))
  }, [params.projectId])
  // isLoading && return <LoaderComponent />
  return (
    <div>
      <section className="my-5">
        <div className="flex justify-between">
          <p className="font-bold lg:text-5xl">Devices of {projectName.toUpperCase()}</p>
          <div className="w-fit">
            <ButtonComp
              btnLink={`${current}/add-device`}
              btnLabel="Add Device"
              btnColor="black"
            ></ButtonComp>
          </div>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
          {/* change deviceList to data */}
          {data?.map((item) => (
            <CardComp key={item.id} title={item.id} modal={true} btnLabel="Configure" />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProjectPage
