'use client'

interface FormHeadingProps {
  label: string
}

const FormHeading: React.FC<FormHeadingProps> = ({ label }) => {
  return (
    <h1 className="text-xs uppercase w-full text-left pt-4 pb-1">{label}</h1>
  );
}

export default FormHeading;