import MobilesForm from '@/components/ads/publishForms/MobilesForm';
import CarsForm from '../../../components/ads/publishForms/CarsForm';
import ServicesForm from '@/components/ads/publishForms/ServicesForm';


type PublishProps = {
  params: {
    category: string
  }
}

const PublishPage = ({ params: { category }}: PublishProps) => {

  return (
    <>
      {
        category === "Cars" ? <CarsForm /> :
        category === "Mobile%20Phones" ? <MobilesForm /> :
        category === "Real%20Estate" ? 'Estates' :
        category === "Services" ? <ServicesForm /> :
        "Form not available yet"
      }
    </>
  );
}

export default PublishPage;