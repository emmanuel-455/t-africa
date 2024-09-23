import React from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { productsAtom } from '../Redux/Store';

function TopSellerProduct() {
  const [products] = useAtom(productsAtom);
  console.log(products)

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
    <div className="flex justify-between gap-4 mt-8">
      {topSellerProducts.map((item) => (
        <Link
          to={`/product/${item.id}`}  // Use Link to navigate to product detail page
          key={item.id}
          className="w-[24%]"
        >
          <div className="bg-[#F9F9E6] rounded-xl overflow-hidden">
            {/* Image Section */}
            <div className="bg-[#FCC945] p-2">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
            </div>

            {/* Card Info Section */}
            <div className="p-4">
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
  );
}

export default TopSellerProduct;
