import MobilesForm from '@/components/ads/publishForms/MobilesForm';
import CarsForm from '../../../components/ads/publishForms/CarsForm';
import GeneralForm from '@/components/ads/publishForms/GeneralForm';

type PublishProps = {
  params: {
    category: string
  }
}

const PublishPage = ({ params: { category }}: PublishProps) => {
  return (
    <>
      {
        category === "cars" ? <CarsForm /> :
        category === "mobile%20phones" ? <MobilesForm /> :
        category === "real%20estate" ? 'Estates' :
        category === "services" || "jobs" || "business%20%26%20industry" || "art" || "clothes%20%26%20footwear" || "pets" || "literature" ? <GeneralForm category={category} /> :
        "Form not available yet"
      }
    </>
  );
}

export default PublishPage;