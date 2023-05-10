"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as Outline } from "@heroicons/react/24/outline";
import { useState } from "react";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface HeartButtonProps {
  id: string
  userRef: string
  small?: boolean
}

const HeartButton: React.FC<HeartButtonProps> = ({ id, userRef, small }) => {
  const [clicked, setClicked] = useState(false)
  const router = useRouter()
  const userId = auth?.currentUser?.uid

  const toggleLike = async () => {
    if (!userId) {
      router.push("/auth/login");
      return;
    }

    const savedAddsRef = doc(db, "users", userId, "savedAdds", id);
    const savedAddsDoc = await getDoc(savedAddsRef);

    if (savedAddsDoc.exists()) {
      // Remove like if product is already liked
      await deleteDoc(savedAddsRef);
      toast.success("Add removed from favorites");
      setClicked(false);
    } else {
      // Add like if product is not already liked
      const newLike = { likedRef: id };
      await setDoc(doc(db, "users", userId, "savedAdds", id), newLike);
      toast.success("Added to favorites");
      setClicked(true);
    }
  }

  useEffect(() => {
    const checkLikedStatus = async () => {
      if (!userId) {
        return;
      }
      const savedAddsRef = doc(db, "users", userId, "savedAdds", id);
      const savedAddsDoc = await getDoc(savedAddsRef);
      if (savedAddsDoc.exists()) {
        setClicked(true);
      } else {
        setClicked(false);
      }
    };
    checkLikedStatus();
  }, [userId, id])

  return (
    <div onClick={toggleLike} className={`${userRef === userId ? 'hidden' : 'flex'} justify-center items-center`}>
      {clicked ? (
        <HeartIcon className="w-8 h-8 mx-1 cursor-pointer transition hover:scale-110 text-red-600" />
      ) : (
        <Outline className={`w-8 h-8 mx-1 cursor-pointer transition hover:scale-110 ${small ? 'text-white' : ''}`} />
      )}
    </div>
  )
}

export default HeartButton;
