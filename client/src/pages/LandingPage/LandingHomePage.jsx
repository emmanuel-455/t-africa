import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { productsAtom, loadingAtom, errorAtom } from '../../redux/Store';
import ConnectBanner from '../../components/ConnectPageComponents/ConnectBanner';
import ConnectFeatured from '../../components/ConnectPageComponents/ConnectFeatured';
import TopSeller from '../../components/TopSeller';
import VerifiedSeller from '../../components/VerifiedSeller';
import Testimonial from '../../components/Testimonial';
import GetStarted from '../../components/GetStarted';
import LandingNavbar from '../../components/ConnectPageComponents/LandingNavbar';

function LandingHomePage() {
  const [products, setProducts] = useAtom(productsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [page, setPage] = React.useState(1); // State to manage pagination

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
        setError(err.message);  // Update atom state with error
      } finally {
        setLoading(false);  // Update atom state to indicate loading is complete
      }
    };

    fetchProducts();
  }, [page, setLoading, setError, setProducts]); // Dependencies: page and setters

  return (
    <div>
      <ConnectBanner />
      <ConnectFeatured />
      <TopSeller products={products} />
      <VerifiedSeller />
      <Testimonial />
      <GetStarted />
    </div>
  );
}

export default LandingHomePage;
