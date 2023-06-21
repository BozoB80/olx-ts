'use client'

import { twMerge } from "tailwind-merge"

interface ContainerProps {
  children: React.ReactNode
  bground?: boolean
  className?: string
}

const Container: React.FC<ContainerProps> = ({ children, bground, className }) => {
  return (
    <div className={twMerge(`w-full mx-auto p-1 sm:p-4 ${bground ? 'bg-[#f1f4f5]' : 'bg-white'}`, className)}>
      {children}
    </div>
  );
}

export default Container;