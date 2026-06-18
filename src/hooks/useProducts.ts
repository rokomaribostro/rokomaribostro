import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error: err } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });

      if (err) throw err;

      const mapped: Product[] = (data || []).map(row => ({
        id: row.id,
        name: row.name,
        nameBn: row.name_bn,
        price: Number(row.price),
        originalPrice: row.original_price ? Number(row.original_price) : undefined,
        image: row.image_url,
        category: row.category,
        description: row.description,
        descriptionBn: row.description_bn,
        sizes: row.sizes || [],
        colors: row.colors || [],
        badge: row.badge || undefined,
        badgeBn: row.badge_bn || undefined,
      }));

      setProducts(mapped);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
}

export function useAdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error: err } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });
      if (err) throw err;
      setProducts(data || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: Record<string, any>) => {
    const { data, error: err } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    if (err) throw err;
    return data;
  };

  const updateProduct = async (id: string, updates: Record<string, any>) => {
    const { data, error: err } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (err) throw err;
    return data;
  };

  const deleteProduct = async (id: string) => {
    const { error: err } = await supabase.from('products').delete().eq('id', id);
    if (err) throw err;
  };

  return { products, loading, error, fetchAll, createProduct, updateProduct, deleteProduct };
}
