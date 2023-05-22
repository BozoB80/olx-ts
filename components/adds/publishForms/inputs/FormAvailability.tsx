'use client'

import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import FormRadio from "./FormRadio";

interface FormAvailabilityProps {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

const FormAvailability: React.FC<FormAvailabilityProps> = ({ register, setValue }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-10">
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
  );
}

export default FormAvailability;