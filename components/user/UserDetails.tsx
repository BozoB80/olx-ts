import olxMale from '@/assets/olx-male.svg'
import medal1 from '@/assets/medal1.png'
import medal2 from '@/assets/medal2.png'
import Image from "next/image";
import { ChartBarSquareIcon, ChatBubbleLeftIcon, PencilSquareIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { DocumentData, doc } from 'firebase/firestore';
import { auth, db } from "@/firebase/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../Button";
import useMessageModal from '../../hooks/useMessageModal';
import { useDocumentData } from "react-firebase-hooks/firestore";
import { getTimeAgo } from "@/utils/dateUtils";

interface UserDetailsProps {
  id: string
  details: DocumentData
}

const UserDetails: React.FC<UserDetailsProps> = ({ id, details }) => {
  const messageModal = useMessageModal()
  const userRef = details.userRef
  const router = useRouter()

  const [ selectedUser ] = useDocumentData(doc(db, 'users', userRef))
  const signedIn = selectedUser && selectedUser?.lastSignInTime?.toDate()
  const lastSignedIn = signedIn && getTimeAgo(signedIn)  
    
  return (
    <>
    <div className="flex xl:flex-col items-center justify-start sm:justify-center xl:justify-start w-full lg:w-[332px] rounded-md bg-white xl:bg-[#f1f4f5] space-y-4 top-4">
      <div className="sm:w-[332px] bg-white p-4 rounded-[4px]">
        <div className="flex flex-col w-full">
          <h1 className="hidden sm:block text-sm font-semibold mb-3">USER</h1>
          <div className="flex justify-start items-center">
            <Image
              src={olxMale}
              alt="avatarphoto"
              width={72}
              height={72}
              className="rounded-full"
            />
            <div className="flex flex-col ml-5">
              <Link href={`/profile/${userRef}`} className="font-semibold">{details?.createdBy}</Link>
              <h1 className="text-gray-400">Online {lastSignedIn} </h1>
              <div className="flex gap-3">
                <Image src={medal1} alt="medal1" width={25} height={25} />
                <Image src={medal2} alt="medal2" width={25} height={25} />
              </div>
            </div>
          </div>
          <div className="mt-3 bg-[#f1f4f5] p-2 runded-md font-semibold ">
            <p className="text-sm">Usual reply time 1 hour</p>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex w-[332px] bg-white p-4 gap-3 rounded-[4px]">
        {userRef === auth?.currentUser?.uid ? (
          <>
            <Button label="Statistics" dark icon={<ChartBarSquareIcon className="w-5 h-5" />} />
            <Button label="Options" icon={<PencilSquareIcon className="w-5 h-5" />} onClick={() => router.push(`/add/edit/${id}`)} />
          </>
        ) : (
          <>
            <Button label="Phone" icon={<PhoneIcon className="w-5 h-5" />} />
            <Button label="Message" icon={<ChatBubbleLeftIcon className="w-5 h-5" />} onClick={() => messageModal.onOpen(id, details)} />        
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default UserDetails