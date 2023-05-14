'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string
  placeholder: string
  options: SelectOption[]
  register: UseFormRegister<FieldValues>
  required?: boolean
  errors: FieldErrors
}


const Select: React.FC<SelectProps> = ({ id, placeholder, options, register, required, errors }) => {
  return (
    <div className='w-full relative'>
       <select
        id={id}
        {...register(id, { required })}
        className='w-full py-5 px-2 font-light border-2 border-neutral-300 focus:border-black rounded-md transition outline-none disabled:opacity-70 disabled:cursor-not-allowed'
       >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="hover:bg-black">
            {option.label}
          </option>
        ))}
       </select>
    </div>
  );
}



export default Select;