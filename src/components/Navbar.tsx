import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { CartItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  cartItems: CartItem[];
  onCartOpen: () => void;
}

export function Navbar({ cartItems, onCartOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.collections, href: '#categories' },
    { label: t.nav.products, href: '#products' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream-50 shadow-sm border-b border-brown-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/Untitled_Project.jpg"
              alt="Rokomari Bostro"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover shadow-sm group-hover:shadow-md transition-shadow"
            />
            <p
              className="text-base md:text-lg font-semibold text-brown-800 tracking-wide"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Rokomari Bostro
            </p>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-brown-600 hover:text-brown-900 transition-colors text-sm font-medium tracking-wide"
                style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCartOpen}
              className="relative p-2 text-brown-700 hover:text-brown-900 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={22} />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brown-700 text-cream-50 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-brown-700"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream-50 border-t border-brown-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-brown-700 hover:text-brown-900 py-2 border-b border-brown-100 text-sm"
                style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
