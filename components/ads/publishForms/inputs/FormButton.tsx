"use client";

import { twMerge } from "tailwind-merge";

interface FormButtonProps {
  label: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  icon?: React.ReactNode
  dark?: boolean
  small?: boolean
  isDisabled?: boolean
  className?: string
  type?: "button" | "submit" | "reset"
}

const FormButton: React.FC<FormButtonProps> = ({ onClick, icon, label, dark, small, isDisabled, className, type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={twMerge(`flex ${small ? 'w-36' : 'w-full'} ${isDisabled ? 'bg-slate-100 border-none' : ''} justify-center items-center text-sm sm:text-base font-semibold gap-2 border-2 border-black transition hover:shadow-button rounded-[4px] p-1.5 
      ${dark ? 'bg-black text-white' : ''}`, className)}
    >
      {icon}
      <p>{label}</p>
    </button>
  );
}

export default FormButton;