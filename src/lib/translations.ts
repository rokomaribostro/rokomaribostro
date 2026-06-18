export type Lang = 'en' | 'bn';

export interface Translations {
  nav: {
    home: string;
    collections: string;
    products: string;
    contact: string;
  };
  hero: {
    sectionTag: string;
    subTagline: string;
    orderNow: string;
    browse: string;
    deliveryBadges: string[];
    langToggle: string;
  };
  categories: {
    sectionTag: string;
    heading: string;
    subheading: string;
    all: string;
    filterAll: string;
    womens: string;
    mens: string;
    jewelry: string;
    accessories: string;
    items: string;
  };
  products: {
    sectionTag: string;
    heading: string;
    countSuffix: string;
    noProducts: string;
  };
  productCategories: {
    'womens-clothing': string;
    'mens-clothing': string;
    jewelry: string;
    accessories: string;
  };
  badges: {
    Sale: string;
    New: string;
    Trending: string;
    Premium: string;
    Bridal: string;
    'Eid Special': string;
  };
  card: {
    addToCart: string;
    orderNow: string;
  };
  cart: {
    heading: string;
    itemCount: (n: number) => string;
    empty: string;
    emptySub: string;
    subtotal: string;
    deliveryNote: string;
    orderNow: string;
  };
  order: {
    heading: string;
    subheading: string;
    summaryLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    addressLabel: string;
    addressPlaceholder: string;
    productLabel: string;
    paymentLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    total: string;
    qty: string;
    deliveryBadge1: string;
    deliveryBadge2: string;
    submit: string;
    submitting: string;
    errorFill: string;
    errorFailed: string;
    successHeading: string;
    successBody: string;
    successSub: string;
    payment: {
      cash_on_delivery: string;
      bkash: string;
      nagad: string;
    };
  };
  footer: {
    categoriesHeading: string;
    contactHeading: string;
    delivery1: string;
    delivery2: string;
    cod: string;
    copyright: string;
    tagline: string;
  };
}

const en: Translations = {
  nav: {
    home: 'Home',
    collections: 'Collections',
    products: 'Products',
    contact: 'Contact',
  },
  hero: {
    sectionTag: 'Your Destination for Style',
    subTagline: 'A curated collection of clothing, jewelry & accessories',
    orderNow: 'Order Now',
    browse: 'Browse',
    deliveryBadges: ['Pathao Delivery', 'Cash on Delivery', 'bKash', 'Nagad'],
    langToggle: 'বাংলা',
  },
  categories: {
    sectionTag: 'Collections',
    heading: 'Our Collections',
    subheading: 'Browse our curated selection',
    all: 'All',
    filterAll: 'Show All',
    womens: "Women's Clothing",
    mens: "Men's Clothing",
    jewelry: 'Jewelry',
    accessories: 'Accessories',
    items: 'items',
  },
  products: {
    sectionTag: 'Products',
    heading: 'Our Products',
    countSuffix: 'products found',
    noProducts: 'No products found',
  },
  productCategories: {
    'womens-clothing': "Women's Clothing",
    'mens-clothing': "Men's Clothing",
    jewelry: 'Jewelry',
    accessories: 'Accessories',
  },
  badges: {
    Sale: 'Sale',
    New: 'New',
    Trending: 'Trending',
    Premium: 'Premium',
    Bridal: 'Bridal',
    'Eid Special': 'Eid Special',
  },
  card: {
    addToCart: 'Add to Cart',
    orderNow: 'Order Now',
  },
  cart: {
    heading: 'Your Cart',
    itemCount: (n: number) => `${n} item${n !== 1 ? 's' : ''}`,
    empty: 'Your cart is empty',
    emptySub: 'Add some products to get started',
    subtotal: 'Subtotal',
    deliveryNote: 'Delivery charges apply at checkout',
    orderNow: 'Order Now',
  },
  order: {
    heading: 'Order Now',
    subheading: 'Fill in your details to place your order',
    summaryLabel: 'Order Summary',
    nameLabel: 'Your Name',
    namePlaceholder: 'Enter your full name',
    phoneLabel: 'Mobile Number',
    phonePlaceholder: '01XXXXXXXXX',
    addressLabel: 'Delivery Address',
    addressPlaceholder: 'House/Flat No., Road, Area, District',
    productLabel: 'Product',
    paymentLabel: 'Payment Method',
    notesLabel: 'Special Notes (Optional)',
    notesPlaceholder: 'Size, colour or any other details',
    total: 'Total',
    qty: 'x',
    deliveryBadge1: 'Delivery: Pathao Courier',
    deliveryBadge2: 'Delivering all across Bangladesh',
    submit: 'Confirm Order',
    submitting: 'Placing order...',
    errorFill: 'Please fill in all required fields.',
    errorFailed: 'Something went wrong. Please try again.',
    successHeading: 'Order Placed!',
    successBody: 'Your order has been received successfully.',
    successSub: "We'll contact you soon to confirm.",
    payment: {
      cash_on_delivery: 'Cash on Delivery',
      bkash: 'bKash',
      nagad: 'Nagad',
    },
  },
  footer: {
    categoriesHeading: 'Categories',
    contactHeading: 'Contact',
    delivery1: 'Delivery: Pathao Courier',
    delivery2: 'All across Bangladesh',
    cod: 'Cash on Delivery',
    copyright: '© 2025 Rokomari Bostro — All rights reserved',
    tagline: 'Serving Bangladesh with love ♥',
  },
};

