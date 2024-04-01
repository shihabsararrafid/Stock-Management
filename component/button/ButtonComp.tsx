'use client'
import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import UploadForm from '../uploadForm/UploadForm'

const ButtonComp = ({
  btnLabel,
  id,
  btnColor,
  btnLink,
  modal = false,
  modalLabel,
}: {
  btnLabel: string
  btnColor?: string
  btnLink?: string
  modal?: boolean
  modalLabel?: string
  id?: string
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    // <Button color={btnColor} fullWidth mt="md" radius="md">
    //   <Link href={`${btnLink}`}>{btnLabel}</Link>
    // </Button>
    <>
      {/* Only for button with link */}
      {/* {(btnLink && !modal) ? (
        <Link href={`${btnLink}`}>
          <Button color={btnColor} fullWidth mt="md" radius="md">
            {btnLabel}
          </Button>
        </Link>
      ) : (
        <Button color={btnColor} fullWidth mt="md" radius="md">
          {btnLabel}
        </Button>
      )} */}

      {/* {
        btnLink ? (<Link href={`${btnLink}`}><Button color={btnColor} className={modal ? 'hidden' : 'block'} fullWidth mt="md" radius="md">{btnLabel}</Button></Link>)
        : <Button>{btnLabel}</Button>
      } */}

      {/* Button for modal */}
      {modal ? (
        <Button onClick={open}>{btnLabel}</Button>
      ) : btnLink ? (
        <Link href={`${btnLink}`}>
          <Button
            color={btnColor}
            className={modal ? 'hidden' : 'block'}
            fullWidth
            mt="md"
            radius="md"
          >
            {btnLabel}
          </Button>
        </Link>
      ) : (
        <Button>{btnLabel}</Button>
      )}
      <Modal opened={opened} onClose={close} centered>
        <UploadForm id={id} open={open} close={close} />
      </Modal>
    </>
  )
}
export default ButtonComp
