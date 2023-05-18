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
import { auth, db } from "@/firebase/firebase";
import Select from "@/components/inputs/Select";
import FormHeading from "./inputs/FormHeading";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import FormLocation from "./inputs/FormLocation";
import FormRadio from "./inputs/FormRadio";
import FormPrice from "./inputs/FormPrice";
import FormInput from "./inputs/FormInput";
import years from "@/utils/yearsArray";
import FormSelect from "./inputs/FormSelect";
import { carTypes, colors, cubics } from "@/utils/selectData";

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
      price: 1,
      title: "",
      mileage: "",
      year: 0,
      fuel: '',
      kilowatts: '',
      doors: '',
      transmission: '',
      color: '',
      type: '',
      drive: '',
      emission: '',
      description: '',


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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await addDoc(collection(db, "products"), {
        ...data,
        createdAt: Timestamp.now().toDate(),
        category: "Cars",
        createdBy: user?.displayName,
        userRef: user?.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const bodyContent = (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="w-full flex flex-col">
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
      </div>
      {selectedManufacturer && (
        <div className="w-full flex flex-col">
          <FormSelect
            id="model"
            label="model"
            placeholder="Choose model"
            options={modelData}
            register={register}
          />
        </div>
      )}
    </div>
  );

  const bodyContent2 = (
    <div className="flex flex-col justify-center items-center gap-5">
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
      <div className="w-full flex gap-10">
        <FormInput 
          id="title" 
          label="title" 
          register={register}
          errors={errors}
          required        
        />
        <FormInput 
          id="mileage"
          label="mileage"
          register={register}
          errors={errors}
          required
        />
      </div>
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
          label="Cubics"
          placeholder="Choose engine cubic"
          options={cubics}
          register={register}
        />
      </div>
      <div className="w-full flex gap-10">
        <div className="w-1/2 flex flex-col">
          <FormRadio 
            id="fuel"
            label="fuel"
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
            register={register}
            errors={errors}
          />
          <FormRadio 
            id="doors"
            label="number of doors"
            options={[ '2/3', '4/5' ]}
            register={register}
            setValue={setValue}
          />
        </div>
      </div>
      <div className="w-full flex gap-10">
        <div className="w-1/2 flex flex-col">
          <FormRadio 
            id="transmission"
            label="transmission"
            options={['Automatic', 'Semi-auto', 'Manual']}
            register={register}
            setValue={setValue}
          />
          <FormRadio 
            id="drive"
            label="drive"
            options={['Front', 'Rear', '4x4']}
            register={register}
            setValue={setValue}
          />
          <FormRadio 
            id="emission"
            label="emission"
            options={['Euro 0', 'Euro 1', 'Euro 2', 'Euro 3', 'Euro 4', 'Euro 5', 'Euro 6',]}
            register={register}
            setValue={setValue}
          />
        </div>
        <div className="w-1/2 flex flex-col">
          <FormSelect 
            id="color"
            label="color"
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
        </div>
      </div>
      
    </div>
  );

  const bodyContent3 = (
    <div className="flex flex-col justify-center items-center gap-5"></div>
  );

  return (
    <StepperForm
      title1="Manufacturer & Model"
      body1={bodyContent}
      title2="General Info"
      body2={bodyContent2}
      title3="Image"
      body3={bodyContent3}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default CarsForm;
