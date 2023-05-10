'use client'

import Container from "@/components/adds/details/ContainerDetails"
import MainDetails from "@/components/adds/details/MainDetails"
import { DocumentData } from "firebase/firestore"

type EstateProps = {
  id: string
  details: DocumentData
}

const RealEstateDetails = ({ id, details }: EstateProps) => {
  return (
    <div>
      Enter
    </div>
  );
}

export default RealEstateDetails;