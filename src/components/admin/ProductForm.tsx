import { useState, useEffect, useRef } from 'react';
import { X, Upload, ImageIcon, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ProductFormProps {
  product?: Record<string, any> | null;
  onSave: (data: Record<string, any>) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const CATEGORIES = [
  { value: 'womens-clothing', label: "Women's Clothing" },
  { value: 'mens-clothing', label: "Men's Clothing" },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'accessories', label: 'Accessories' },
];

const BADGE_OPTIONS = ['Sale', 'New', 'Trending', 'Premium', 'Bridal', 'Eid Special'];

function getPublicUrl(path: string) {
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
}

export function ProductForm({ product, onSave, onCancel, isSaving }: ProductFormProps) {
  const [form, setForm] = useState<Record<string, any>>({
    name: '',
    name_bn: '',
    price: '',
    original_price: '',
    image_url: '',
    category: 'womens-clothing',
    description: '',
    description_bn: '',
    sizes: '',
    colors: '',
    badge: '',
    badge_bn: '',
    active: true,
    sort_order: 0,
  });
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        price: product.price ? String(product.price) : '',
        original_price: product.original_price ? String(product.original_price) : '',
        sizes: (product.sizes || []).join(', '),
        colors: (product.colors || []).join(', '),
        badge: product.badge || '',
        badge_bn: product.badge_bn || '',
      });
    }
  }, [product]);

  const handleChange = (key: string, val: any) => {
    setForm(prev => ({ ...prev, [key]: val }));
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Only image files (JPG, PNG, WebP, GIF) are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB.');
      return;
    }

    setUploading(true);
    setError('');

    const ext = file.name.split('.').pop() || 'jpg';
    const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: upError } = await supabase.storage
      .from('product-images')
      .upload(path, file, { cacheControl: '3600', upsert: false });

    if (upError) {
      setError('Upload failed: ' + upError.message);
      setUploading(false);
      return;
    }

    const publicUrl = getPublicUrl(path);
    handleChange('image_url', publicUrl);
    setUploading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.name_bn.trim() || !form.price || !form.image_url.trim()) {
      setError('Please fill in Name, Bangla Name, Price, and upload an Image.');
      return;
    }

    const sizesArr = form.sizes
      ? String(form.sizes).split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];
    const colorsArr = form.colors
      ? String(form.colors).split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];

    const payload: Record<string, any> = {
      name: form.name.trim(),
      name_bn: form.name_bn.trim(),
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      image_url: form.image_url.trim(),
      category: form.category,
      description: form.description?.trim() || '',
      description_bn: form.description_bn?.trim() || '',
      sizes: sizesArr,
      colors: colorsArr,
      badge: form.badge?.trim() || null,
      badge_bn: form.badge_bn?.trim() || null,
      active: form.active,
      sort_order: Number(form.sort_order) || 0,
    };

    onSave(payload);
  };

  const isEditing = !!product;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brown-900/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-brown-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-brown-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onCancel} className="p-2 text-brown-500 hover:text-brown-800 hover:bg-brown-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5">Product Name (English)</label>
              <input
                type="text" value={form.name} onChange={e => handleChange('name', e.target.value)}
                placeholder="e.g. Floral Embroidered Kameez"
                className="w-full px-4 py-2.5 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5">Product Name (Bangla)</label>
              <input
                type="text" value={form.name_bn} onChange={e => handleChange('name_bn', e.target.value)}
                placeholder="e.g. ফ্লোরাল এমব্রয়ডারি কামিজ"
                className="w-full px-4 py-2.5 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 text-sm"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5">Price (৳)</label>
              <input
                type="number" value={form.price} onChange={e => handleChange('price', e.target.value)}
                placeholder="1200"
                className="w-full px-4 py-2.5 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 text-sm"
                required min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5">Original Price (৳) — Optional</label>
              <input
                type="number" value={form.original_price} onChange={e => handleChange('original_price', e.target.value)}
                placeholder="1500"
                className="w-full px-4 py-2.5 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 text-sm"
                min={0}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-brown-800 mb-1.5">Product Image</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative w-full rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                dragOver
                  ? 'border-brown-500 bg-brown-50'
                  : form.image_url
                    ? 'border-green-300 bg-green-50/30'
                    : 'border-brown-200 bg-cream-50 hover:border-brown-400 hover:bg-brown-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 size={28} className="animate-spin text-brown-500" />
                  <p className="text-sm text-brown-600">Uploading image...</p>
                </div>
              ) : form.image_url ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full h-40 rounded-xl overflow-hidden border border-brown-200">
                    <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <ImageIcon size={16} />
                    <span className="text-sm font-medium">Image uploaded</span>
                  </div>
                  <p className="text-xs text-brown-400">Click or drag to replace</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload size={28} className="text-brown-400" />
                  <p className="text-sm text-brown-600 font-medium">Click or drag image here</p>
                  <p className="text-xs text-brown-400">JPG, PNG, WebP, GIF up to 5MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Category & Sort Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5">Category</label>
              <select
                value={form.category} onChange={e => handleChange('category', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 text-sm"
              >
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5">Sort Order</label>
              <input
                type="number" value={form.sort_order} onChange={e => handleChange('sort_order', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 text-sm"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <label className="block text-sm font-medium text-brown-800 mb-1.5">Description (English)</label>
            <textarea
              value={form.description} onChange={e => handleChange('description', e.target.value)}
              rows={2} placeholder="Short description of the product..."
              className="w-full px-4 py-2.5 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-800 mb-1.5">Description (Bangla)</label>
            <textarea
              value={form.description_bn} onChange={e => handleChange('description_bn', e.target.value)}
              rows={2} placeholder="পণ্যের সংক্ষিপ্ত বিবরণ..."
              className="w-full px-4 py-2.5 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 text-sm resize-none"
            />
          </div>

          {/* Sizes & Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5">Sizes (comma-separated)</label>
              <input
                type="text" value={form.sizes} onChange={e => handleChange('sizes', e.target.value)}
                placeholder="S, M, L, XL, XXL"
                className="w-full px-4 py-2.5 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5">Colors (comma-separated)</label>
              <input
                type="text" value={form.colors} onChange={e => handleChange('colors', e.target.value)}
                placeholder="Beige, White, Pink"
                className="w-full px-4 py-2.5 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 text-sm"
              />
            </div>
          </div>

          {/* Badge */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5">Badge (English)</label>
              <select
                value={form.badge} onChange={e => handleChange('badge', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 text-sm"
              >
                <option value="">None</option>
                {BADGE_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brown-800 mb-1.5">Badge (Bangla)</label>
              <input
                type="text" value={form.badge_bn} onChange={e => handleChange('badge_bn', e.target.value)}
                placeholder="e.g. সেল, নতুন"
                className="w-full px-4 py-2.5 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 text-sm"
              />
            </div>
          </div>

          {/* Active toggle */}
          <div className="flex items-center gap-3">
            <input
              id="active" type="checkbox" checked={form.active}
              onChange={e => handleChange('active', e.target.checked)}
              className="w-4 h-4 accent-brown-700"
            />
            <label htmlFor="active" className="text-sm text-brown-800" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
              Active (visible on store)
            </label>
          </div>

          {error && (
            <p className="text-rose-500 text-sm text-center" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit" disabled={isSaving || uploading}
              className="flex-1 btn-primary py-3 rounded-xl font-semibold text-sm disabled:opacity-60"
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              {isSaving ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
            </button>
            <button
              type="button" onClick={onCancel}
              className="px-6 py-3 rounded-xl border border-brown-300 text-brown-700 text-sm font-medium hover:bg-brown-100 transition-colors"
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
