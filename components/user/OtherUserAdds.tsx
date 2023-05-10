'use client'

import useFetchUserAdds from '@/firebase/useFetchUserItems';
import OtherUserAddsCard from '../adds/OtherUserAddsCard';
import { DocumentData } from 'firebase/firestore';

type OtherAddsProps = {
  id: string
  details: DocumentData
}

const OtherUserAdds = ({ id, details }: OtherAddsProps) => {
   const { userItems } = useFetchUserAdds(details?.userRef)

  const filteredItems = userItems.filter((item: any) => item.id !== id)
  
  return (
    <div className="bg-white sm:w-[832px] p-1 sm:p-4 rounded-[4px] flex justify-between gap-8">
      <OtherUserAddsCard adds={filteredItems} />        
    </div>
  )
}

export default OtherUserAdds;