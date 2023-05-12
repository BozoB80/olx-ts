'use client'

interface ContainerProps {
  children: React.ReactNode
  bground?: boolean
  col?: boolean
}

const Container: React.FC<ContainerProps> = ({ children, bground, col }) => {
  return (
    <div className={`max-w-full py-10 flex ${col ? 'flex-col' : 'flex-row'} justify-center items-start gap-6 ${bground ? 'bg-[#f1f4f5]' : ''}`}>
      {children}
    </div>
  );
}

export default Container;