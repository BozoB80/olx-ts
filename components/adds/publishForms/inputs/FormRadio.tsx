'use client'

import { Box, Flex, UseRadioProps, useRadio, useRadioGroup } from "@chakra-ui/react"
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import FormHeading from "./FormHeading";

interface RadioCardProps extends UseRadioProps {
  children: React.ReactNode;
}

function RadioCard(props: RadioCardProps) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as="label" flex={1/2}>
      <input {...input} />
      <Flex
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="sm"
        _checked={{
          bg: "gray.100",
          color: "black",
          borderColor: "black",
        }}
        px={{ base: '2', md: '5'}}
        py={2}
        width="100%"
        fontSize={{ base: 'sm', md: 'initial'}}
      >
        <Box width="100%" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          {props.children}
        </Box>
      </Flex>
    </Box>
  )
}


interface FormRadioProps {
  label: string
  options: string[]
  id: string
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  required?: boolean
  fullWidth?: boolean
}

const FormRadio: React.FC<FormRadioProps> = ({ label, options, id, register, setValue, required, fullWidth }) => {

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: label,
    defaultValue: options[0],
    onChange: (value) => {setValue(id, value)}
  })

  const group = getRootProps()

  return (
    <Flex direction="column" id={id} {...group} {...register(id, { required })} flex={fullWidth ? "1" : undefined}>
      <FormHeading label={label} />
      <Flex gap={3} flexWrap="wrap">
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio} >
              {value}
            </RadioCard>
          );
        })}
      </Flex>
    </Flex>
  )
}

export default FormRadio;