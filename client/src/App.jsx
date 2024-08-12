import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Layout component
function Layout() {
  return (
    <div className="w-full flex px-[160px] flex-col min-h-screen">
      <Navbar />
      <div>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

// App component
function App() {
  return (
    <Provider store={store}> {/* Wrap app with Redux Provider */}
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
