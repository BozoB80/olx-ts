'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface TextareaProps {
  id: string
  placeholder: string
  register: UseFormRegister<FieldValues>
  required?: boolean
  errors?: FieldErrors
}

const Textarea: React.FC<TextareaProps> = ({ id, placeholder, register, required, errors }) => {
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        placeholder={placeholder}
        {...register(id, { required })}
        required
        cols={20}
        rows={5}
        className="p-2 w-full border-none focus:outline-none rounded-md bg-[#f2f4f5] disabled:opacity-70 disabled:cursor-not-allowed"
      />
    </div>
  );
}

export default Textarea;