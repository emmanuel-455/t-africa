// src/App.jsx

import { Provider } from 'jotai'; // Jotai Provider for state management
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'; // Use BrowserRouter

// Importing components from their respective folders
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar';
import EmailConfirmation from './pages/EmailConfirmation/EmailConfirmation';
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import SellerDetails from './pages/SellerDetails/SellerDetails'; // Ensure this path is correct
//import LandingHomePage from './pages/LandingPage/LandingHomePage';
import SearchResults from './components/SearchResults';
import ViewCart from './pages/ViewCart/ViewCart';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import Profile from './pages/Profile/Profile';
import LandingHomePage from './pages/LandingPage/LandingHomePage';

// Layout component for consistent layout across pages
function Layout() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className="lg:px-[120px]">
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

// Main App component
function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          {/* Layout routes for pages with a consistent layout */}
          <Route element={<Layout />}>
          <Route path="/" element={<LandingHomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/verified-sellers" element={<SellerDetails />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/purchaseList" element={<ViewCart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

          {/* Routes outside the main layout (e.g., login/signup pages) */}
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/confirm-email" element={<EmailConfirmation />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
