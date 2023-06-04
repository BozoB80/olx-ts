'use client'

import {
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FolderPlusIcon,
  MapPinIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import olxMale from "@/assets/olx-male.svg";
import medal1 from "@/assets/medal1.png";
import medal2 from "@/assets/medal2.png";
import { auth, db } from "@/firebase/firebase";
import { doc } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import Button from "@/components/Button";
import usePublishModal from "@/hooks/usePublishModal";
import { useRouter } from "next/navigation";
import HeartUserButton from "@/components/user/HeartUserButton";
import useFetchUserAdds from "@/firebase/useFetchUserItems";
import ProductCardSmall from "@/components/ads/ProductCardSmall";
import { getTimeAgo } from "@/utils/dateUtils";
import useOptionsModal from "@/hooks/useOptionsModal";

type ProfileProps = {
  id: string
}

const Profile = ({ id }: ProfileProps) => {
  const publishModal = usePublishModal()
  const optionsModal = useOptionsModal()
  const router = useRouter()
  const { userItems } = useFetchUserAdds(id)

  const [user] = useDocument(doc(db, "users", id));
  const [userData] = useDocumentData(doc(db, "users", id));

  const date = userData && userData.createdAt.toDate().toLocaleDateString('en-GB')

  const signedIn = userData && userData?.lastSignInTime?.toDate()
  const lastSignedIn = signedIn && getTimeAgo(signedIn)  

  return (
    <div className="flex flex-col lg:flex-row w-full p-1 sm:p-5">
      <div className="flex flex-col w-full lg:w-1/5 lg:border-r border-gray-300 pb-2 sm:pr-5 lg:h-[50vh]">
        <div className="flex gap-3">
          <Image
            src={olxMale}
            alt="avatarphoto"
            width={56}
            height={56}
            className="rounded-full"
          />
          <div className="flex flex-col justify-center text-sm">
            <p className="font-bold text-xl sm:text-base">{userData?.displayName}</p>
            <div className="flex gap-2">
              <MapPinIcon className="w-5 h-5" />
              <p className="text-sm">{userData?.region}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Image src={medal1} alt="medal1" width={25} height={25} />
          <Image src={medal2} alt="medal2" width={25} height={25} />
        </div>

        <div className="flex justify-center w-full bg-white py-5 gap-3 rounded-[4px]">
          {id === auth?.currentUser?.uid ? (
            <div className="hidden sm:flex justify-between w-full items-center gap-3">
              <Button label="Settings" icon={<PencilSquareIcon className="w-5 h-5" />} onClick={() => router.push(`/settings/${id}`)} />
              <Button label="Publish" dark icon={<FolderPlusIcon className="w-5 h-5" />} onClick={publishModal.onOpen} />
            </div>
          ) : (
            <>
              <Button label="Phone" icon={<PhoneIcon className="w-5 h-5" />} className="w-1/2 py-1.5 sm:py-3" />
              <Button label="Message" dark icon={<ChatBubbleLeftIcon className="w-5 h-5" />} onClick={() => optionsModal.onOpen(id)} className="w-1/2 py-1.5 sm:py-3" />
            </>
          )}
        </div>

        <div className="relative">        
            <div className="flex flex-col justify-between">
              <h1 className="font-semibold">Information</h1>
              <div className="w-full py-3">
                <div className="flex flex-col text-sm">
                  <div className="flex justify-between items-center">
                    <p>Registered</p>
                    <p className="font-semibold">{date && date}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>OLX ID</p>
                    <p className="font-semibold">{user && user.id.slice(0, 6)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Online</p>
                    <p className="font-semibold">{lastSignedIn}</p>
                  </div>
                </div>
              </div>
            </div>        

          {id !== auth?.currentUser?.uid && (
            <div className="flex flex-col justify-center items-start space-y-3 py-3">
              <HeartUserButton id={id} />
              <Button label="Block User" icon={<NoSymbolIcon className="w-5 h-5" />} className="border-none text-red-600 text-sm" />
            </div>
          )}
        </div>
      </div>

      {/* fetch User Ads */}

      <div className="flex flex-col">      
        <ProductCardSmall data={userItems} />
      </div>
    </div>
  );
}

export default Profile;