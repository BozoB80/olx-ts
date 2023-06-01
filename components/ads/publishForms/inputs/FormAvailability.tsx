'use client'

import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import FormRadio from "./FormRadio";

interface FormAvailabilityProps {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  noState?: boolean
}

const FormAvailability: React.FC<FormAvailabilityProps> = ({ register, setValue, noState = false }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-10">
      <FormRadio
        id="availability"
        label="Availability"
        options={["Available", "Not available"]}
        register={register}
        setValue={setValue}
        fullWidth
      />
      {!noState && (
        <FormRadio
          id="state"
          label="State"
          options={["New", "Used"]}
          register={register}
          setValue={setValue}
          fullWidth
        />
      )}
    </div>      
  );
}

export default FormAvailability;