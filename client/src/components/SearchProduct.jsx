import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../utils/api';
import { useAtom } from 'jotai';
import { ratingFilterAtom, minPriceAtom, maxPriceAtom, cartAtom } from '../redux/Store';
import Filter from './Filter';

function SearchProduct() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratingFilter, setRatingFilter] = useAtom(ratingFilterAtom);
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [minPrice, setMinPrice] = useAtom(minPriceAtom);
  const [maxPrice, setMaxPrice] = useAtom(maxPriceAtom);
  const user = true;
  const navigate = useNavigate();

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

  const handleAddToCart = (product) => {
    const newItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1, // Default quantity to 1 for now
      image: product.thumbnail,
    };

    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);

      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const handleButtonClick = (product) => {
    if (user) {
      handleAddToCart(product);
    } else {
      navigate('/signin');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg mb-5 font-bold">Showing results for "{searchQuery}"</h2>
      <div className='items-center mb-3'><Filter /></div>
      {products.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col rounded-t-lg bg-white overflow-hidden">
              <Link to={`/product/${product.id}`} className="w-full h-[6rem] bg-[#E0E5EB]">
                <img src={product.thumbnail} alt={product.title} className="p-2 w-[130px] h-full object-cover m-auto" />
              </Link>
              <div className="px-4 py-2">
                <h3 className="text-sm leading-[18px] font-semibold">{product.title}</h3>
                <p className="text-black text-base my-1            font-bold">₦{product.price}</p>
                <p className="text-sm text-gray-600">Min. order: {product.minimumOrderQuantity} pieces</p>
              </div>
              <button
                onClick={() => handleButtonClick(product)}
                className="text-sm py-[6px] text-white bg-brandGreen w-full font-medium hover:bg-green-800 rounded-b-lg"
              >
                Add to cart
              </button>
            </div>
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
