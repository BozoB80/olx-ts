"use client";

import { twMerge } from "tailwind-merge";

interface ButtonProps {
  label: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  icon?: React.ReactNode
  dark?: boolean
  isDisabled?: boolean
  className?: string
  type?: "button" | "submit" | "reset"
}

const Button: React.FC<ButtonProps> = ({ onClick, icon, label, dark, isDisabled, className, type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={twMerge(`flex w-full justify-center items-center text-base font-semibold gap-2 border-2 border-black transition hover:shadow-button rounded-[4px] p-3 ${dark ? 'bg-black text-white' : ''} ${isDisabled ? 'text-gray-200 cursor-not-allowed' : ''}`, className)}
    >
      {icon}
      <p>{label}</p>
    </button>
  );
};

export default Button;
