import { Loader } from '@mantine/core'

const LoaderComponent = () => {
  return (
    <div className="flex h-[80vh] w-screen items-center justify-center" style={{ minHeight: 600 }}>
      <Loader color="orange" type="bars" />
    </div>
  )
}

export default LoaderComponent
