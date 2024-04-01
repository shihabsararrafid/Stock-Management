import { Loader } from '@mantine/core'

const LoaderComponent = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center h-screen w-screen"
      style={{ minHeight: 600 }}
    >
      <Loader color="teal" variant="dots" />
    </div>
  )
}

export default LoaderComponent
