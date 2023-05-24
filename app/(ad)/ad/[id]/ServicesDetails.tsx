import Container from "@/components/ads/details/ContainerDetails"
import MainDetails from "@/components/ads/details/MainDetails"
import { DocumentData } from "firebase/firestore"
import { generalDetails } from "@/utils/tableDetails"

type ServiceProps = {
  id: string
  details: DocumentData
}

const ServicesDetails = ({ id, details }: ServiceProps) => {
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
        top2={details?.availability}
        top3={details?.createdAt}
        description={details?.description}
        details={details}
        table={generalDetails}
      />      
    </Container>
  );
}

export default ServicesDetails;