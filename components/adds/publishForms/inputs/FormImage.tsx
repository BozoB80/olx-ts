'use client'

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import article from '@/assets/olx-articles-no.svg'
import check from '@/assets/checked-new.svg'
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface FormImageProps {
  id: string
  register: UseFormRegister<FieldValues>
  handleImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormImage: React.FC<FormImageProps> = ({ id, register, handleImageUpload }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageDrop = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      setImageFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      const selectedFiles = Array.from(files);
      setImageFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
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
        className="w-full h-60 border-2 border-dashed border-gray-300 rounded-md flex flex-col justify-center items-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label className="cursor-pointer">
          <input
            {...register(id)}
            type="file"
            multiple
            className="hidden"
            accept="image/*"
            onChange={handleImageDrop}
          />
          <span className="text-black font-semibold">
            Drag and drop images or click here to select files
          </span>
        </label>
        <div className="mt-4 flex flex-wrap gap-4">
        {imageFiles.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded Image"
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
