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

type ProfileProps = {
  id: string
}

const Profile = ({ id }: ProfileProps) => {
  const publishModal = usePublishModal()
  const router = useRouter()
  const { userItems } = useFetchUserAdds(id)
  const [toggleInfo, setToggleInfo] = useState(false);

  const [user] = useDocument(doc(db, "users", id));
  const [userData] = useDocumentData(doc(db, "users", id));

  const date = userData && userData.createdAt.toDate().toLocaleDateString('en-GB')


  return (
    <div className="flex flex-col lg:flex-row w-full p-1 sm:p-5">
      <div className="flex flex-col w-full lg:w-1/5 lg:border-r border-gray-300 sm:pr-5 lg:h-[50vh]">
        <div className="flex gap-3">
          <Image
            src={olxMale}
            alt="avatarphoto"
            width={56}
            height={56}
            className="rounded-full"
          />
          <div className="flex flex-col justify-center text-sm">
            <p>{userData?.displayName}</p>
            <div className="flex gap-2">
              <MapPinIcon className="w-5 h-5" />
              <p>{userData?.region}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Image src={medal1} alt="medal1" width={25} height={25} />
          <Image src={medal2} alt="medal2" width={25} height={25} />
        </div>

        <div className="flex justify-center w-full bg-white py-5 gap-3 rounded-[4px]">
          {id === auth?.currentUser?.uid ? (
            <>
              <Button label="Settings" icon={<PencilSquareIcon className="w-5 h-5" />} />
              <Button label="Publish" dark icon={<FolderPlusIcon className="w-5 h-5" />} onClick={publishModal.onOpen} />
            </>
          ) : (
            <>
              <Button label="Phone" icon={<PhoneIcon className="w-5 h-5" />} />
              <Button label="Message" icon={<ChatBubbleLeftIcon className="w-5 h-5" />} onClick={() => router.push(`/add/edit/${id}`)} />
            </>
          )}
        </div>

        <div className="relative">
          {!toggleInfo && (
            <div
              onClick={() => setToggleInfo(true)}
              className="flex justify-between pb-5"
            >
              <h1>Information</h1>
              <ChevronDownIcon className="w-5 h-5 cursor-pointer" />
            </div>
          )}

          {toggleInfo && (
            <>
              <div
                onClick={() => setToggleInfo(false)}
                className="flex justify-between"
              >
                <h1>Information</h1>
                <ChevronUpIcon className="w-5 h-5 cursor-pointer" />
              </div>
              <div className="block w-full py-5">
                <div className="flex flex-col text-sm ">
                  <div className="flex justify-between items-center">
                    <p>Registered</p>
                    <p>{date && date}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>OLX ID</p>
                    <p>{user && user.id.slice(0, 4)}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Online</p>
                    <p>an hour ago</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {id !== auth?.currentUser?.uid && (
            <div className="flex flex-col justify-center items-start space-y-3 py-3">
              <HeartUserButton id={id} />
              <Button label="Block User" icon={<NoSymbolIcon className="w-5 h-5" />} />
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