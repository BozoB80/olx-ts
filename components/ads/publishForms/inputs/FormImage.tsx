'use client'

import Image from 'next/image';
import { useState } from 'react';
import { FieldValues, UseFormRegister } from "react-hook-form";
import article from '@/assets/olx-articles-no.svg'
import check from '@/assets/checked-new.svg'
import { XMarkIcon } from '@heroicons/react/24/outline';

interface FormImageProps {
  register: UseFormRegister<FieldValues>
  onImageUpload: any //not the best solution but it solved the error temporary
}

const FormImage: React.FC<FormImageProps> = ({ register, onImageUpload }) => {
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (files: FileList) => {
  const fileList = Array.from(files) as File[];
  const imageURLs = fileList.map((file) => URL.createObjectURL(file));
  setImageURLs(imageURLs);
  if (onImageUpload) {
    onImageUpload(fileList);
  }
};

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };

  const removeImage = (index: number) => {
    const updatedImageURLs = [...imageURLs];
    updatedImageURLs.splice(index, 1);
    setImageURLs(updatedImageURLs);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <div className="flex justify-start items-center bg-[#eef6ff] gap-5 p-2 w-full rounded-sm">
        <Image 
          src={article}
          alt="article"
          width={60}
          height={60}
        />
        <p className="text-sm">
          You can add up to 25 photos total - 7 photos are free. Every next photo will be charged 1 OLX credit.
        </p>
      </div>
      <div className="flex justify-start items-center bg-[#eef6ff] gap-5 p-2 w-full rounded-sm">
        <Image 
          src={check}
          alt="check"
          width={30}
          height={30}
        />
        <p className="text-sm">
          Pick the title photo of Your ad by clicking the white checkbox.
        </p>
      </div>

      <div
        className={`w-full h-80 flex flex-col justify-center items-center border-2 border-dashed rounded-lg p-4 ${
          isDragging ? "bg-gray-100" : ""}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-4 font-semibold">
          <label htmlFor="image-upload" className="cursor-pointer">
            Drag and drop images or click to select
          </label>
          <input
            id="image-upload"
            type="file"
            multiple
            {...register('imageURL')}
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          {imageURLs.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image}
                alt="Selected Image"
                width={150}
                height={150}
                className="w-32 h-32 object-cover rounded-md"
              />
              <button
              className="absolute top-0 right-0 -mt-1 -mr-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
              onClick={() => removeImage(index)}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormImage;
