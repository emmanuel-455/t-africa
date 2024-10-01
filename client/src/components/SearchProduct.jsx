import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchProducts } from '../utils/api';
import { useAtom } from 'jotai';
import { ratingFilterAtom, minPriceAtom, maxPriceAtom } from '../Redux/Store'; 

function SearchProduct() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratingFilter, setRatingFilter] = useAtom(ratingFilterAtom);  
  const [minPrice, setMinPrice] = useAtom(minPriceAtom);
  const [maxPrice, setMaxPrice] = useAtom(maxPriceAtom);

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  // Load filter values from localStorage on mount
  useEffect(() => {
    const savedMinPrice = localStorage.getItem('minPrice');
    const savedMaxPrice = localStorage.getItem('maxPrice');
    const savedRating = localStorage.getItem('selectedRating');

    if (savedMinPrice) setMinPrice(JSON.parse(savedMinPrice));
    if (savedMaxPrice) setMaxPrice(JSON.parse(savedMaxPrice));
    if (savedRating) setRatingFilter(JSON.parse(savedRating));
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const productsData = await fetchProducts(1);

        // Filter products based on search query
        let filteredProducts = productsData.filter(
          (product) =>
            (product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        // Apply the rating filter if selected
        if (ratingFilter) {
          filteredProducts = filteredProducts.filter((product) => product.rating >= ratingFilter);
        }

        // Apply price range filter
        if (minPrice !== null) {
          filteredProducts = filteredProducts.filter((product) => product.price >= minPrice);
        }
        if (maxPrice !== null) {
          filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
        }

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Failed to fetch products. Please try again later.');
      }

      setIsLoading(false);
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery, ratingFilter, minPrice, maxPrice]);  

  return (
    <div className='p-4'>
      <h2 className='text-xl mb-6 font-bold'>Showing results for "{searchQuery}"</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="text-center ">Failed to load products...</div>
      ) : products.length ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id} 
              className='flex flex-col rounded-lg bg-white shadow-md overflow-hidden'
            >
              <div className='w-full h-48 bg-[#E0E5EB]'>
                <img src={product.thumbnail} alt={product.title} className='p-2 w-full h-full object-cover' />
              </div>
              <div className='px-4 py-2'>
                <h3 className='text-lg font-semibold mb-2'>{product.title}</h3>
                <p className='text-black font-bold mb-1'>₦{product.price}</p>
                <p className='text-sm text-gray-600'>Min. order: {product.minimumOrderQuantity} pieces</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No products found for "{searchQuery}".</p>
          <p>Try different keywords or browse popular categories.</p>
        </div>
      )}
    </div>
  );
}

export default SearchProduct;
