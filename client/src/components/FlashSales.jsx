import { Link } from "react-router-dom";

const FlashSales = ({ products }) => (
  <section className="px-2 mb-[2rem]">
    <h2 className="text-lg pl-3 rounded-sm py-1 font-bold bg-[#000] text-white mb-2">
      Flash Sales
    </h2>
    <div className="flex space-x-4 overflow-x-auto">
      {products.map((product, index) => (
        <Link
          key={index}
          to={`/product/${product.id}`} // Link to product details page
          className="w-[150px] md:w-[200px] bg-white flex flex-col flex-shrink-0 px-4 rounded-md"
        >
          {/* Product image */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-40 object-cover rounded mb-2"
          />
          {/* Product title */}
          <p className="text-sm font-medium overflow-hidden whitespace-nowrap text-ellipsis">{product.title}</p>
          {/* Flash Sale label */}
          <p className="text-green-500 font-bold text-xs">Limited Time Offer</p>
          {/* Product price and stock */}
          <div className="flex flex-col justify-between pb-1">
            <p className="text-base text-black font-bold mt-1">
              ₦{product.price}
            </p>
            <p className="text-xs mb-2 text-gray-500">{product.stock} items left</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default FlashSales;
