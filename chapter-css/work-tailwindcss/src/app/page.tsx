import { ProductCard } from "@/components/ProductCard";
import PRODUCTS from "@/data/products";

export default function Home() {
  return (
    <main className="mx-auto max-w-[960px] flex flex-wrap">
      {PRODUCTS.map((product) => (
        <div
          key={product.id}
          className="w-full md:w-1/3 p-2"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </main>
  );
}
