import MobilesForm from '@/components/adds/publishForms/MobilesForm';
import CarsForm from '../../../components/adds/publishForms/CarsForm';


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
        "Form not available yet"
      }
    </>
  );
}

export default PublishPage;