'use client'

import { useEffect } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface SelectOption {
  value?: string | number;
  label?: string;
  id?: string;
  name?: string;
}

interface SelectProps {
  id: string
  placeholder: string
  options: SelectOption[]
  register: UseFormRegister<FieldValues>
  required?: boolean
  errors?: FieldErrors
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  form?: boolean
}


const Select: React.FC<SelectProps> = ({ id, placeholder, options, register, required, errors, onChange, form }) => {

  useEffect(() => {
    if (onChange) {
      register(id)
    }
  }, [id, register, onChange]);

  return (
    <div className='w-full relative'>
       <select
        id={id}
        {...register(id, { required })}
        className={`w-full ${form ? 'py-2 bg-[#f2f4f5]' : 'py-5'} px-2 font-light border-2 border-neutral-300 focus:border-black rounded-md transition outline-none disabled:opacity-70 disabled:cursor-not-allowed`}
       >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value || option.id || option.name} value={option.value || option.id} className="hover:bg-black">
            {option.label || option.name}
          </option>
        ))}
       </select>
    </div>
  );
}



export default Select;