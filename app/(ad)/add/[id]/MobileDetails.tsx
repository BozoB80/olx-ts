'use client'

import Container from "@/components/ads/details/ContainerDetails"
import MainDetails from "@/components/ads/details/MainDetails"
import { mobileDetails } from "@/utils/tableDetails"
import { DocumentData } from "firebase/firestore"

type MobileProps = {
  id: string
  details: DocumentData
}

const MobileDetails = ({ id, details }: MobileProps) => {
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
        top2={details?.state}
        top3={details?.createdAt}
        description={details?.description}
        details={details}
        table={mobileDetails}
      />
    </Container>
  );
}

export default MobileDetails;