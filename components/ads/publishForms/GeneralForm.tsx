'use client'

import { auth, db, storage } from "@/firebase/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import StepperForm from "./StepperForm";
import FormInput from "./inputs/FormInput";
import FormLocation from "./inputs/FormLocation";
import FormAvailability from "./inputs/FormAvailability";
import FormPrice from "./inputs/FormPrice";
import FormTextarea from "./inputs/FormTextarea";
import FormImage from "./inputs/FormImage";

type GeneralFormProps = {
  category: string
}

const GeneralForm = ({ category }: GeneralFormProps) => {
  const [user] = useAuthState(auth)
  const upperCaseCategory = category.charAt(0).toUpperCase() + category.slice(1)  
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      region: "",
      availability: "",
      price: Number(0) || 'Price on request',   
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
        category: upperCaseCategory,
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
      </div>
      <FormLocation register={register} />
      <FormAvailability register={register} setValue={setValue} noState />
      
    </div>
  )

  const bodyContent2 = (
    <div className="flex flex-col justify-center items-center gap-5">
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

  const bodyContent3 = (
    <div className="flex flex-col justify-center items-center gap-5">
      <FormImage 
        register={register}
        onImageUpload={handleImageUpload}
      />
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

export default GeneralForm;