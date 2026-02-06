import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Search, Heart } from "lucide-react";
import { useStore } from "../store/StoreContext";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    cartCount,
    favorites,
    setSearchOpen,
    setCartOpen,
    setFavoritesOpen,
  } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Главная", href: "#hero" },
    { label: "Коллекции", href: "#categories" },
    { label: "Новинки", href: "#featured" },
    { label: "Каталог", href: "#pricelist" },
    { label: "О нас", href: "#about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="font-playfair text-2xl md:text-3xl font-bold tracking-wider animate-slide-down"
            style={{ color: scrolled ? "#4a3522" : "#fff" }}
          >
            ÉLÉGANCE
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:opacity-70 opacity-0-init animate-slide-down delay-${
                  (i + 1) * 100
                }`}
                style={{ color: scrolled ? "#4a3522" : "#fff" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 animate-slide-down delay-300">
            <button
              onClick={() => setSearchOpen(true)}
              className="transition-all duration-300 hover:scale-110"
              style={{ color: scrolled ? "#4a3522" : "#fff" }}
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setFavoritesOpen(true)}
              className="relative transition-all duration-300 hover:scale-110 hidden sm:block"
              style={{ color: scrolled ? "#4a3522" : "#fff" }}
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative transition-all duration-300 hover:scale-110"
              style={{ color: scrolled ? "#4a3522" : "#fff" }}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="lg:hidden ml-2 transition-all duration-300 hover:scale-110"
              style={{ color: scrolled ? "#4a3522" : "#fff" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center py-6 gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-brand-800 text-sm font-medium tracking-wide uppercase hover:text-brand-500 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              setFavoritesOpen(true);
            }}
            className="text-brand-800 text-sm font-medium tracking-wide uppercase hover:text-brand-500 transition-colors duration-300 flex items-center gap-2"
          >
            <Heart size={16} />
            Избранное
            {favorites.length > 0 && (
              <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
