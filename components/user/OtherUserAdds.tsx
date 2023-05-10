'use client'

import { auth } from '@/firebase/firebase';
import useFetchUserAdds from '@/firebase/useFetchUserItems';
import OtherUserAddsCard from '../adds/OtherUserAddsCard';

import ProductCardSmall from '../adds/ProductCardSmall';

type OtherAddsProps = {
  id: string
}

const OtherUserAdds = ({ id }: OtherAddsProps) => {

  const { userItems } = useFetchUserAdds(auth?.currentUser?.uid)

  const filteredItems = userItems.filter((item: any) => item.id !== id)
  
  return (
    <div className="bg-white sm:w-[832px] p-1 sm:p-4 rounded-[4px] flex justify-between gap-8">
      <OtherUserAddsCard adds={filteredItems} />        
    </div>
  )
}

export default OtherUserAdds;