"use client";

interface ButtonProps {
  label: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  icon?: React.ReactNode
  dark?: boolean
  small?: boolean
  isDisabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ onClick, icon, label, dark, small, isDisabled }) => {
  return (
    <button
      onClick={onClick}
      className={`flex ${small ? 'w-36' : 'w-full'} ${isDisabled ? 'text-gray-200 cursor-not-allowed' : ''} justify-center items-center text-base font-semibold gap-2 border-2 border-black transition hover:shadow-button rounded-[4px] p-3 
      ${dark ? 'bg-black text-white' : ''}`}
    >
      {icon}
      <p>{label}</p>
    </button>
  );
};

export default Button;
