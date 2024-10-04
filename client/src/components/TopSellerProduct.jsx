import React from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { productsAtom } from '../Redux/Store.js';

function TopSellerProduct() {
  const [products] = useAtom(productsAtom);

  // Limit the products to the first four
  const topSellerProducts = products.slice(0, 4);

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="w-full overflow-x-auto lg:overflow-x-visible">
      {/* Use flex for small screens and grid for larger screens */}
      <div className="flex lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pl-4  gap-4 lg:gap-[20px] mt-8 lg:mt-[48px] lg:w-full md:pl-[80px] lg:pl-0">
        {topSellerProducts.map((item) => (
          <Link
            to={`/product/${item.id}`}  // Use Link to navigate to product detail page
            key={item.id}
          >
            <div className="bg-[#F9F9E6] rounded-[10px] w-[285px] lg:w-auto">
              {/* Image Section */}
              <div className="rounded-t-[10px] bg-[#FCC945] p-2">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
              </div>

              {/* Card Info Section */}
              <div className="p-4 rounded-b-[10px]">
                <h2 className="font-bold leading-[22px] text-lg mb-2">{item.title}</h2>
                <p title={item.description} className="text-sm text-black mb-2">
                  {truncateText(item.description, 50)}
                </p>
                <p className="font-bold text-lg">${item.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopSellerProduct;
