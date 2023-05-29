'use client'

import { Textarea } from '@chakra-ui/react'
import FormHeading from "./FormHeading";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface FormTextareaProps {
  id: string
  label: string
  placeholder?: string
  register: UseFormRegister<FieldValues>
  required?: boolean
  errors: FieldErrors
}

const FormTextarea: React.FC<FormTextareaProps> = ({ id, label, placeholder, register, required, errors }) => {
  return (
    <div className="w-full">
      <FormHeading label={label} />
      <Textarea 
        id={id}
        placeholder={placeholder}
        fontSize={{ base: 'sm', md: 'initial' }}
        {...register(id, { required })}
        variant='filled'
        focusBorderColor='black'
        rows={7}
      />
    </div>
  );
}

export default FormTextarea;