'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import StepperForm from "./StepperForm";
import { useDocument, useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, collection } from 'firebase/firestore';
import { db } from "@/firebase/firebase";
import Select from "@/components/inputs/Select";


const CarsForm = () => {

  const [ manufacturer ] = useCollectionData(collection(db, 'categories', 'PE2j37QZeo1UwY4TKZPJ', 'manufacturer'))

  console.log(manufacturer?.map((model) => model.id));
  

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      manufacturer: '',
    }
  })

  const bodyContent = (
    <div>
      <Select 
        id="manufacturer"
        placeholder="Choose manufacturer"
        // options={manufacturer?.map((data) => data.name)}
      />
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