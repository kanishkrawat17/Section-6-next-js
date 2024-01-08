import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <Link href={`/${product.id}`}>{product.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export async function getStaticProps() {
  /*
    let initData = [];

    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const json = await response.json();
      initData = [...json?.products];
    };

    await fetchData();

    if (!initData) {
      // If by any chance data is null or undefined we pass redirect: ('/some-path') ,
      //  that will redirect to that path
      redirect("/no-data");
    }

    if (initData.length == 0) {
      // If by any chance data do not come we pass notFound: true ,
      //  that will show 404 page automatically
      return { notFound: true };
    }
  */

    // process -> is provided globally by node
    // cwd -> current working directory
  const pathName = path.join(process.cwd(), "dummy-data.json");
  const stringifiedproducts = await fs.readFile(pathName);
  const products = JSON.parse(stringifiedproducts)?.products;

  return {
    props: {
      products,
    },
  };
}

export default HomePage;
