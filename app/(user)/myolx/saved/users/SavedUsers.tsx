"use client";

import { auth, db } from "@/firebase/firebase";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import {useCollection,useCollectionData} from "react-firebase-hooks/firestore";
import noavatar from '@/assets/noavatar.png'
import delivery from '@/assets/delivery.svg'
import medal1 from '@/assets/medal1.png'
import medal2 from '@/assets/medal2.png'
import { useToast } from "@chakra-ui/react";
import Container from "@/components/Container";

const SavedUsers = () => {
  const toast = useToast()
  const userId: string = auth?.currentUser?.uid!
  const [userDetails] = useCollection(collection(db, "users"));
  const [allLikedUsers] = useCollectionData(userId ? collection(db, "users", userId, "savedUsers") : null);

  return (
    <Container>

      <div className="w-full py-1 sm:py-5">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-2xl mb-3">Saved users [{allLikedUsers?.length}]</h1>
          <div className="w-full py-2 sm:py-5 gap-2 sm:gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {userDetails?.docs
              .filter((user) =>
              allLikedUsers?.some((liked) => liked.likedRef === user.id)
              )
              .map((user) => {
                const idRef = user.id
                const handleDelete = () => {                
                  try {
                    deleteDoc(doc(db, "users", userId, "savedUsers", idRef))
                    toast({ position: 'top', status: 'success', title: 'You removed user from favorites'})
                  } catch (error: any) {
                    toast({ position: 'top', status: 'error', title: 'User has not been deleted'})
                  }            
                }

                const details = user.data()
                
                return (
                  <Link
                    href={`/profile/${user.id}`}
                    key={user.id}
                    className="relative flex flex-col justify-between items-center py-5 h-[270px] shadow-xl rounded-md bg-white cursor-pointer"
                  >
                    <h1 className="pb-2 text-lg font-medium truncate">{details.displayName}</h1>
                    <Image
                      src={noavatar}
                      alt="avatar"
                      width={300}
                      height={300}
                      className="object-contain w-1/2 rounded-t-md"
                    />
                    <button onClick={handleDelete} className="absolute top-0 right-0 z-10 bg-[#002f34] rounded-tr-md">
                      <XMarkIcon className="w-6 h-6 cursor-pointer text-white m-1" />
                    </button>
                    <div className="flex justify-center items-center gap-2 p-2">               
                      <Image src={medal1} alt="medal1" width={25} height={25} />
                      <Image src={medal2} alt="medal2" width={25} height={25} />
                      <Image src={delivery} alt="delivery" width={25} height={25} />
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SavedUsers;
