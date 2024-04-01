import { Input } from '@mantine/core'

const InputField = ({
  label,
  placeholder,
  variant,
}: {
  label: string
  placeholder: string
  variant?: string
}) => {
  return (
    <Input.Wrapper label={label}>
      <Input variant={variant ? variant : 'default'} placeholder={placeholder} />
    </Input.Wrapper>
  )
}

export default InputField
