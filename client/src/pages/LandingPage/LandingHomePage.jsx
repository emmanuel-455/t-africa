import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { productsAtom, loadingAtom, errorAtom } from '../../redux/Store.js';
import ConnectBanner from '../../components/ConnectPageComponents/ConnectBanner';
import VerifiedSeller from '../../components/VerifiedSeller';
import Testimonial from '../../components/Testimonial';
import GetStarted from '../../components/GetStarted';
import NewArrival from '../../components/NewArrival.jsx';
import Category from '../../components/Category.jsx';
import RandomCateProduct from '../../components/RandomCateProduct.jsx';
import BestDeals from '../../components/BestDeals';
import TrendingProducts from '../../components/TrendingProducts';
import FlashSales from '../../components/FlashSales';
import CustomerFavorites from '../../components/CustomerFavorites';
import TopCategories from '../../components/TopCategories';
import EditorsPicks from '../../components/EditorsPicks';
import RecentlyViewed from '../../components/RecentlyViewed';
import BrandExplorer from '../../components/BrandExplorer';
import CategoryBox from '../../components/CategoryBox.jsx';

function LandingHomePage() {
  const [products, setProducts] = useAtom(productsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [page] = React.useState(1); // State to manage pagination

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products?skip=${(page - 1) * 30}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products); // Update atom state with fetched products
      } catch (err) {
        setError(err.message); // Update atom state with error
      } finally {
        setLoading(false); // Update atom state to indicate loading is complete
      }
    };

    fetchProducts();
  }, [page, setLoading, setError, setProducts]); // Dependencies: page and setters

  if (loading) return <p className="text-center text-lg font-medium text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg font-medium text-red-600">Error: {error}</p>;

  return (
    <div className="space-y-8 px-2 md:px-8 lg:px-12">
      {/* Categories and Banner Section */}
      <div className="space-y-4">
        <Category />
        <ConnectBanner />
      </div>

      {/* CategoryBox Section */}
      <CategoryBox />

      {/* Product Sections */}
      <div className="space-y-12">
        <NewArrival products={products} />
        <RandomCateProduct />
        <BestDeals products={products.filter(product => product.discountPercentage > 0)} />
        <TrendingProducts products={products.filter(product => product.rating > 4.0)} />
        <FlashSales products={products.filter(product => product.discountPercentage > 18)} />
        <CustomerFavorites products={products.filter(product => product.rating >= 4.5)} />
        <EditorsPicks products={products.slice(0, 10)} />
      </div>

      {/* Top Categories and Editors' Picks */}
      <div className="grid gap-8 md:grid-cols-1">
        <TopCategories />
        
      </div>

      {/* Additional Sections */}
      <div className="space-y-8">
        <RecentlyViewed />
        <BrandExplorer />
      </div>

      {/* Closing Sections */}
      <div className="space-y-8">
        <VerifiedSeller />
        <Testimonial />
        <GetStarted />
      </div>
    </div>
  );
}

export default LandingHomePage;
