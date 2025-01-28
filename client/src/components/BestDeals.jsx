import { Link } from 'react-router-dom';

const BestDeals = ({ products }) => (
  <section>
    <h2 className="text-lg pl-3 rounded-sm py-1 font-bold bg-[#000] text-white mb-2">Best Deals</h2>
    <div className="flex space-x-4 overflow-x-auto">
      {products.map((product) => {
        // Calculate the discount amount
        const discountAmount = (product.price * product.discountPercentage) / 100;
        const discountedPrice = product.price - discountAmount;

        return (
          <Link
            key={product.id}
            to={`/product/${product.id}`} // Dynamic link to the product details page
            className="w-[150px] md:w-[200px] bg-white flex flex-col flex-shrink-0 px-4 rounded-md"
          >
            <div className='flex items-center justify-center'>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-[100%] rounded-md my-2"
              />
            </div>
            <p className="text-sm font-medium overflow-hidden whitespace-nowrap text-ellipsis">{product.title}</p>
            <div className="flex flex-col justify-between pb-1">
              {/* Display original price with strikethrough */}
              <p className="text-sm text-gray-500 line-through">₦{product.price.toFixed(2)}</p>
              {/* Display discounted price */}
              <div className='flex flex-col justify-between items-start'>
              <p className="text-base text-black font-bold mt-1">₦{discountedPrice.toFixed(2)}</p>
              {/* Display amount saved */}
              <p className="text-xs mb-2 text-gray-500">{product.stock} items left</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  </section>
);

export default BestDeals;
