import CarsForm from "@/components/adds/publishForms/StepperForm";

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
        category === "Mobile%20Phones" ? 'Mobiles' :
        category === "Real%20Estate" ? 'Estates' :
        "Form not available yet"
      }
    </>
  );
}

export default PublishPage;