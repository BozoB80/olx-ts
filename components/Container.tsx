'use client'

interface ContainerProps {
  children: React.ReactNode
  bground?: boolean
}

const Container: React.FC<ContainerProps> = ({ children, bground }) => {
  return (
    <div className={`w-full mx-auto p-1 sm:p-4 ${bground ? 'bg-[#f1f4f5]' : 'bg-white'}`}>
      {children}
    </div>
  );
}

export default Container;