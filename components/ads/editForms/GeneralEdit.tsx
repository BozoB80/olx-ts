'use client'

import { db, storage } from "@/firebase/firebase";
import { DocumentData, Timestamp, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../publishForms/inputs/FormInput";
import FormLocation from "../publishForms/inputs/FormLocation";
import FormAvailability from "../publishForms/inputs/FormAvailability";
import FormPrice from "../publishForms/inputs/FormPrice";
import FormTextarea from "../publishForms/inputs/FormTextarea";
import FormImage from "../publishForms/inputs/FormImage";
import StepperForm from "../publishForms/StepperForm";

type GeneralProps = {
  id: string
  details: DocumentData
}

const GeneralEdit = ({ id, details }: GeneralProps) => {

  const {register, handleSubmit, setValue, formState: { errors }} = useForm<FieldValues>({
    defaultValues: {
      title: details.title,
      region: details.region,
      availability: details.availability,
      price: details.price,   
      description: details.description,
      imageURL: details.imageURL
    },
  });


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageUrls = [];

        for (const imageUrl of details.imageURL) {
          imageUrls.push(imageUrl);
        }

        setValue("imageURL", imageUrls);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();
  }, [details.imageURL, setValue]);


  const handleImageUpload = (files: ChangeEvent<HTMLInputElement>) => {
    setValue("imageURL", files)
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  try {
    const imageURL = data.imageURL as File[];
    const uploadedImageUrls = [];

    for (const image of imageURL) {
      const storageRef = ref(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);
      uploadedImageUrls.push(downloadURL);
    }

    const generalRef = doc(db, 'products', id);

    const updatedData = {
      ...data,
      editedAt: Timestamp.now().toDate(),
      imageURL: uploadedImageUrls.length > 0 ? [...details.imageURL, ...uploadedImageUrls] : details.imageURL,
    };

    await updateDoc(generalRef, updatedData);
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
      <FormAvailability register={register} setValue={setValue} />
      
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
        details={details}
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

export default GeneralEdit;