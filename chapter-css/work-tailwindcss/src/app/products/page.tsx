import PRODUCTS from "@/data/products";
import { Metadata } from "next";
import styles from "@/styles/product-card.module.css";
import Image from "next/image";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-[960px] flex flex-wrap">
      {PRODUCTS.map((product) => (
        <div
          key={product.id}
          className="w-full md:w-1/3 p-2"
        >
          <div className={styles.card}>
            <div className={styles.cardContainer}>
              <div className={styles.imageContainer}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className={styles.image}
                />
              </div>
              <div className={styles.infoContainer}>
                <h1 className={styles.title}>{product.title}</h1>
                <p className={styles.price}>{product.price}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
