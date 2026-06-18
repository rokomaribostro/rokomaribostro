import { useState } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { CartItem, Product, OrderFormData } from '../types';
import { submitOrder } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';

interface OrderModalProps {
  isOpen: boolean;
  cartItems: CartItem[];
  selectedProduct: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function OrderModal({ isOpen, cartItems, selectedProduct, onClose, onSuccess }: OrderModalProps) {
  const { lang, t } = useLanguage();

  const [form, setForm] = useState<OrderFormData>({
    customerName: '',
    phone: '',
    address: '',
    paymentMethod: 'cash_on_delivery',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const items = selectedProduct
    ? [{ product: selectedProduct, quantity: 1 }]
    : cartItems;

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const productSummary = items
    .map(i => `${lang === 'bn' ? i.product.nameBn : i.product.name} x${i.quantity}`)
    .join(', ');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName || !form.phone || !form.address) {
      setError(t.order.errorFill);
      return;
    }
    setError('');
    setLoading(true);
    try {
      for (const item of items) {
        await submitOrder({
          customer_name: form.customerName,
          phone: form.phone,
          address: form.address,
          product_name: `${item.product.nameBn} (${item.product.name})`,
          product_id: item.product.id,
          quantity: item.quantity,
          payment_method: form.paymentMethod,
          total_price: item.product.price * item.quantity,
          notes: form.notes || undefined,
        });
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setForm({ customerName: '', phone: '', address: '', paymentMethod: 'cash_on_delivery', notes: '' });
        onSuccess();
        onClose();
      }, 3000);
    } catch {
      setError(t.order.errorFailed);
    } finally {
      setLoading(false);
    }
  };

  const paymentOptions = [
    { value: 'cash_on_delivery' as const },
    { value: 'bkash' as const },
    { value: 'nagad' as const },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brown-900/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-cream-50 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-cream-50 rounded-t-3xl border-b border-brown-100 px-6 pt-6 pb-4 z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2
                className="text-2xl font-semibold text-brown-900"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {t.order.heading}
              </h2>
              <p className="text-sm text-brown-500" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                {t.order.subheading}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-brown-500 hover:text-brown-800 hover:bg-brown-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={36} className="text-green-600" />
            </div>
            <h3
              className="text-2xl font-semibold text-brown-900 mb-2"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {t.order.successHeading}
            </h3>
            <p className="text-brown-600 mb-1" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
              {t.order.successBody}
            </p>
            <p className="text-sm text-brown-400" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
              {t.order.successSub}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
            {/* Order Summary */}
            <div className="bg-beige-100 rounded-2xl p-4 border border-brown-100">
              <p
                className="text-xs text-brown-500 uppercase tracking-wide mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {t.order.summaryLabel}
              </p>
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between items-start py-1.5 border-b border-brown-100 last:border-0">
                  <div>
                    <p className="text-sm text-brown-800 font-medium" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                      {lang === 'bn' ? item.product.nameBn : item.product.name}
                    </p>
                    <p className="text-xs text-brown-400">{t.order.qty}{item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-brown-800" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                    ৳{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-semibold text-brown-700" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                  {t.order.total}
                </span>
                <span className="text-base font-bold text-brown-900" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                  ৳{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                {t.order.nameLabel} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={form.customerName}
                onChange={e => setForm({ ...form, customerName: e.target.value })}
                placeholder={t.order.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-brown-200 bg-white focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 placeholder-brown-300 text-sm transition-all"
                style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                {t.order.phoneLabel} <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder={t.order.phonePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-brown-200 bg-white focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 placeholder-brown-300 text-sm transition-all"
                style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                {t.order.addressLabel} <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                placeholder={t.order.addressPlaceholder}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-brown-200 bg-white focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 placeholder-brown-300 text-sm transition-all resize-none"
                style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
                required
              />
            </div>

            {/* Product (read-only summary) */}
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                {t.order.productLabel}
              </label>
              <div className="w-full px-4 py-3 rounded-xl border border-brown-100 bg-beige-100 text-brown-700 text-sm" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                {productSummary}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-2" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                {t.order.paymentLabel} <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {paymentOptions.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm({ ...form, paymentMethod: opt.value })}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-all duration-200 ${
                      form.paymentMethod === opt.value
                        ? 'border-brown-700 bg-brown-700 text-cream-50'
                        : 'border-brown-200 bg-white text-brown-700 hover:border-brown-400'
                    }`}
                  >
                    <p className="text-xs font-semibold" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                      {t.order.payment[opt.value]}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                {t.order.notesLabel}
              </label>
              <input
                type="text"
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                placeholder={t.order.notesPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-brown-200 bg-white focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 placeholder-brown-300 text-sm transition-all"
                style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
              />
            </div>

            {error && (
              <p className="text-rose-500 text-sm text-center" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                {error}
              </p>
            )}

            {/* Delivery info */}
            <div className="bg-brown-50 rounded-xl p-3 text-xs text-brown-500 space-y-1" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
              <p>🚚 {t.order.deliveryBadge1}</p>
              <p>📍 {t.order.deliveryBadge2}</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {t.order.submitting}
                </>
              ) : (
                t.order.submit
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
