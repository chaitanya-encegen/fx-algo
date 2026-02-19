import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";


import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
// import Preloader from "./components/Preloader";

/* USER COMPONENTS */
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";
import Reviews from "./components/Reviews";
import Terms from "./components/Terms";
import GlobalProfit from "./components/GlobalProfit";
import Brokers from "./components/Brokers";
import ProductDetail from "./components/ProductDetail";
import NextLevel from "./components/NextLevel";

/* USER PAGES */
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Purchases from "./pages/Purchases";

/* ADMIN */
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProducts from "./components/admin/AdminProducts";
import CEOSection from "./components/CEOSection";
import AdminOrders from "./pages/AdminOrders";
import CustomCursor from "./components/CustomCursor";
import About from "./pages/About";
import AdminSettings from "./components/admin/AdminSettings";
import AdminTestimonials from "./components/admin/AdminTestimonials";
import AdminUsers from "./components/admin/AdminUsers";
import AdminUserDetail from "./components/admin/AdminUserDetail";




/* HOME */
function Home() {
  return (
    <>
    
      <Hero />
      <Products />
      <Testimonials />
      <Reviews />
      <GlobalProfit />
      <Brokers />
       <CustomCursor />
      <NextLevel />
      <CEOSection/>
      <Terms />
    </>
  );
}

/* 🔐 USER GUARD */
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

/* 🔐 ADMIN GUARD */
function AdminRoute({ children }) {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}

/* ROUTES */
function AppRoutes() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />

<Route path="/products" element={<Products />} />
<Route path="/about" element={<About />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER (PROTECTED) */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchases"
          element={
            <ProtectedRoute>
              <Purchases />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <AdminSettings />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/testimonials"
          element={
            <AdminRoute>
              <AdminTestimonials />
            </AdminRoute>
          }
        />
        <Route
  path="/admin/users"
  element={
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  }
/>

<Route
  path="/admin/users/:id"
  element={
    <AdminRoute>
      <AdminUserDetail />
    </AdminRoute>
  }
/>


        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default function App() {
 
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* {loading && <Preloader onComplete={() => setLoading(false)} />} */}

      {/* {!loading && ( */}
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <AppRoutes />
              <CustomCursor />
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      {/* )} */}
    </>
  );
}

