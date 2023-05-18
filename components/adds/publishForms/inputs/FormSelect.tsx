'use client'

import { useEffect } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form"
import FormHeading from "./FormHeading";
import { Select } from '@chakra-ui/react'

interface SelectOption {
  value?: string | number;
  label?: string;
  id?: string;
  name?: string;
}

interface SelectProps {
  id: string
  placeholder: string
  label?: string
  options: SelectOption[]
  register: UseFormRegister<FieldValues>
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelect: React.FC<SelectProps> = ({ id, placeholder, label, options, register, required, onChange }) => {
  useEffect(() => {
    if (onChange) {
      register(id)
    }
  }, [id, register, onChange]);

  return (
    <div className='w-full relative'>
      <FormHeading label={label!} />
        <Select
          id={id}
          variant={"filled"}
          placeholder={placeholder}
          border={"1px"}
          {...register(id, { required })}
          className="w-full"
        >
          {options.map((option) => (
            <option key={option.value || option.id || option.name} value={option.value || option.id} className="hover:bg-black px-3">
              {option.label || option.name}
            </option>
          ))}
        </Select>
    </div>
  )
}

export default FormSelect;