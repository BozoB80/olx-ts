'use client'

import { useRouter } from "next/navigation"
import MenuItem from "./MenuItem"
import { CircleStackIcon, ArrowLeftOnRectangleIcon, BuildingStorefrontIcon, TrophyIcon, NewspaperIcon, ExclamationCircleIcon, EyeSlashIcon, MinusCircleIcon, ArrowPathIcon, TruckIcon, UserIcon, MagnifyingGlassIcon, LifebuoyIcon, MegaphoneIcon, KeyIcon, ArrowTrendingUpIcon, LockClosedIcon, Cog8ToothIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { auth, db } from "@/firebase/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { DocumentData, collection, doc, getDocs, query, where } from 'firebase/firestore';
import Image from "next/image"
import blob from '@/assets/blob.png'
import medal1 from "@/assets/medal1.png";
import medal2 from "@/assets/medal2.png";
import { useEffect, useState } from "react"
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react"

interface MenuItemListProps {
  logoutUser: () => void
  setToggleMenu: (toggle: boolean) => void
}

const MenuItemList: React.FC<MenuItemListProps> = ({ logoutUser, setToggleMenu }) => {
  const router = useRouter()

  const [user] = useAuthState(auth);
  const [userData] = useDocumentData(doc(db, 'users', user?.uid!));
  const [listings, setListings] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const q = query(collection(db, 'products'), where('userRef', '==', user?.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setListings(data);
    };

    if (user?.uid) {
      fetchListings();
    }
  }, [user?.uid]);  

  const carsListings = listings.filter(listings => listings.category === 'Cars')
  const estateListings = listings.filter(listings => listings.category === 'Real Estate')

  return (
    <>
      <div className="flex justify-between items-center border-b pb-3 sm:mb-8">
        <h1 className="hidden sm:block text-xl font-bold">My OLX</h1>
        <div className="sm:hidden flex flex-col w-full">
          <div className="flex gap-3">
            <Image
              src={blob}
              alt="avatarphoto"
              width={56}
              height={56}
              className="rounded-full"
            />
            <div className="flex flex-col justify-center text-sm gap-2">
              <p className="font-bold">{userData?.displayName}</p>
              <div className="flex gap-2">
                <Image src={medal1} alt="medal1" width={25} height={25} />
                <Image src={medal2} alt="medal2" width={25} height={25} />
              </div>
            </div>
          </div>
        </div>
        <button type="button" onClick={() => setToggleMenu(false)}><XMarkIcon className="w-8 h-8" /></button>
      </div>
      <div className="sm:hidden w-full flex justify-between items-center px-6 py-4">
        <div className="flex flex-col justify-center items-center">
          <CircularProgress max={90} value={listings.length} color='green.400'>
            <CircularProgressLabel>{listings.length}/90</CircularProgressLabel>
          </CircularProgress>          
          <p className="text-xs">Active listings</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <CircularProgress max={2} value={estateListings.length} color='green.400'>
            <CircularProgressLabel>{estateListings.length}/2</CircularProgressLabel>
          </CircularProgress>          
          <p className="text-xs">Active real-estates</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <CircularProgress max={3} value={carsListings.length} color='green.400'>
            <CircularProgressLabel>{carsListings.length}/3</CircularProgressLabel>
          </CircularProgress>          
          <p className="text-xs">Active cars</p>
        </div>
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
      <MenuItem label="Saved Ads" onClick={() => {router.push('/myolx/saved/ads'), setToggleMenu(false)}} hover icon={<NewspaperIcon className="w-6 h-6" />} />
      <MenuItem label="Saved Users" onClick={() => {router.push('/myolx/saved/users'), setToggleMenu(false)}} hover icon={<UserIcon className="w-6 h-6" />} />
      <MenuItem label="Saved Searches" onClick={() => {router.push('/myolx/saved/searches'), setToggleMenu(false)}} hover icon={<MagnifyingGlassIcon className="w-6 h-6" />} />
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