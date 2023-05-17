'use client'

import { Input } from "@chakra-ui/react";
import FormHeading from "./FormHeading";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface FormInputProps {
  id: string
  label: string
  placeholder?: string,
  type?: string
  register: UseFormRegister<FieldValues>
  required?: boolean
  errors: FieldErrors
}

const FormInput: React.FC<FormInputProps> = ({ id, label, placeholder, type = 'text', register, required, errors }) => {

  return (
    <div className="w-full">
      <FormHeading label={label} />
      <Input 
        id={id}
        {...register(id, { required })}
        type={type}
        placeholder={placeholder}
        variant="filled"
        border={"1px"}
        className={`
        w-full
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
    </div>
  );
}

export default FormInput;