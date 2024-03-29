'use client'

interface HeadingProps {
  title: string
  subtitle?: string
  center?: boolean
  nobold?: boolean
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center, nobold }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className={`text-2xl ${nobold ? 'font-normal' : 'font-bold'}`}>
        {title}
      </div>
      <div className="font-light text-neutral-500 mt-2">
        {subtitle}
      </div>      
    </div>
  );
}

export default Heading;