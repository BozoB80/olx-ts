type CategoryProps = {
  params: {
    category: string
  }
}

const CategoryPage = ({ params: {category}}: CategoryProps) => {  
  return (
    <div>
      {category}
    </div>
  );
}

export default CategoryPage;