const bn: Translations = {
  nav: {
    home: 'হোম',
    collections: 'কালেকশন',
    products: 'পণ্য',
    contact: 'যোগাযোগ',
  },
  hero: {
    sectionTag: 'আপনার স্টাইলের গন্তব্য',
    subTagline: 'পোশাক, গহনা ও আনুষাঙ্গিকের এক অনন্য সংগ্রহ',
    orderNow: 'অর্ডার করুন',
    browse: 'দেখুন',
    deliveryBadges: ['পাঠাও ডেলিভারি', 'ক্যাশ অন ডেলিভারি', 'বিকাশ', 'নগদ'],
    langToggle: 'English',
  },
  categories: {
    sectionTag: 'কালেকশন',
    heading: 'আমাদের সংগ্রহ',
    subheading: 'আমাদের বিশেষ সংগ্রহ থেকে বেছে নিন',
    all: 'সব',
    filterAll: 'সব দেখুন',
    womens: 'মহিলাদের পোশাক',
    mens: 'পুরুষদের পোশাক',
    jewelry: 'গহনা',
    accessories: 'আনুষাঙ্গিক',
    items: 'টি পণ্য',
  },
  products: {
    sectionTag: 'পণ্যসমূহ',
    heading: 'আমাদের পণ্য',
    countSuffix: 'টি পণ্য পাওয়া গেছে',
    noProducts: 'কোনো পণ্য পাওয়া যায়নি',
  },
  productCategories: {
    'womens-clothing': 'মহিলাদের পোশাক',
    'mens-clothing': 'পুরুষদের পোশাক',
    jewelry: 'গহনা',
    accessories: 'আনুষাঙ্গিক',
  },
  badges: {
    Sale: 'সেল',
    New: 'নতুন',
    Trending: 'ট্রেন্ডিং',
    Premium: 'প্রিমিয়াম',
    Bridal: 'ব্রাইডাল',
    'Eid Special': 'ঈদ স্পেশাল',
  },
  card: {
    addToCart: 'কার্টে যোগ করুন',
    orderNow: 'অর্ডার করুন',
  },
  cart: {
    heading: 'আপনার কার্ট',
    itemCount: (n: number) => `${n} টি আইটেম`,
    empty: 'কার্ট খালি আছে',
    emptySub: 'পণ্য যোগ করুন',
    subtotal: 'মোট পরিমাণ',
    deliveryNote: 'ডেলিভারি চার্জ পরবর্তীতে যোগ হবে',
    orderNow: 'অর্ডার করুন',
  },
  order: {
    heading: 'অর্ডার করুন',
    subheading: 'অর্ডার ফর্ম পূরণ করুন',
    summaryLabel: 'অর্ডার সারাংশ',
    nameLabel: 'আপনার নাম',
    namePlaceholder: 'আপনার পূর্ণ নাম লিখুন',
    phoneLabel: 'মোবাইল নম্বর',
    phonePlaceholder: '০১XXXXXXXXX',
    addressLabel: 'ডেলিভারি ঠিকানা',
    addressPlaceholder: 'বাড়ি/ফ্ল্যাট নম্বর, রাস্তা, এলাকা, জেলা',
    productLabel: 'পণ্য',
    paymentLabel: 'পেমেন্ট পদ্ধতি',
    notesLabel: 'বিশেষ নোট (ঐচ্ছিক)',
    notesPlaceholder: 'সাইজ, রঙ বা অন্য কোনো তথ্য',
    total: 'মোট',
    qty: 'x',
    deliveryBadge1: 'ডেলিভারি: পাঠাও কুরিয়ার',
    deliveryBadge2: 'সারা বাংলাদেশে ডেলিভারি সুবিধা',
    submit: 'অর্ডার নিশ্চিত করুন',
    submitting: 'পাঠানো হচ্ছে...',
    errorFill: 'অনুগ্রহ করে সব তথ্য পূরণ করুন।',
    errorFailed: 'অর্ডার পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
    successHeading: 'অর্ডার সম্পন্ন!',
    successBody: 'আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।',
    successSub: 'আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
    payment: {
      cash_on_delivery: 'ক্যাশ অন ডেলিভারি',
      bkash: 'বিকাশ',
      nagad: 'নগদ',
    },
  },
  footer: {
    categoriesHeading: 'বিভাগ',
    contactHeading: 'যোগাযোগ',
    delivery1: 'ডেলিভারি: পাঠাও কুরিয়ার',
    delivery2: 'সারা বাংলাদেশে',
    cod: 'ক্যাশ অন ডেলিভারি',
    copyright: '© ২০২৫ রকমারি বস্ত্র — সর্বস্বত্ব সংরক্ষিত',
    tagline: 'ভালোবাসায় বাংলাদেশে সেবা দিচ্ছি ♥',
  },
};

export const translations: Record<Lang, Translations> = { en, bn };
