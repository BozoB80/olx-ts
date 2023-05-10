'use client'

interface ContainerProps {
  children: React.ReactNode
  bground?: boolean
}

const Container: React.FC<ContainerProps> = ({ children, bground }) => {
  return (
    <div className={`max-w-full mx-auto py-10 flex justify-center items-start gap-6 ${bground ? 'bg-[#f1f4f5]' : ''}`}>
      {children}
    </div>
  );
}

export default Container;