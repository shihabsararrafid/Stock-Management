import IndividualDevicePageHeader from '../(components)/Header'
import LoadFIles from '../(components)/LoadFIles'

const IndividualDevicePage = ({ params }: { params: { deviceId: string } }) => {
  return (
    <>
      <IndividualDevicePageHeader params={params}>
        <LoadFIles deviceId={params.deviceId} />
      </IndividualDevicePageHeader>
    </>
  )
}

export default IndividualDevicePage
// async function getFiles() {
//   // Fetch data from external API
//   const res = await fetch('/api/device/X7XHKj', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//   const data = await res.json()
//   const fileList = (data as any)?.data?.files
//   console.log(data, fileList, 'here')
//   // Pass data to the page via props
//   return { props: { files: fileList } }
// }
