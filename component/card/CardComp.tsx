import {
  ActionIcon,
  Button,
  Card,
  CopyButton,
  Group,
  Space,
  Text,
  Title,
  Tooltip,
  rem,
} from '@mantine/core'
import Link from 'next/link'
import { FaRegCopy } from 'react-icons/fa'
import ButtonComp from '../button/ButtonComp'
function CardComp({
  title,
  link,
  desc,
  btnLabel,
  modal = false,
  modalLabel,
}: {
  title: string
  src?: string
  link?: string
  desc?: string
  btnLabel: string
  modal?: boolean
  modalLabel?: string
}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <Title>{title}</Title>
        {modal && (
          <CopyButton
            value={`https://firmware.gizantech.com/api/device/${title}/file-upload`}
            timeout={2000}
          >
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? 'Copied' : 'Copy Device POST/GET Url'}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? 'teal' : 'blue'} variant="filled" onClick={copy}>
                  {copied ? (
                    <FaRegCopy style={{ width: rem(16) }} />
                  ) : (
                    <FaRegCopy style={{ width: rem(16) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
          // </Tooltip>
        )}
      </Group>
      <Text size="sm">{desc}</Text>
      <Space h={50} />
      <Group justify="space-between" align="center">
        <ButtonComp
          id={title}
          modal={modal}
          modalLabel={modalLabel}
          btnLabel={btnLabel}
          btnLink={link}
        />
        {modal && (
          <Button component={Link} href={`/device/${title}`} variant="default">
            See File Lists
          </Button>
        )}
      </Group>
    </Card>
  )
}

export default CardComp
