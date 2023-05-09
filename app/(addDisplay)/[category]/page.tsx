type CategoryProps = {
  params: {
    category: string
  }
}

const categoryPage = ({ params: {category}}: CategoryProps) => {  
  return (
    <div>
      {category}
    </div>
  );
}

export default categoryPage;