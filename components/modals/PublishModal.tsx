"use client";

import Image, { StaticImageData } from "next/image";
import ostalo from "@/assets/ostalo.svg";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import useFetchCollection from "@/firebase/useFetchCollection";
import usePublishModal from "@/hooks/usePublishModal";
import Modal from "./Modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebase";
import { DocumentData, collection, doc, getDocs, query, where } from "firebase/firestore";

type CategoryProps = {
  id: string;
  name: string;
  bgColor?: string;
  imageURL?: string | StaticImageData;
};

const PublishModal = () => {
  const { data } = useFetchCollection("categories", "asc");
  const publishModal = usePublishModal();
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const [user] = useAuthState(auth);
  const [listings, setListings] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const q = query(collection(db, 'products'), where('userRef', '==', user?.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setListings(data);
    };

    if (user?.uid) {
      fetchListings();
    }
  }, [user?.uid]);  

  const carsListings = listings.filter(listings => listings.category === 'Cars')
  const estateListings = listings.filter(listings => listings.category === 'Real Estate')

  const bodyContent = (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="grid grid-cols-2 gap-5 w-full pb-8 border-b">
        {data.slice(1, 5).map((category: CategoryProps) => {
          const handlePublish = () => {
            publishModal.onClose();
            const categoryName = category.name.toLowerCase()
            router.push(`/publish/${categoryName}`);
          };
          return (
            <div
              onClick={handlePublish}
              key={category.id}
              className="flex w-full justify-items-start items-center cursor-pointer"
            >
              <div
                style={{ backgroundColor: category.bgColor }}
                className="flex justify-center items-center border w-16 h-16 rounded-full"
              >
                <Image
                  src={category.imageURL ? category.imageURL : ""}
                  alt="imagecat"
                  width={50}
                  height={50}
                  className="object-contain bg-transparent hover:scale-110 transition-all cursor-pointer"
                />
              </div>
              <h1 className="pl-1 sm:pl-5">{category.name}</h1>
            </div>
          );
        })}
      </div>
      <div
        onClick={() => setToggle(true)}
        className="flex w-full justify-start items-center my-5"
      >
        <div className="flex justify-center items-center border w-16 h-16 rounded-full">
          <Image
            src={ostalo}
            alt="ostalo"
            width={40}
            height={40}
            className="object-contain bg-transparent hover:scale-110 transition-all cursor-pointer"
          />
        </div>
        <button className="pl-5">Publish something else</button>

        {toggle && (
          <div className="absolute inset-5 p-2 bg-[#f1f4f5] z-10">
            <div className="flex justify-end">
              <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={() => setToggle(false)} />
            </div>
            <ul>
              {data.slice(1, 13).map((category: CategoryProps) => {
                const handlePublish = () => {
                  setToggle(false)
                  publishModal.onClose();
                  const categoryName = category.name.toLowerCase()
                  router.push(`/publish/${categoryName}`);
                };
                return (
                  <div
                    key={category.id}
                    onClick={handlePublish}
                    className="cursor-pointer p-1 font-semibold"
                  >
                    <li>{category.name}</li>
                  </div>
                );
              })}
            </ul>            
          </div>
        )}  
      </div>

      <div className="bg-gray-100 w-full rounded-md">
        <div className="flex flex-col p-4">
          <h1 className="text-xl font-semibold mb-3">
            Remaining number of ads
          </h1>
          <div className="flex justify-between items-center">
            <h1>Cars</h1>
            <h1 className="font-semibold">{carsListings.length} of 3</h1>
          </div>
          <div className="flex justify-between items-center">
            <h1>Real estates</h1>
            <h1 className="font-semibold">{estateListings.length} of 2</h1>
          </div>
          <div className="flex justify-between items-center">
            <h1>All ads</h1>
            <h1 className="font-semibold">{listings.length} of 90</h1>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={publishModal.isOpen}
      title="List an item"
      actionLabel="Become OLX pro"
      onClose={publishModal.onClose}
      body={bodyContent}
      onSubmit={() => router.push('/')}
    />
  );
};

export default PublishModal;
