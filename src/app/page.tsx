import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProducts } from "./actions";
import AddProductForm from "./AddProductForm";
import ProductList from "./ProductList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const products = await getProducts();

  return (
    <>
      <AddProductForm />
      <ProductList initialProducts={products} />
    </>
  );
}
