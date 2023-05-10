'use client'

import Container from "@/components/adds/details/ContainerDetails"
import MainDetails from "@/components/adds/details/MainDetails"
import { DocumentData } from "firebase/firestore"

type MobileProps = {
  id: string
  details: DocumentData
}

const MobileDetails = ({ id, details }: MobileProps) => {
  return (
    <div>
      Enter
    </div>
  );
}

export default MobileDetails;