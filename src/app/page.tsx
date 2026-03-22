import { getProducts } from "./actions";
import AddProductForm from "./AddProductForm";
import ProductList from "./ProductList";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <AddProductForm />
      <ProductList initialProducts={products} />
    </>
  );
}
