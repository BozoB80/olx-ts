'use client'

interface MenuItemProps {
  label: String
  onClick: () => void
  icon?: React.ReactElement
  hover?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick, icon, hover }) => {
  return (
    <div onClick={onClick} className={`flex gap-4 p-1 font-normal ${hover ? 'hover:bg-black hover:text-white' : ''} cursor-pointer`}>
      {icon}
      {label}
    </div>
  );
}



export default MenuItem;