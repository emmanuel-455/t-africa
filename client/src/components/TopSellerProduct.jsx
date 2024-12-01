import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { productsAtom } from '../redux/Store';

function TopSellerProduct() {
  const [products] = useAtom(productsAtom);

  // Limit the products to the first four
  const topSellerProducts = products.slice(0, 5);

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
      <div className="flex items-center justify-center pl-4 gap-4 lg:gap-[20px] mt-8 lg:mt-[48px] lg:w-full md:pl-[80px] lg:pl-0">
        {topSellerProducts.map((item) => (
          <Link
            to={`/product/${item.id}`}  // Use Link to navigate to product detail page
            key={item.id}
          >
            <div className="bg-[#F9F9E6] rounded-[10px] w-[200px] h-[180px]">
              {/* Image Section */}
              <div className="rounded-t-[10px] items-center flex justify-center bg-[#FCC945] p-2">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-[100px] h-20 object-cover"
                />
              </div>

              {/* Card Info Section */}
              <div className="p-2 rounded-b-[10px]">
                <h2 className="font-medium leading-[15px] text-sm mb-1">{item.title}</h2>
                {/* <p title={item.description} className="text-sm text-black mb-1">
                  {truncateText(item.description, 30)}
                </p> */}
                <p className="font-bold text-base">${item.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopSellerProduct;
