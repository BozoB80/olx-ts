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
  const [priceOnRequest, setPriceOnRequest] = useState(false);

  const handlePriceRequest = () => {
    setPriceOnRequest(true);
    
  };

  return (
    <div className="w-full">
      <FormHeading label="price" />
      <div className="flex gap-2 sm:gap-5">
        <InputGroup>
          <Input
            fontSize={{ base: "sm", md: "initial" }}
            focusBorderColor="black"
            type="number"
            backgroundColor='gray.100'
            disabled={priceOnRequest}
            inputMode="numeric"
            {...register("price", { valueAsNumber: true, required: !priceOnRequest && required })}
          />
          <InputRightAddon fontSize={{ base: "sm", md: "initial" }} p={2}>
            EUR
          </InputRightAddon>
        </InputGroup>

        <h1 className="uppercase bg-gray-100 p-3 rounded-full text-xs font-semibold">
          OR
        </h1>

        <FormButton
          label="Price on request"
          onClick={handlePriceRequest}
          isDisabled={!priceOnRequest && required}
          {...register('price', { value: 'Price on request'})}
        />
      </div>
    </div>
  );
}

export default FormPrice;