import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { ProductGrid } from './components/ProductGrid';
import { CartSidebar } from './components/CartSidebar';
import { OrderModal } from './components/OrderModal';
import { Footer } from './components/Footer';
import { AdminPage } from './components/admin/AdminPage';
import { CartItem, Category, Product } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { useProducts } from './hooks/useProducts';

function Storefront() {
  const { products, loading, error } = useProducts();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleOrderNow = (product: Product) => {
    setSelectedProduct(product);
    setOrderOpen(true);
  };

  const handleCheckout = () => {
    setSelectedProduct(null);
    setCartOpen(false);
    setOrderOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar cartItems={cartItems} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero onShopNow={() => setOrderOpen(true)} />
        <CategorySection
          products={products}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          activeCategory={activeCategory}
          onAddToCart={handleAddToCart}
          onOrderNow={handleOrderNow}
        />
      </main>

      <Footer />

      <CartSidebar
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={id => setCartItems(prev => prev.filter(i => i.product.id !== id))}
        onUpdateQty={(id, qty) =>
          setCartItems(prev => prev.map(i => (i.product.id === id ? { ...i, quantity: qty } : i)))
        }
        onCheckout={handleCheckout}
      />

      <OrderModal
        isOpen={orderOpen}
        cartItems={cartItems}
        selectedProduct={selectedProduct}
        onClose={() => { setOrderOpen(false); setSelectedProduct(null); }}
        onSuccess={handleOrderSuccess}
      />
    </div>
  );
}

export default function App() {
  const isAdmin = window.location.pathname.startsWith('/admin');

  return (
    <LanguageProvider>
      {isAdmin ? <AdminPage /> : <Storefront />}
    </LanguageProvider>
  );
}
