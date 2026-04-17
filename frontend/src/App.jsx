import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerRegister from './pages/SellerRegister';
import AdminDashboard from './pages/AdminDashboard';
import SellerDashboard from './pages/SellerDashboard';
import Unauthorized from './pages/Unauthorized';
import Wishlist from './pages/Wishlist';

// Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Guards
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function DashboardRedirect() {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user?.role === 'seller') {
    return <Navigate to="/seller/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
}

import Navbar from './components/Navbar';

import FlashSale from './pages/FlashSale';
import Cart from './pages/Cart';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <Navbar />
              <main className="min-h-screen">
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/flash-sale" element={<FlashSale />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:category" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/seller-register" element={<SellerRegister />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/wishlist" element={<Wishlist />} />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/seller"
                element={
                  <ProtectedRoute allowedRoles={['seller']}>
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seller/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['seller']}>
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'seller']}>
                    <DashboardRedirect />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'seller', 'shopper']}>
                    <DashboardRedirect />
                  </ProtectedRoute>
                }
              />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
