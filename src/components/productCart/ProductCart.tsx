import type { IProduct } from "../../types/type";

type TProductCart = IProduct;

function ProductCart({
  id,
  category,
  description,
  image,
  price,
  title,
}: TProductCart) {
  return (
    <div className="w-full rounded-lg flex flex-col bg-white/5">
      <div className="imgWrapper w-full aspect-[4/5] rounded-t-lg bg-white/5 overflow-hidden p-2">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>
      <div className="data p-4 ">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="title  text-lg text-white line-clamp-2">{title}</h4>
          <span className="price font-semibold text-[wheat] text-lg">
            {price}$
          </span>
        </div>
        <p className="line-clamp-3 text-sm mt-3">{description}</p>
      </div>
    </div>
  );
}

export default ProductCart;
