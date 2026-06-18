import { useState, useEffect } from 'react';
import { supabase, adminSignOut } from '../../lib/supabase';
import { useAdminProducts } from '../../hooks/useProducts';
import { AdminProductList } from './AdminProductList';
import { ProductForm } from './ProductForm';
import { LogOut, Plus, Package, ShoppingBag } from 'lucide-react';

export function AdminPanel() {
  const { products, loading, error, fetchAll, createProduct, updateProduct, deleteProduct } = useAdminProducts();
  const [editTarget, setEditTarget] = useState<Record<string, any> | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [view, setView] = useState<'products' | 'orders'>('products');
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (view === 'orders') loadOrders();
  }, [view]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(''), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const loadOrders = async () => {
    setOrdersLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    setOrders(data || []);
    setOrdersLoading(false);
  };

  const handleSave = async (data: Record<string, any>) => {
    setIsSaving(true);
    try {
      if (editTarget) {
        await updateProduct(editTarget.id, data);
        setToast('Product updated!');
      } else {
        await createProduct(data);
        setToast('Product added!');
      }
      await fetchAll();
      setFormOpen(false);
      setEditTarget(null);
    } catch (err) {
      setToast('Error: ' + (err instanceof Error ? err.message : 'Failed'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      await fetchAll();
      setToast('Product deleted.');
    } catch {
      setToast('Failed to delete.');
    }
  };

  const handleToggleActive = async (id: string, active: boolean) => {
    try {
      await updateProduct(id, { active });
      await fetchAll();
      setToast(active ? 'Product is now visible.' : 'Product is now hidden.');
    } catch {
      setToast('Update failed.');
    }
  };

  const handleSignOut = async () => {
    await adminSignOut();
    window.location.reload();
  };

  const paymentLabel: Record<string, string> = {
    cash_on_delivery: 'COD',
    bkash: 'bKash',
    nagad: 'Nagad',
  };

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-brown-900 text-cream-100 flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-brown-800">
          <div className="flex items-center gap-2 mb-1">
            <img src="/Untitled_Project.jpg" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            <p className="text-sm font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Rokomari Bostro</p>
          </div>
          <p className="text-xs text-brown-400 ml-10" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <button
            onClick={() => setView('products')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${view === 'products' ? 'bg-brown-700 text-cream-50' : 'text-brown-300 hover:bg-brown-800 hover:text-cream-100'}`}
          >
            <Package size={16} /> Products
          </button>
          <button
            onClick={() => setView('orders')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${view === 'orders' ? 'bg-brown-700 text-cream-50' : 'text-brown-300 hover:bg-brown-800 hover:text-cream-100'}`}
          >
            <ShoppingBag size={16} /> Orders
          </button>
        </nav>
        <div className="p-3 border-t border-brown-800 space-y-1">
          <a href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-brown-300 hover:bg-brown-800 hover:text-cream-100 transition-colors">
            ← View Store
          </a>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-400 hover:bg-brown-800 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Products view */}
        {view === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-brown-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Products</h1>
                <p className="text-sm text-brown-500 mt-0.5">{products.length} total products</p>
              </div>
              <button
                onClick={() => { setEditTarget(null); setFormOpen(true); }}
                className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              >
                <Plus size={16} /> Add Product
              </button>
            </div>

            {error && <p className="text-rose-500 text-sm mb-4">{error}</p>}

            <AdminProductList
              products={products}
              loading={loading}
              onEdit={p => { setEditTarget(p); setFormOpen(true); }}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
            />
          </div>
        )}

        {/* Orders view */}
        {view === 'orders' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-brown-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Orders</h1>
                <p className="text-sm text-brown-500 mt-0.5">All customer orders</p>
              </div>
              <button onClick={loadOrders} className="px-4 py-2 border border-brown-300 rounded-xl text-sm text-brown-700 hover:bg-brown-100 transition-colors">
                Refresh
              </button>
            </div>
            {ordersLoading ? (
              <p className="text-brown-400 text-sm">Loading orders...</p>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 text-brown-400">
                <ShoppingBag size={40} strokeWidth={1} className="mx-auto mb-3" />
                <p>No orders yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-brown-100 divide-y divide-brown-100">
                {orders.map(order => (
                  <div key={order.id} className="p-4 hover:bg-cream-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <p className="text-sm font-semibold text-brown-900">{order.customer_name}</p>
                          <span className="px-2 py-0.5 text-xs bg-brown-100 text-brown-700 rounded-full">
                            {paymentLabel[order.payment_method] || order.payment_method}
                          </span>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-brown-500 truncate">{order.product_name} × {order.quantity}</p>
                        <p className="text-xs text-brown-400 mt-0.5">{order.phone} · {order.address}</p>
                        {order.notes && <p className="text-xs text-brown-400 italic mt-0.5">"{order.notes}"</p>}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-brown-800">৳{order.total_price}</p>
                        <p className="text-xs text-brown-400 mt-1">{new Date(order.created_at).toLocaleDateString('en-BD')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Product form modal */}
      {formOpen && (
        <ProductForm
          product={editTarget}
          onSave={handleSave}
          onCancel={() => { setFormOpen(false); setEditTarget(null); }}
          isSaving={isSaving}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-brown-800 text-cream-50 px-5 py-3 rounded-xl shadow-lg text-sm z-50 animate-fade-in" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
          {toast}
        </div>
      )}
    </div>
  );
}
