import { useState, useEffect, useRef } from "react";
import { Search, X, Heart, ShoppingBag, Star } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { products, formatPrice, categories } from "../data/products";

export function SearchModal() {
  const { searchOpen, setSearchOpen, addToCart, toggleFavorite, isFavorite } = useStore();
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("Все");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen]);

  const filtered = products.filter((p) => {
    const matchQuery =
      query === "" ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    const matchCat = selectedCat === "Все" || p.category === selectedCat;
    return matchQuery && matchCat;
  });

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeInUp_0.3s_ease-out]"
        onClick={() => setSearchOpen(false)}
      />

      {/* Content */}
      <div className="relative z-10 bg-white w-full max-h-full flex flex-col animate-[slideDown_0.4s_ease-out]">
        {/* Search bar */}
        <div className="border-b border-brand-200">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <Search size={24} className="text-brand-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по названию, категории..."
                className="flex-1 text-xl md:text-2xl font-light text-brand-900 placeholder-brand-300 outline-none bg-transparent"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="w-10 h-10 flex items-center justify-center hover:bg-brand-100 rounded-full transition-colors"
              >
                <X size={24} className="text-brand-600" />
              </button>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                    selectedCat === cat
                      ? "bg-brand-900 text-white"
                      : "bg-brand-100 text-brand-600 hover:bg-brand-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <p className="text-brand-500 text-sm mb-6">
              {filtered.length > 0
                ? `Найдено: ${filtered.length} товаров`
                : "Ничего не найдено"}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden bg-brand-100 aspect-[3/4] mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80&auto=format&fit=crop";
                      }}
                    />
                    {product.tag && (
                      <span
                        className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                          product.tag === "Sale"
                            ? "bg-red-500 text-white"
                            : product.tag === "New"
                            ? "bg-brand-900 text-white"
                            : "bg-brand-400 text-white"
                        }`}
                      >
                        {product.tag}
                      </span>
                    )}
                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Heart
                          size={14}
                          className={
                            isFavorite(product.id)
                              ? "fill-red-500 text-red-500"
                              : "text-brand-800"
                          }
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <ShoppingBag size={14} className="text-brand-800" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className={
                          i < Math.floor(product.rating)
                            ? "fill-brand-400 text-brand-400"
                            : "text-brand-200"
                        }
                      />
                    ))}
                  </div>
                  <h3 className="text-brand-900 text-xs font-medium truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-brand-900 text-sm font-semibold">
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-brand-400 text-xs line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
