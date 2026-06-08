import { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import ProductCart from "../../components/productCart/ProductCart";
import { fetchProducts, redNotif } from "../../services/api";
import type { IProduct, TStatus } from "../../types/type";
import { ClockLoader } from "react-spinners";

function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [status, setStatus] = useState<TStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStatus("loading");
    fetchProducts()
      .then((res) => {
        setProducts(res);
        setStatus("succeeded");
      })
      .catch((err) => {
        setStatus("failed");
        setError(err?.message || "failed to fetch data ...");
      });
  }, []);

  if (status === "failed") {
    redNotif(error);
    return (
      <Container>
        <h2 className="mt-10 text-2xl font-semibold text-white">Products:</h2>
        <div className="w-full mt-10 text-lg text-center text-rose-600 ">
          {error}
        </div>
      </Container>
    );
  }

  if (status === "idle" || status === "loading") {
    return (
      <Container>
        <h2 className="mt-10 text-2xl font-semibold text-white">Products:</h2>
        <div className="w-full flex justify-center items-center gap-4 mt-10 flex-col">
          <ClockLoader size={64} color="white" />
          <p>loading ...</p>
        </div>
      </Container>
    );
  }

  if (status === "succeeded") {
    return (
      <Container>
        <h2 className="mt-10 text-2xl font-semibold text-white">Products:</h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-0 gap-4 mt-8">
          {products?.map((item) => {
            return <ProductCart key={item.id} {...item} />;
          })}
        </div>
      </Container>
    );
  }
}

export default Products;
