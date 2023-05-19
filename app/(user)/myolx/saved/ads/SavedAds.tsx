'use client'

import Container from "@/components/Container";
import { auth, db } from "@/firebase/firebase";
import { getTimeAgo } from "@/utils/dateUtils";
import { useToast } from "@chakra-ui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";

const SavedAds = () => {
  const toast = useToast()
  const userId: string = auth?.currentUser?.uid!
  
  const [products] = useCollection(collection(db, "products"));
  const [allLikedAdds] = useCollectionData(userId ? collection(db, "users", userId , "savedAdds") : null)

  return (
    <Container>

      <div className="w-full">
      <div className="flex flex-col justify-center items-start">
        <h1 className="text-2xl mb-3">Saved adds [{allLikedAdds?.length}]</h1>
        <div className="w-full py-2 sm:py-5 gap-2 sm:gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {products?.docs
            .filter((product) =>
              allLikedAdds?.some((liked) => liked.likedRef === product.id)
            )
            .map((product) => {
              const idRef = product.id
              const handleDelete = () => {             
                try {
                  deleteDoc(doc(db, "users", userId, "savedAdds", idRef))
                  toast({ position: 'top', status: 'success', title: 'You removed ad from favorites'})
                } catch (error) {
                  toast({ position: 'top', status: 'error', title: 'Ad has not been deleted'})
                }            
              }

              const add = product.data();
              const createdAt = add.createdAt.toDate();
              const timeAgo = getTimeAgo(createdAt);
              const furnished = add.furnished === true ? "Furnished" : "Not furnished";
              
              return (
                <Link
                  href={`/add/${product.id}`}
                  key={add.title}
                  className="relative flex flex-col h-[270px] shadow-xl rounded-md bg-white cursor-pointer"
                >
                  <div className='overflow-hidden rounded-t-md'>
                      <Image 
                        src={add.imageURL[0]}
                        alt={add.title}
                        width={300}
                        height={300}
                        className="object-cover w-[274px] h-[160px] rounded-t-md transition hover:scale-110"
                      />
                  </div>
                  <button onClick={handleDelete} className="absolute top-0 right-0 z-10 bg-[#002f34] rounded-tr-md">
                    <XMarkIcon className="w-6 h-6 cursor-pointer text-white m-1" />
                  </button>
                  <div className="flex flex-col gap-2 p-2">
                    <h1 className="pb-2 truncate">{add.title}</h1>
                    <div className="flex gap-2">
                      <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm capitalize">
                        {add.fuel || add.type || add.state}
                      </p>
                      <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">
                        {add.mileage || add.ram || furnished}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-xs">{timeAgo}</h1>
                      <p className="font-semibold text-sm sm:text-base">
                        {add.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        EUR
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
    </Container>
  );
}

export default SavedAds;