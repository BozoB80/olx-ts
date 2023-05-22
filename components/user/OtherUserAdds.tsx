'use client'

import useFetchUserAdds from '@/firebase/useFetchUserItems';
import OtherUserAddsCard from '../ads/OtherUserAddsCard';
import { DocumentData } from 'firebase/firestore';

type OtherAddsProps = {
  id: string
  details: DocumentData
}

const OtherUserAdds = ({ id, details }: OtherAddsProps) => {
   const { userItems } = useFetchUserAdds(details?.userRef)

  const filteredItems = userItems.filter((item: any) => item.id !== id)
  
  return (
    <div className="bg-white sm:w-full lg:w-[832px] rounded-[4px] flex justify-between gap-8">
      {filteredItems.length > 0 ? <OtherUserAddsCard ads={filteredItems} /> : ''}
    </div>
  )
}

export default OtherUserAdds;