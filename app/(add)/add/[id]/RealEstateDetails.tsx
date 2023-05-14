'use client'

import Container from "@/components/adds/details/ContainerDetails"
import MainDetails from "@/components/adds/details/MainDetails"
import { estateDetails } from "@/utils/tableDetails"
import { DocumentData } from "firebase/firestore"

type EstateProps = {
  id: string
  details: DocumentData
}

const RealEstateDetails = ({ id, details }: EstateProps) => {
  return (
    <Container bground>
      <MainDetails 
        id={id}
        title={details?.title}
        price={details?.price}
        category={details?.category}
        userRef={details?.userRef}
        imageURL={details?.imageURL}
        top1={details?.region}
        top2={details?.type}
        top3={details?.createdAt}
        description={details?.description}
        details={details}
        table={estateDetails}
      />
    </Container>
  );
}

export default RealEstateDetails;