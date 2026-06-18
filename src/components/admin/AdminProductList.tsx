import { useState } from 'react';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';

interface AdminProductListProps {
  products: any[];
  loading: boolean;
  onEdit: (product: any) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, active: boolean) => void;
}

export function AdminProductList({ products, loading, onEdit, onDelete, onToggleActive }: AdminProductListProps) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const categories = ['all', 'womens-clothing', 'mens-clothing', 'jewelry', 'accessories'];
  const categoryLabels: Record<string, string> = {
    'womens-clothing': "Women's",
    'mens-clothing': "Men's",
    jewelry: 'Jewelry',
    accessories: 'Accessories',
  };

  const filtered = products.filter(p => {
    const matchCat = filter === 'all' || p.category === filter;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.name_bn.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === cat
                  ? 'bg-brown-700 text-cream-50'
                  : 'bg-white border border-brown-300 text-brown-700 hover:bg-brown-100'
              }`}
            >
              {cat === 'all' ? 'All' : categoryLabels[cat]}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 px-4 py-2 rounded-xl border border-brown-200 bg-white text-sm text-brown-900 focus:outline-none focus:ring-2 focus:ring-brown-400"
        />
      </div>

      {/* Product list */}
      <div className="bg-white rounded-2xl border border-brown-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-brown-400">Loading products...</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-brown-400">No products found.</div>
        ) : (
          <div className="divide-y divide-brown-100">
            {filtered.map(product => (
              <div key={product.id} className={`flex items-center gap-3 p-4 hover:bg-cream-50 transition-colors ${!product.active ? 'opacity-60' : ''}`}>
                <img src={product.image_url} alt={product.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-brown-100" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-brown-900 truncate">{product.name}</p>
                    {product.badge && (
                      <span className="px-2 py-0.5 bg-brown-100 text-brown-700 text-xs rounded-full flex-shrink-0">{product.badge}</span>
                    )}
                  </div>
                  <p className="text-xs text-brown-500 truncate">{product.name_bn}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-brown-600">৳{product.price}</span>
                    <span className="text-xs text-brown-400">{categoryLabels[product.category] || product.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${product.active ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'}`}>
                      {product.active ? 'Active' : 'Hidden'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onToggleActive(product.id, !product.active)}
                    className="p-2 text-brown-500 hover:text-brown-800 hover:bg-brown-100 rounded-lg transition-colors"
                    title={product.active ? 'Hide' : 'Show'}
                  >
                    {product.active ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 text-brown-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="p-2 text-rose-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
