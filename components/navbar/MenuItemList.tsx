'use client'

import { useRouter } from "next/navigation"
import MenuItem from "./MenuItem"
import { CircleStackIcon, ArrowLeftOnRectangleIcon, BuildingStorefrontIcon, TrophyIcon, NewspaperIcon, ExclamationCircleIcon, EyeSlashIcon, MinusCircleIcon, ArrowPathIcon, TruckIcon, UserIcon, MagnifyingGlassIcon, LifebuoyIcon, MegaphoneIcon, KeyIcon, ArrowTrendingUpIcon, LockClosedIcon, Cog8ToothIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { auth } from "@/firebase/firebase"

interface MenuItemListProps {
  logoutUser: () => void
  setToggleMenu: (toggle: boolean) => void
}

const MenuItemList: React.FC<MenuItemListProps> = ({ logoutUser, setToggleMenu }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className=" text-xl font-bold">My OLX</h1>
        <button type="button" onClick={() => setToggleMenu(false)}><XMarkIcon className="w-8 h-8" /></button>
      </div>
      <MenuItem label="OLX CREDIT" onClick={() => {}} hover icon={<CircleStackIcon className="w-6 h-6"/>} />
      <MenuItem label="Register OLX shop" onClick={() => {}} hover icon={<BuildingStorefrontIcon className=" bg-red-600 rounded-md text-white p-1 w-6 h-6"/>} />
      <h1 className="bg-gray-100 p-3 my-1 text-xs">MY ADDS</h1>
      <MenuItem label="Active ads" hover onClick={() => {router.push(`/profile/${auth.currentUser ? auth.currentUser.uid : ''}`), setToggleMenu(false)}} icon={<MegaphoneIcon className="w-6 h-6" />} />
      <MenuItem label="Ended ads" onClick={() => {}} hover icon={<NewspaperIcon className="w-6 h-6" />} />
      <MenuItem label="Non-active ads" onClick={() => {}} hover icon={<ExclamationCircleIcon className="w-6 h-6" />} />
      <MenuItem label="Hidden ads" onClick={() => {}} hover icon={<EyeSlashIcon className="w-6 h-6" />} />
      <MenuItem label="Expired ads" onClick={() => {}} hover icon={<MinusCircleIcon className="w-6 h-6" />} />
      <MenuItem label="Renewable ads" onClick={() => {}} hover icon={<ArrowPathIcon className="w-6 h-6" />} />
      <MenuItem label="Promotions" onClick={() => {}} hover icon={<TrophyIcon className="w-6 h-6" />} />
      <MenuItem label="Orders" onClick={() => {}} hover icon={<TruckIcon className="w-6 h-6" />} />
      <h1 className="bg-gray-100 p-3 my-1 text-xs">SAVED</h1>
      <MenuItem label="Saved Ads" onClick={() => {router.push('/myolx/saved/adds?tab=adds'), setToggleMenu(false)}} hover icon={<NewspaperIcon className="w-6 h-6" />} />
      <MenuItem label="Saved Users" onClick={() => {router.push('/myolx/saved/users?tab=users'), setToggleMenu(false)}} hover icon={<UserIcon className="w-6 h-6" />} />
      <MenuItem label="Saved Searches" onClick={() => {router.push('/myolx/saved/searches?tab=searches'), setToggleMenu(false)}} hover icon={<MagnifyingGlassIcon className="w-6 h-6" />} />
      <h1 className="bg-gray-100 p-3 my-1 text-xs">OTHER LINKS</h1>
      <MenuItem label="OLX shops" onClick={() => {}} hover icon={<BuildingStorefrontIcon className=" bg-red-600 rounded-md text-white p-1 w-6 h-6"/>} />
      <MenuItem label="User Support" onClick={() => {}} hover icon={<LifebuoyIcon className="w-6 h-6" />} />
      <MenuItem label="Activate OLX Pro" onClick={() => {}} hover icon={<KeyIcon className="w-6 h-6" />} />
      <MenuItem label="Marketing" onClick={() => {}} hover icon={<ArrowTrendingUpIcon className="w-6 h-6" />} />
      <MenuItem label="Blocked Users" onClick={() => {}} hover icon={<LockClosedIcon className="w-6 h-6" />} />
      <MenuItem label="Settings" onClick={() => {}} hover icon={<Cog8ToothIcon className="w-6 h-6" />} />
      <MenuItem label="Logout" onClick={() => logoutUser()} hover icon={<ArrowLeftOnRectangleIcon className="w-6 h-6" />} />
    </>
  )
}

export default MenuItemList;