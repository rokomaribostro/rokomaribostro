import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { AbstractArc } from './AbstractShapes';
import { useLanguage } from '../context/LanguageContext';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string;
  activeCategory: Category;
  onAddToCart: (product: Product) => void;
  onOrderNow: (product: Product) => void;
  onImageClick: (product: Product) => void;
}

export function ProductGrid({ products, loading, error, activeCategory, onAddToCart, onOrderNow, onImageClick }: ProductGridProps) {
  const { t } = useLanguage();

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="relative py-20 bg-cream-50 overflow-hidden">
      <AbstractArc className="absolute -bottom-10 -left-10 w-64 h-64 opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-brown-400 mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            ✦ {t.products.sectionTag} ✦
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-brown-900 mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {t.products.heading}
          </h2>
          {!loading && !error && (
            <p className="text-brown-500 text-sm" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
              {filtered.length} {t.products.countSuffix}
            </p>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20 text-brown-400">
            <Loader2 size={32} className="animate-spin" />
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-rose-500 py-10">{error}</p>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onOrderNow={onOrderNow}
                  onImageClick={onImageClick}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-brown-400">
                <p className="text-4xl mb-3">✦</p>
                <p style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>{t.products.noProducts}</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
