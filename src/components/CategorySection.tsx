import { Product, Category } from '../types';
import { AbstractDots } from './AbstractShapes';
import { useLanguage } from '../context/LanguageContext';

interface CategorySectionProps {
  products: Product[];
  activeCategory: Category;
  onSelect: (category: Category) => void;
}

const CATEGORY_IMAGES: Record<string, string> = {
  'womens-clothing': 'https://images.pexels.com/photos/2220329/pexels-photo-2220329.jpeg?auto=compress&cs=tinysrgb&w=800',
  'mens-clothing': 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
  jewelry: 'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=800',
  accessories: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
};

const CATEGORY_IDS = ['womens-clothing', 'mens-clothing', 'jewelry', 'accessories'] as const;

export function CategorySection({ products, activeCategory, onSelect }: CategorySectionProps) {
  const { t } = useLanguage();

  const categoryLabels: Record<string, string> = {
    'womens-clothing': t.categories.womens,
    'mens-clothing': t.categories.mens,
    jewelry: t.categories.jewelry,
    accessories: t.categories.accessories,
  };

  const counts = CATEGORY_IDS.reduce<Record<string, number>>((acc, id) => {
    acc[id] = products.filter(p => p.category === id).length;
    return acc;
  }, {});

  return (
    <section id="categories" className="relative py-20 bg-beige-50 overflow-hidden">
      <AbstractDots className="absolute top-8 right-8 w-28 h-28" />
      <AbstractDots className="absolute bottom-8 left-8 w-20 h-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brown-300 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-brown-400 mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            ✦ {t.categories.sectionTag} ✦
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-brown-900 mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {t.categories.heading}
          </h2>
          <p className="text-brown-500 text-base" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
            {t.categories.subheading}
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-brown-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-brown-400" />
            <div className="h-px w-16 bg-brown-300" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {CATEGORY_IDS.map(id => (
            <button
              key={id}
              onClick={() => onSelect(id as Category)}
              className={`group relative rounded-2xl overflow-hidden aspect-[3/4] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                activeCategory === id ? 'ring-2 ring-brown-600 ring-offset-2' : ''
              }`}
            >
              <img
                src={CATEGORY_IMAGES[id]}
                alt={categoryLabels[id]}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/80 via-brown-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <p className="text-cream-50 font-semibold text-base leading-tight mb-1" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                  {categoryLabels[id]}
                </p>
                <p className="text-brown-300 text-xs">{counts[id]} {t.categories.items}</p>
              </div>
              {activeCategory === id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-brown-700 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onSelect('all')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-brown-700 text-cream-50'
                : 'bg-white border border-brown-300 text-brown-700 hover:bg-brown-100'
            }`}
            style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
          >
            {t.categories.filterAll}
          </button>
          {CATEGORY_IDS.map(id => (
            <button
              key={id}
              onClick={() => onSelect(id as Category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === id
                  ? 'bg-brown-700 text-cream-50'
                  : 'bg-white border border-brown-300 text-brown-700 hover:bg-brown-100'
              }`}
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              {categoryLabels[id]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
