import { formatPrice } from "@/utils";
import { ProductType } from "@/utils/models";
import { FaRegHeart } from "react-icons/fa";
import { LiaCartPlusSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product } = props;
  return (
    <Link to={`/product_detail/${product.id}`} className="flex flex-col gap-3">
      <div className="relative overflow-hidden cursor-pointer group/item">
        <div className="overflow-hidden rounded ">
          <img
            className="transition-all duration-500 group-hover/item:scale-110"
            src={product?.images[0]?.url}
            alt=""
          />
        </div>
        <div className="absolute group-hover/item:flex animate-go-up hidden bottom-0 z-[1] left-0 h-10 w-full bg-opacity-60 text-white bg-primary  justify-center">
          <div className="flex items-center  overflow-hidden gap-3 text-[28px] ">
            <FaRegHeart className="duration-300 hover:text-black" />
            <div className="h-10 w-[2px] rounded-sm bg-white my-1"></div>
            <LiaCartPlusSolid className="duration-300 hover:text-black text-[35px]" />
          </div>
        </div>
      </div>
      <div className="cursor-pointer hover:text-primary">{product.name}</div>
      <div>{formatPrice(product.price)}</div>
    </Link>
  );
};
export default ProductCard;
