export interface Product {
  id: string;
  name: string;
  nameBn: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'womens-clothing' | 'mens-clothing' | 'jewelry' | 'accessories';
  description: string;
  descriptionBn: string;
  sizes?: string[];
  colors?: string[];
  badge?: string;
  badgeBn?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface OrderFormData {
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: 'cash_on_delivery' | 'bkash' | 'nagad';
  notes: string;
}

export type Category = 'all' | 'womens-clothing' | 'mens-clothing' | 'jewelry' | 'accessories';
