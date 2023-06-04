"use client";

import { useEffect, useState } from "react";
import FormHeading from "./FormHeading";
import FormButton from "./FormButton";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Input,  } from "@chakra-ui/react";
import UserDetails from "@/components/user/UserDetails";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { regions } from "@/utils/selectData";
import { FieldValues, UseFormRegister } from "react-hook-form";
import FormSelect from "./FormSelect";


interface UserDetails {
  region: string
}

interface FormLocationProps {
  register: UseFormRegister<FieldValues>
}

const FormLocation: React.FC<FormLocationProps> = ({ register }) => {
  const [switchLocation, setSwitchLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [ user ] = useAuthState(auth)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserDetails = async () => {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = querySnapshot.docs.find((doc) => doc.id === user.uid);
        if (userData) {
          const userDetailsData = userData.data() as UserDetails;
          setUserDetails(userDetailsData);
          setSelectedLocation(userDetailsData.region)
          
        }
      }
      fetchUserDetails();
    }
  }, [user]);  

  const handleBackButtonClick = () => {
    setSwitchLocation(false);
    setSelectedLocation(userDetails?.region!);
  };

  const handleButtonClick = () => {
    setSwitchLocation(true);
    setSelectedLocation('')
  };

  return (
    <div className="w-full flex flex-col">
      <FormHeading label="location" />
      <div className="flex justify-center items-center gap-2 sm:gap-10">
        {switchLocation ? (
          <>
            <FormSelect
              id="region"
              options={regions}
              placeholder="Choose location"
              register={register}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
            <FormButton
              label="Back to the registered location"
              icon={<MapPinIcon className="w-5 h-5" />}
              onClick={handleBackButtonClick}
            />
          </>
        ) : (
          <>
            <Input
              fontSize={{ base: 'sm', md: 'initial' }}
              backgroundColor={'gray.100'}
              value={selectedLocation}
              {...register("region", { required: true })}
              className="cursor-not-allowed"
            />
            <FormButton
              label="Change location"
              icon={<MapPinIcon className="w-5 h-5" />}
              onClick={handleButtonClick}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FormLocation;
