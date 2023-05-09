'use client'

interface ContainerProps {
  children: React.ReactNode
  bground?: boolean
}

const Container: React.FC<ContainerProps> = ({ children, bground }) => {
  return (
    <div className={`max-w-full mx-auto p-1 sm:p-5 ${bground ? 'bg-[#f1f4f5]' : ''}`}>
      {children}
    </div>
  );
}

export default Container;