function HomePage(props) {
  const { products, initData } = props;
  console.log("homapeage", initData);
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
export async function getStaticProps() {
  let initData = [];

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const data = await response.json();
    initData = [...data];
  };
  
  await fetchData();

  return {
    props: {
      products: [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ],
      initData,
    },
  };
}
export default HomePage;
