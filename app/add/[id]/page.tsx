type AddProps = {
  params: {
    id: string
  }
}

const addPage = ({ params: { id }}: AddProps) => {
  
  return (
    <div>
      {id}
    </div>
  );
}

export default addPage;