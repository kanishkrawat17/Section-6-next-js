import fs from "fs/promises";
import path from "path";

const ProductsList = (props) => {
  const { loadedProduct } = props;
  if (!loadedProduct) {
    console.log('HELLO')
    return <h2>No products</h2>;
  }
  const { id, title } = loadedProduct;

  return (
    <div>
      <h3>{title}</h3>
      <h3>{id}</h3>
    </div>
  );
};

const getData = async () => {
  const pathName = path.join(process.cwd(), "dummy-data.json");
  const stringifiedproducts = await fs.readFile(pathName);
  const products = JSON.parse(stringifiedproducts)?.products;

  return products;
};

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const products = await getData();

  const loadedProduct = products.find((product) => {
    return product.id.toString() == productId;
  });

  return {
    props: {
      loadedProduct,
    },
  };
}

export async function getStaticPaths() {
  const products = await getData();
  const paths = products.map((product) => {
    return {
      params: { pid: product.id.toString() },
    };
  });

  return {
    // paths, // for pre-fetching all the product item pages
    paths: [{ params: { pid: "1" } }, { params: { pid: "2" } }],
    fallback: true, // or true if you want to enable fallback behavior
  };
}

export default ProductsList;

// This is how the path looks
// paths: [
//   { params: { pid: 1 } },
//   { params: { pid: 2 } },
//   { params: { pid: 3 } },
// ],
