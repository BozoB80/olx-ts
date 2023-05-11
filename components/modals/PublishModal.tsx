"use client";

import Image, { StaticImageData } from "next/image";
import ostalo from "@/assets/ostalo.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { slideAnimation } from "@/utils/motion";
import useFetchCollection from "@/firebase/useFetchCollection";
import usePublishModal from "@/hooks/usePublishModal";
import Modal from "./Modal";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

type CategoryProps = {
  id: string;
  name: string;
  bgColor?: string;
  imageURL?: string | StaticImageData;
};

const PublishModal = () => {
  const { data } = useFetchCollection("categories", "asc");
  const publishModal = usePublishModal();
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const bodyContent = (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="grid grid-cols-2 gap-5 w-full pb-8 border-b">
        {data.slice(1, 5).map((category: CategoryProps) => {
          const handlePublish = () => {
            publishModal.onClose();
            router.push(`/publish/${category.name}`);
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
              <h1 className="pl-5">{category.name}</h1>
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
            <XMarkIcon onClick={() => setToggle(!toggle)} className="w-5 h-5 cursor-pointer" />          
            <ul>
              {data.slice(1, 13).map((category: CategoryProps) => {
                const handlePublish = () => {
                  publishModal.onClose();
                  router.push(`/publish/${category.name}`);
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
            <h1 className="font-semibold">0 of 3</h1>
          </div>
          <div className="flex justify-between items-center">
            <h1>Real estates</h1>
            <h1 className="font-semibold">0 of 2</h1>
          </div>
          <div className="flex justify-between items-center">
            <h1>Other</h1>
            <h1 className="font-semibold">1 of 85</h1>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
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
