'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import StepperForm from "./StepperForm";
import { useDocument, useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, collection, query, getDocs } from 'firebase/firestore';
import { db } from "@/firebase/firebase";
import Select from "@/components/inputs/Select";
import FormHeading from "./inputs/FormHeading";
import { ChangeEvent, useEffect, useState } from 'react';

interface Model {
  id: string
  name: string
}


const CarsForm = () => {
  const [ manufacturer ] = useCollectionData(collection(db, 'categories', 'PE2j37QZeo1UwY4TKZPJ', 'manufacturer'))

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      manufacturer: '',
      model: '',
    }
  })
  const selectedManufacturer = watch('manufacturer');
  const [modelData, setModelData] = useState<Model[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedManufacturer) {
        const manufacturerRef = doc(db, 'categories', 'PE2j37QZeo1UwY4TKZPJ', 'manufacturer', selectedManufacturer);
        const modelsQuery = query(collection(manufacturerRef, 'model'));
        const modelsSnapshot = await getDocs(modelsQuery);
        const modelsData = modelsSnapshot.docs.map((doc) => doc.data()) as Model[];
        setModelData(modelsData); 
      } else {
        setModelData([]);
      }
    };

    fetchData();
  }, [selectedManufacturer]);

  const handleManufacturerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue('manufacturer', e.target.value); // Update the form value
  };
  
  const bodyContent = (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="w-full flex flex-col">
        <FormHeading label="manufacturer" />
        {manufacturer && (
          <Select 
            id="manufacturer"
            placeholder="Choose manufacturer"
            options={manufacturer}
            register={register}
            errors={errors}
            onChange={handleManufacturerChange}
            form
          />
        )}
      </div>
      {selectedManufacturer && (
        <div className="w-full flex flex-col">
          <FormHeading label="model" />
          <Select
            id="model"
            placeholder="Choose model"
            options={modelData}
            register={register}
            errors={errors}
            form
          />
        </div>
      )}
    </div>
  )

  return (
    <StepperForm 
      title1="Manufacturer & Model"
      body1={bodyContent}
    />
  );
}

export default CarsForm;