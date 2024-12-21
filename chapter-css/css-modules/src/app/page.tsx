import { ProductCard } from "@/components/ProductCard";
import PRODUCTS from "@/data/products";
import styles from "@/styles/main-page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {PRODUCTS.map((product) => (
        <div
          key={product.id}
          className={styles.card}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </main>
  );
}
