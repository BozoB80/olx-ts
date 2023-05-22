'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import StepperForm from "./StepperForm";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  doc,
  collection,
  query,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db, storage } from "@/firebase/firebase";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import FormLocation from "./inputs/FormLocation";
import FormRadio from "./inputs/FormRadio";
import FormPrice from "./inputs/FormPrice";
import FormInput from "./inputs/FormInput";
import years from "@/utils/yearsArray";
import FormSelect from "./inputs/FormSelect";
import { carTypes, colors, cubics } from "@/utils/selectData";
import FormTextarea from "./inputs/FormTextarea";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FormImage from './inputs/FormImage';
import FormAvailability from "./inputs/FormAvailability";

const MobilesForm = () => {
  const [user] = useAuthState(auth)
  const [ manufacturer ] = useCollectionData(collection(db, '/categories/j2zFFZEg3vvbq91jAQZh/manufacturer'))  

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      manufacturer: "",
      region: "",
      availability: "",
      state: "",
      price: Number(0) || 'Price on request',
      flash: "",
      system: "",
      color: "",
      memory: "",
      ram: "",
      screen: "",    
      description: "",
      imageURL: []
    },
  });

  const handleImageUpload = (files: ChangeEvent<HTMLInputElement>) => {
    setValue("imageURL", files)
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const imageURL = data.imageURL as File[];
      const imageUrls = [];

      for (const image of imageURL) {
        const storageRef = ref(storage, `images/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        imageUrls.push(downloadURL);
      }

      await addDoc(collection(db, "products"), {
        ...data,
        createdAt: Timestamp.now().toDate(),
        category: "Mobile Phones",
        createdBy: user?.displayName,
        userRef: user?.uid,
        imageURL: imageUrls
      });
    } catch (error) {
      console.log(error);
    }
  };

  const bodyContent = (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="w-full flex flex-col">
        <FormInput 
          id="title" 
          label="title" 
          register={register}
          errors={errors}
          required        
        />
        {manufacturer && (
          <FormSelect
            id="manufacturer"
            label="manufacturer"
            placeholder="Choose manufacturer"
            options={manufacturer}
            register={register}
          />
        )}
      </div>
      <FormLocation register={register} />
      <FormAvailability register={register} setValue={setValue} />
      <FormPrice register={register} required />
      <FormTextarea 
        id="description"
        label="Description"
        placeholder="Describe your product"
        register={register}
        errors={errors}
      />
    </div>
  )

  const bodyContent2 = (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="w-full flex gap-2 sm:gap-10">
        <div className="w-1/2 flex flex-col">
          <FormRadio 
            id="system"
            label="Operating system"
            options={['Android', 'iOS', 'Symbian', 'Other']}
            register={register}
            setValue={setValue}
          />
          <FormRadio 
            id="flash"
            label="Flash"
            options={['LED', 'Dual-LED', 'Xenon', 'Yes']}
            register={register}
            setValue={setValue}
          />
        </div>
        <div className="w-1/2 flex flex-col">
          <FormSelect 
            id="color"
            label="Color"
            placeholder="Choose Color"
            options={colors}
            register={register}
          />
        </div>

      </div>
    </div>
  )

  const bodyContent3 = (
    <div className="flex flex-col justify-center items-center gap-5">

    </div>
  )

  return (
    <StepperForm 
      title1="General Info"
      body1={bodyContent}
      title2="Optional Info"
      body2={bodyContent2}
      title3="Images"
      body3={bodyContent3}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

export default MobilesForm;