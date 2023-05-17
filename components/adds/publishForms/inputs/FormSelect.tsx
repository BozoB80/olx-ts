'use client'

import { useEffect } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import FormHeading from "./FormHeading";

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
       <select
        id={id}
        {...register(id, { required })}
        className="w-full py-2 bg-[#f2f4f5] px-2 font-light border-2 border-neutral-300 focus:border-black rounded-md transition outline-none disabled:opacity-70 disabled:cursor-not-allowed"
       >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value || option.id || option.name} value={option.value || option.id} className="hover:bg-black px-3">
            {option.label || option.name}
          </option>
        ))}
       </select>
    </div>
  )
}

export default FormSelect;