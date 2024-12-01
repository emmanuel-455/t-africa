import { Link } from 'react-router-dom';

const CustomerFavorites = ({ products }) => (
  <section>
    <h2 className="text-lg pl-3 rounded-sm py-1 font-bold bg-[#000] text-white mb-2">
      Customers Favorites
    </h2>
    <div className="flex space-x-4 overflow-x-auto">
      {products.map((product, index) => (
        <Link
          key={index}
          to={`/product/${product.id}`} // Dynamic link to the product details page
          className="w-[200px] bg-white flex flex-col flex-shrink-0 px-4 rounded-md"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <p className="font-semibold text-sm">{product.title}</p>
          <div className="flex flex-col justify-between pb-1">
            <p className="text-base text-black font-bold mt-1">₦{product.price}</p>
            <div className='flex justify-between items-center'>
            <p className="text-xs text-gray-500">{product.stock} items left</p>
            <p className="text-gray-500 text-xs my-2">{product.rating} ★</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default CustomerFavorites;
