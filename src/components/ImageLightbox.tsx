import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ImageLightboxProps {
  product: Product | null;
  products: Product[];
  onClose: () => void;
  onNavigate: (product: Product) => void;
}

export function ImageLightbox({ product, products, onClose, onNavigate }: ImageLightboxProps) {
  const { lang } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (product) {
      setLoaded(false);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, products]);

  if (!product) return null;

  const currentIndex = products.findIndex(p => p.id === product.id);

  const navigate = (dir: number) => {
    const nextIndex = (currentIndex + dir + products.length) % products.length;
    onNavigate(products[nextIndex]);
  };

  const name = lang === 'bn' ? product.nameBn : product.name;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brown-950/90 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
      >
        <X size={24} />
      </button>

      {/* Navigation arrows */}
      {products.length > 1 && (
        <>
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      {/* Image container */}
      <div className="relative z-10 max-w-5xl w-full mx-4 flex flex-col items-center">
        <div className="relative w-full flex items-center justify-center" style={{ maxHeight: '80vh' }}>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
          <img
            src={product.image}
            alt={name}
            className={`max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Product info */}
        <div className="mt-4 text-center">
          <h3 className="text-white text-lg font-medium" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
            {name}
          </h3>
          <p className="text-white/70 text-sm mt-1" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
            ৳{product.price.toLocaleString()}
          </p>
        </div>

        {/* Thumbnail strip */}
        {products.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 px-2 max-w-full">
            {products.map(p => {
              const isActive = p.id === product.id;
              const pName = lang === 'bn' ? p.nameBn : p.name;
              return (
                <button
                  key={p.id}
                  onClick={() => onNavigate(p)}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    isActive ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  title={pName}
                >
                  <img
                    src={p.image}
                    alt={pName}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
