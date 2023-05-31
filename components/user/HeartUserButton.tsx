"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as Outline } from "@heroicons/react/24/outline";
import { useState } from "react";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from '@chakra-ui/react';

interface HeartUserButtonProps {
  id: string
  small?: boolean
}

const HeartUserButton: React.FC<HeartUserButtonProps> = ({ id, small }) => {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const toast = useToast()
  const userId = auth?.currentUser?.uid

  const toggleLike = async () => {
    if (!userId) {
      router.push("/auth/login");
      return;
    }

    const savedUsersRef = doc(db, "users", userId, "savedUsers", id);
    const savedUsersDoc = await getDoc(savedUsersRef);

    if (savedUsersDoc.exists()) {
      // Remove like if product is already liked
      await deleteDoc(savedUsersRef);
      toast({ position: 'top', status: 'success', title: 'User removed from favorites'})
      setClicked(false);
    } else {
      // Add like if product is not already liked
      const newLike = { likedRef: id };
      await setDoc(doc(db, "users", userId, "savedUsers", id), newLike);
      toast({ position: 'top', status: 'success', title: 'User saved to favorites'})
      setClicked(true);
    }
  }

  useEffect(() => {
    const checkLikedStatus = async () => {
      if (!userId) {
        return;
      }
      const savedUsersRef = doc(db, "users", userId, "savedUsers", id);
      const savedUsersDoc = await getDoc(savedUsersRef);
      if (savedUsersDoc.exists()) {
        setClicked(true);
      } else {
        setClicked(false);
      }
    };
    checkLikedStatus();
  }, [userId, id])

  return (
    <button onClick={toggleLike} className="flex w-full justify-center items-center text-base font-normal gap-2 border-2 border-black transition hover:shadow-button rounded-[4px] p-1.5">
      {clicked ? (
        <>
          <HeartIcon className="w-8 h-8 mx-1 cursor-pointer transition hover:scale-110 text-red-600" />
          <p>Remove from saved</p>
        </>
      ) : (
        <>
          <Outline className={`w-8 h-8 mx-1 cursor-pointer transition hover:scale-110 ${small ? 'text-white' : ''}`} />
          <p>Save user</p>
        </>
      )}
    </button>
  )
}

export default HeartUserButton;
