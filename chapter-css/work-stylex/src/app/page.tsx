import { ProductCard } from "@/components/ProductCard";
import PRODUCTS from "@/data/products";
import * as stylex from "@stylexjs/stylex";

export default function Home() {
  return (
    <main {...stylex.props(s.main)}>
      {PRODUCTS.map((product) => (
        <div
          key={product.id}
          {...stylex.props(s.card)}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </main>
  );
}

const MOBILE = "@media screen and (max-width: 768px)";

const s = stylex.create({
  main: {
    margin: "0 auto",
    maxWidth: 960,
    fontFamily: "sans-serif",
    display: "flex",
    flexWrap: "wrap",
  },
  card: {
    padding: "0.2rem",
    width: {
      default: "33%",
      [MOBILE]: "100%",
    },
    maxWidth: {
      default: "33%",
      [MOBILE]: "100%",
    },
  },
});
