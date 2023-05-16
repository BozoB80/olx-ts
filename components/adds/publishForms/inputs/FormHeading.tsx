'use client'

interface FormHeadingProps {
  label: string
}

const FormHeading: React.FC<FormHeadingProps> = ({ label }) => {
  return (
    <h1 className="text-xs uppercase w-full text-left py-2">{label}</h1>
  );
}

export default FormHeading;