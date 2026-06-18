import { useLanguage } from '../context/LanguageContext';
import { AbstractArc, AbstractDots, AbstractPetal } from './AbstractShapes';

interface HeroProps {
  onShopNow: () => void;
}

export function Hero({ onShopNow }: HeroProps) {
  const { t, toggle } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-50"
    >
      {/* Abstract BG shapes */}
      <AbstractArc className="absolute top-10 left-10 w-48 h-48 md:w-72 md:h-72" />
      <AbstractPetal className="absolute bottom-10 right-10 w-56 h-56 md:w-96 md:h-96" />
      <AbstractDots className="absolute top-1/3 right-1/4 w-24 h-24" />
      <AbstractDots className="absolute bottom-1/4 left-1/4 w-20 h-20" />

      <div
        className="absolute top-0 right-0 w-72 h-72 md:w-[500px] md:h-[500px] rounded-bl-full opacity-10"
        style={{ background: 'radial-gradient(ellipse at top right, #7B4E3D, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-56 h-56 md:w-80 md:h-80 rounded-tr-full opacity-10"
        style={{ background: 'radial-gradient(ellipse at bottom left, #C4A097, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Language toggle — anchored to hero */}
      <div className="absolute top-24 right-5 md:top-28 md:right-8 z-20">
        <button
          onClick={toggle}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-brown-400 bg-white/80 backdrop-blur-sm text-brown-700 text-sm font-semibold shadow-sm hover:bg-brown-100 hover:border-brown-600 transition-all duration-200"
          style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
          aria-label="Switch language"
        >
          <span className="text-xs opacity-60">🌐</span>
          {t.hero.langToggle}
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-24 pb-16">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-brown-200 opacity-30 blur-xl scale-110" />
            <img
              src="/Untitled_Project.jpg"
              alt="Rokomari Bostro"
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-lg border-4 border-cream-100"
            />
          </div>
        </div>

        {/* Tag line */}
        <p
          className="text-xs md:text-sm tracking-[0.3em] uppercase text-brown-400 mb-3"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          ✦ {t.hero.sectionTag} ✦
        </p>

        {/* Main heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-light text-brown-900 mb-2 leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Rokomari
        </h1>
        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-semibold text-brown-700 mb-6 italic leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Bostro
        </h1>

        {/* Sub tagline */}
        <p
          className="text-base md:text-lg text-brown-500 mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
        >
          {t.hero.subTagline}
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-16 bg-brown-300" />
          <div className="w-2 h-2 rounded-full bg-brown-400" />
          <div className="h-px w-16 bg-brown-300" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onShopNow}
            className="btn-primary px-10 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {t.hero.orderNow}
          </button>
          <a
            href="#categories"
            className="px-8 py-3.5 rounded-full border border-brown-400 text-brown-700 text-sm font-medium tracking-widest uppercase hover:bg-brown-100 transition-all duration-300"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {t.hero.browse}
          </a>
        </div>

        {/* Delivery badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {t.hero.deliveryBadges.map(badge => (
            <span
              key={badge}
              className="px-4 py-1.5 bg-white/70 backdrop-blur-sm border border-brown-200 rounded-full text-xs text-brown-600 font-medium"
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <div className="w-px h-8 bg-brown-400 opacity-50" />
        <div className="w-1.5 h-1.5 rounded-full bg-brown-400 opacity-50" />
      </div>
    </section>
  );
}
