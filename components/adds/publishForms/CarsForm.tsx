"use client";

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

interface Model {
  id: string;
  name: string;
}

const CarsForm = () => {
  const [manufacturer] = useCollectionData(
    collection(db, "categories", "PE2j37QZeo1UwY4TKZPJ", "manufacturer")
  );
  const [user] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      manufacturer: "",
      model: "",
      location: "",
      availability: "",
      state: "",
      price: Number(1),
      title: "",
      mileage: Number(0),
      year: Number(0),
      fuel: '',
      kilowatts: Number(0),
      doors: '',
      transmission: '',
      color: '',
      type: '',
      drive: '',
      emission: '',
      description: '',
      imageURL: []
    },
  });

  const selectedManufacturer = watch("manufacturer");
  const [modelData, setModelData] = useState<Model[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedManufacturer) {
        const manufacturerRef = doc(
          db,
          "categories",
          "PE2j37QZeo1UwY4TKZPJ",
          "manufacturer",
          selectedManufacturer
        );
        const modelsQuery = query(collection(manufacturerRef, "model"));
        const modelsSnapshot = await getDocs(modelsQuery);
        const modelsData = modelsSnapshot.docs.map((doc) =>
          doc.data()
        ) as Model[];
        setModelData(modelsData);
      } else {
        setModelData([]);
      }
    };

    fetchData();
  }, [selectedManufacturer]);

  const handleManufacturerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue("manufacturer", e.target.value);
  };

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
        category: "Cars",
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
            onChange={handleManufacturerChange}
          />
        )}
        {selectedManufacturer && (      
            <FormSelect
              id="model"
              label="model"
              placeholder="Choose model"
              options={modelData}
              register={register}
            />
        )}
        <div>
          <FormLocation register={register} />
          <div className="w-full flex gap-5">
            <FormRadio
              id="availability"
              label="Availability"
              options={["Available", "Not yet available"]}
              register={register}
              setValue={setValue}
              fullWidth
            />
            <FormRadio
              id="state"
              label="State"
              options={["New", "Used"]}
              register={register}
              setValue={setValue}
              fullWidth
            />
          </div>
          <FormPrice register={register} required />
          <FormTextarea 
            id="description"
            label="description"
            placeholder="Describe your product"
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );

  const bodyContent2 = (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex gap-10">
        <FormSelect 
          id="year"
          label="year"
          placeholder="Choose year"
          options={years}
          register={register}
          required
        />
        <FormSelect 
          id="cubic"
          label="cubics"
          placeholder="Choose engine cubic"
          options={cubics}
          register={register}
        />
      </div>
      <div className="w-full flex gap-10">
        <div className="w-1/2 flex flex-col">
          <FormRadio 
            id="fuel"
            label="Fuel"
            options={['Diesel', 'Petrol', 'Gas', 'Hybrid', 'Electric']}
            register={register}
            setValue={setValue}
            required
          />          
        </div>
        <div className="w-1/2 flex flex-col">
          <FormInput
            id="kilowatts"
            label="kilowatts [kW]"
            type="number"
            register={register}
            errors={errors}
          />
          <FormRadio 
            id="doors"
            label="number of doors"
            options={['2/3', '4/5']}
            register={register}
            setValue={setValue}
          />
        </div>
      </div>
      <div className="w-full flex gap-10">
        <div className="w-1/2 flex flex-col">
          <FormRadio 
            id="transmission"
            label="Transmission"
            options={['Automatic', 'Semi-auto', 'Manual']}
            register={register}
            setValue={setValue}
          />
          <FormRadio 
            id="drive"
            label="Drive"
            options={['Front', 'Rear', '4x4']}
            register={register}
            setValue={setValue}
          />
          <FormRadio 
            id="emission"
            label="Emission"
            options={['Euro 0', 'Euro 1', 'Euro 2', 'Euro 3', 'Euro 4', 'Euro 5', 'Euro 6',]}
            register={register}
            setValue={setValue}
          />
        </div>
        <div className="w-1/2 flex flex-col">
          <FormSelect 
            id="color"
            label="Color"
            placeholder="Choose color"
            options={colors}
            register={register}
          />
          <FormSelect 
            id="type"
            label="type"
            placeholder="Choose type"
            options={carTypes}
            register={register}
          />
          <FormInput 
            id="mileage"
            label="mileage"
            type="number"
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>      
    </div>
  );

  const bodyContent3 = (
    <div className="flex flex-col justify-center items-center">
      <FormImage 
        register={register}
        onImageUpload={handleImageUpload}
      />
      {/* <FormInput 
        id="imageURL"
        label="Images"
        accept="image/*"
        register={register}
        placeholder="Insert images"
        type="file"        
        errors={errors}
        handleImageUpload={handleImageUpload}
      /> */}
    </div>
  );

  return (
    <StepperForm
      title1="General info"
      body1={bodyContent}
      title2="Optional Info"
      body2={bodyContent2}
      title3="Image"
      body3={bodyContent3}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default CarsForm;
