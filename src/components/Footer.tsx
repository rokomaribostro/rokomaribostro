import { Facebook, Instagram } from 'lucide-react';
import { AbstractDots } from './AbstractShapes';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/share/1EDpY1fBWv/',
      icon: <Facebook size={18} />,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/rokomaribostro?igsh=MWozZW56NDNjbmE3Yg==',
      icon: <Instagram size={18} />,
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@rokomari.bostro?_r=1&_t=ZS-93pJQqsQENx',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.73a4.85 4.85 0 0 1-1-.04z" />
        </svg>
      ),
    },
    {
      label: 'Threads',
      href: 'https://www.threads.com/@rokomaribostro',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068v-.136C1.5 8.413 2.35 5.559 3.995 3.509 5.845 1.205 8.598.024 12.186 0h.014c2.746.018 5.143.8 7.006 2.26 1.818 1.424 2.996 3.471 3.294 5.895l-2.87.38c-.217-1.771-1.074-3.253-2.453-4.276-1.377-1.023-3.147-1.556-5.127-1.569h-.014c-2.686.017-4.928.957-6.494 2.72C4.08 7.212 3.21 9.478 3.21 12.068v.136c0 2.59.87 4.856 2.449 6.658 1.566 1.763 3.808 2.703 6.494 2.72h.014c2.434-.016 4.24-.676 5.555-2.02 1.448-1.48 1.944-3.594 1.944-6.258v-.164c-.014-1.396-.272-2.506-.77-3.304-.518-.83-1.334-1.423-2.426-1.758.354 2.57.018 4.598-1.003 6.04-1.042 1.47-2.74 2.23-4.962 2.23-1.646 0-3.014-.494-3.953-1.43-.96-.958-1.427-2.298-1.351-3.774.072-1.394.612-2.579 1.566-3.424.938-.832 2.22-1.285 3.713-1.307.63-.01 1.258.044 1.887.163-.09-.508-.243-.936-.465-1.277-.43-.66-1.1-.997-2.084-.997-1.105 0-1.915.434-2.36 1.217l-2.437-1.35c.86-1.546 2.539-2.467 4.797-2.467 1.766 0 3.173.51 4.18 1.51.824.822 1.33 2.003 1.487 3.47.245-.036.494-.054.743-.054 2.254 0 3.847.907 4.735 2.694.702 1.413.987 3.213.987 5.626v.164c0 3.174-.683 5.726-2.614 7.7-1.795 1.831-4.327 2.762-7.33 2.78h-.007z"/>
        </svg>
      ),
    },
  ];

  const categoryLinks = [
    { key: 'womens-clothing' as const, label: t.categories.womens },
    { key: 'mens-clothing' as const, label: t.categories.mens },
    { key: 'jewelry' as const, label: t.categories.jewelry },
    { key: 'accessories' as const, label: t.categories.accessories },
  ];

  return (
    <footer id="contact" className="relative bg-brown-900 text-cream-100 overflow-hidden">
      <AbstractDots className="absolute top-8 left-8 w-24 h-24 opacity-20 invert" />
      <AbstractDots className="absolute bottom-8 right-8 w-20 h-20 opacity-10 invert" />

      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/Untitled_Project.jpg"
                alt="Rokomari Bostro"
                className="w-12 h-12 rounded-full object-cover border-2 border-brown-600"
              />
              <p
                className="text-xl font-semibold text-cream-50"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Rokomari Bostro
              </p>
            </div>
            <p
              className="text-brown-300 text-sm leading-relaxed"
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              {t.hero.subTagline}
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 flex items-center justify-center bg-brown-800 hover:bg-brown-700 text-cream-200 rounded-full transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Category Links */}
          <div>
            <h3
              className="text-sm font-semibold text-cream-100 mb-4 uppercase tracking-widest"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {t.footer.categoriesHeading}
            </h3>
            <ul className="space-y-2.5">
              {categoryLinks.map(item => (
                <li key={item.key}>
                  <a
                    href="#categories"
                    className="text-brown-300 hover:text-cream-100 text-sm transition-colors"
                    style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Delivery */}
          <div>
            <h3
              className="text-sm font-semibold text-cream-100 mb-4 uppercase tracking-widest"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {t.footer.contactHeading}
            </h3>
            <div className="space-y-2 text-sm text-brown-300" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
              <p>📧 rokomaribostro@gmail.com</p>
              <p className="mt-4">🚚 {t.footer.delivery1}</p>
              <p>📍 {t.footer.delivery2}</p>
              <p>💳 {t.footer.cod}</p>
              <p>📱 bKash · Nagad</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brown-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-brown-500">
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>{t.footer.copyright}</p>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
