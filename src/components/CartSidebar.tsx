import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CartSidebarProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemove: (productId: string) => void;
  onUpdateQty: (productId: string, qty: number) => void;
  onCheckout: () => void;
}

export function CartSidebar({ isOpen, items, onClose, onRemove, onUpdateQty, onCheckout }: CartSidebarProps) {
  const { lang, t } = useLanguage();

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-brown-900/40 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-cream-50 shadow-2xl z-50 flex flex-col transition-transform duration-400 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-brown-100">
          <div>
            <h2
              className="text-xl font-semibold text-brown-900"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {t.cart.heading}
            </h2>
            <p className="text-xs text-brown-500" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
              {t.cart.itemCount(items.length)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-brown-600 hover:text-brown-900 hover:bg-brown-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-brown-400 gap-3">
              <ShoppingBag size={48} strokeWidth={1} />
              <p style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>{t.cart.empty}</p>
              <p className="text-sm text-brown-300" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                {t.cart.emptySub}
              </p>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.product.id}
                className="flex gap-3 bg-white rounded-xl p-3 shadow-sm border border-brown-50"
              >
                <img
                  src={item.product.image}
                  alt={lang === 'bn' ? item.product.nameBn : item.product.name}
                  className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium text-brown-900 leading-snug mb-2 truncate"
                    style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
                  >
                    {lang === 'bn' ? item.product.nameBn : item.product.name}
                  </p>
                  <p className="text-sm font-bold text-brown-800" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                    ৳{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQty(item.product.id, Math.max(1, item.quantity - 1))}
                        className="w-6 h-6 flex items-center justify-center border border-brown-300 rounded text-brown-700 hover:bg-brown-100 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm w-4 text-center text-brown-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-brown-300 rounded text-brown-700 hover:bg-brown-100 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="p-1 text-rose-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-brown-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-brown-600" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                {t.cart.subtotal}
              </span>
              <span className="text-xl font-bold text-brown-900" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                ৳{subtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-brown-400 text-center" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
              {t.cart.deliveryNote}
            </p>
            <button
              onClick={onCheckout}
              className="w-full btn-primary py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg"
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              {t.cart.orderNow}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
