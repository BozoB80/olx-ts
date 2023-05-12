import React, { useEffect, useState } from "react";
import olxMale from '@/assets/olx-male.svg'
import medal1 from '@/assets/medal1.png'
import medal2 from '@/assets/medal2.png'
import Image from "next/image";
import { ChartBarSquareIcon, ChatBubbleLeftIcon, InformationCircleIcon, PencilSquareIcon, PhoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../Button";

interface UserDetailsProps {
  id: string
  details: DocumentData
}

const UserDetails: React.FC<UserDetailsProps> = ({ id, details }) => {
  const [contact, setContact] = useState<DocumentData | null>(null)
  const [toggleMessage, settoggleMessage] = useState(false)
  const [message, setMessage] = useState("")
  const [lastSignedIn, setLastSignedIn] = useState('')
  const userRef = details.userRef
  const router = useRouter()  
   
  useEffect(() => {
    async function getContact() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact(docSnap.data());
      } else {
        console.error("Could not get contact data");
      }
    }
    getContact();
  }, [userRef]);

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }
  
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
              <h1 className="text-gray-400">Last signed in {lastSignedIn}</h1>
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
            <Button label="Message" icon={<ChatBubbleLeftIcon className="w-5 h-5" />} onClick={() => settoggleMessage(true)} />        
          </>
        )}
      </div>
    </div>

    {toggleMessage && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex bg-gray-300/30 justify-center items-center">
          <div className="flex flex-col bg-white w-1/2 shadow-xl rounded-md p-5">
            <div className="flex justify-between items-center">
              <h1 className="text-xl">Message for {contact?.displayName}</h1>
              <XMarkIcon onClick={() => settoggleMessage(false)} className="w-6 h-6 cursor-pointer" />
            </div>
            <div className="bg-[#eef6ff] p-2 flex items-center mt-4 gap-3 rounded-md">
              <InformationCircleIcon className="w-6 h-6" />
              <p className="text-sm">Add: {details?.title}</p>
            </div>
            <textarea
                name="description"
                required
                value={message}
                onChange={(e) => handleMessage(e)}
                cols={30}
                rows={10}
                className="p-2 border-none focus:outline-none rounded-md mt-4 bg-[#f2f4f5]"
            />
            <Link 
              href={`mailto:${contact?.email}?Subject=${details.title}&body=${message}`}              
              className="flex justify-center items-center gap-2 mt-4 w-full bg-black text-white py-2.5 rounded-md"
            >
              <button type="button" onClick={() => {}}>Send Message</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails