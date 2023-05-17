'use client'

import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import FormHeading from "./FormHeading";
import FormButton from "./FormButton";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { useState } from 'react';

interface FormPriceProps {
  register: UseFormRegister<FieldValues>
  required?: boolean
}

const FormPrice: React.FC<FormPriceProps> = ({ register, required }) => {
  const [price, setPrice] = useState("")

  const handlePriceRequest = () => {
    setPrice("Price on request");
  };

  return (
    <div className="w-full">
      <FormHeading label="price" />
      <div className="flex gap-5">
        <InputGroup>
          <Input type="number" {...register('price', { required })} />
          <InputRightAddon children='EUR' />
        </InputGroup>

        <h1 className="uppercase bg-gray-100 p-3 rounded-full text-xs font-semibold">OR</h1>

        <FormButton label="Price on request" onClick={handlePriceRequest} isDisabled />

      </div>
    </div>
  );
}

export default FormPrice;