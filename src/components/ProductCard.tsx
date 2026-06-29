import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onOrderNow: (product: Product) => void;
  onImageClick: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onOrderNow, onImageClick }: ProductCardProps) {
  const { lang, t } = useLanguage();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const name = lang === 'bn' ? product.nameBn : product.name;
  const categoryLabel = t.productCategories[product.category];
  const badgeLabel = product.badge
    ? (t.badges as Record<string, string>)[product.badge] ?? product.badge
    : null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-brown-100">
      {/* Image */}
      <div
        className="relative overflow-hidden aspect-[3/4] cursor-zoom-in"
        onClick={() => onImageClick(product)}
      >
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {badgeLabel && (
            <span className="px-2.5 py-1 bg-brown-700 text-cream-50 text-xs font-medium rounded-full">
              {badgeLabel}
            </span>
          )}
          {discount && (
            <span className="px-2.5 py-1 bg-rose-500 text-white text-xs font-bold rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-brown-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 bg-white text-brown-800 px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-cream-100 transition-colors shadow-md"
            style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
          >
            <ShoppingCart size={14} />
            {t.card.addToCart}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-brown-400 mb-0.5" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
          {categoryLabel}
        </p>
        <h3
          className="text-sm font-semibold text-brown-900 mb-3 leading-snug"
          style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
        >
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-brown-800" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
            ৳{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-brown-400 line-through">
              ৳{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.sizes.map(size => (
              <span
                key={size}
                className="px-2 py-0.5 border border-brown-200 text-brown-600 text-xs rounded"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        {/* Order Now Button */}
        <button
          onClick={() => onOrderNow(product)}
          className="w-full btn-primary py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
        >
          {t.card.orderNow}
        </button>
      </div>
    </div>
  );
}
