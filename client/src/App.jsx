// src/App.jsx
import React from 'react';
import { Provider } from 'jotai'; // Jotai Provider for state management
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Importing components from their respective folders
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import EmailConfirmation from './pages/EmailConfirmation/EmailConfirmation';
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Connect from './pages/Home/Home';


// Layout component for consistent layout across pages
function Layout() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
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
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>


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
