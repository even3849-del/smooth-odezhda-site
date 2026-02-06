import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { useStore } from "../store/StoreContext";
import { products, formatPrice, categories } from "../data/products";
import { Heart, ShoppingBag, Star, Filter, Grid3X3, List, ArrowUpDown } from "lucide-react";

type SortBy = "default" | "price-asc" | "price-desc" | "rating" | "name";

export function PriceList() {
  const { ref, isInView } = useInView(0.05);
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const [selectedCat, setSelectedCat] = useState("Все");
  const [sortBy, setSortBy] = useState<SortBy>("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showSizes, setShowSizes] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<Record<number, string>>({});

  let filtered = products.filter(
    (p) => selectedCat === "Все" || p.category === selectedCat
  );

  switch (sortBy) {
    case "price-asc":
      filtered = [...filtered].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered = [...filtered].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
      break;
    case "name":
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  const handleAddToCart = (product: typeof products[0]) => {
    const size = selectedSize[product.id] || product.sizes[0];
    addToCart(product, size);
    setShowSizes(null);
  };

  return (
    <section id="pricelist" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-brand-400 text-sm font-medium tracking-[0.3em] uppercase mb-3">
            Полный ассортимент
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-brand-900 font-bold mb-4">
            Каталог и цены
          </h2>
          <div className="w-20 h-0.5 bg-brand-400 mx-auto" />
        </div>

        {/* Filters Bar */}
        <div
          className={`mb-8 transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                  selectedCat === cat
                    ? "bg-brand-900 text-white"
                    : "bg-brand-100 text-brand-600 hover:bg-brand-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & View */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-brand-500" />
              <span className="text-brand-500 text-sm">
                {filtered.length} товаров
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="flex items-center gap-1.5">
                <ArrowUpDown size={14} className="text-brand-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="text-sm text-brand-700 bg-transparent border-none outline-none cursor-pointer"
                >
                  <option value="default">По умолчанию</option>
                  <option value="price-asc">Цена: по возрастанию</option>
                  <option value="price-desc">Цена: по убыванию</option>
                  <option value="rating">По рейтингу</option>
                  <option value="name">По названию</option>
                </select>
              </div>

              {/* View mode */}
              <div className="hidden sm:flex items-center border border-brand-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-brand-900 text-white"
                      : "text-brand-500 hover:bg-brand-100"
                  }`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-brand-900 text-white"
                      : "text-brand-500 hover:bg-brand-100"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="group cursor-pointer transition-all duration-700"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${Math.min(i * 80, 600)}ms`,
                }}
              >
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
                  {product.oldPrice && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5">
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-9 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
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
                  {/* Quick add */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    {showSizes === product.id ? (
                      <div className="bg-white p-3 shadow-lg animate-[fadeInUp_0.2s_ease-out]">
                        <p className="text-xs text-brand-600 mb-2 font-medium">
                          Выберите размер:
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSize({
                                  ...selectedSize,
                                  [product.id]: size,
                                });
                              }}
                              className={`px-2 py-1 text-xs border transition-colors ${
                                (selectedSize[product.id] || product.sizes[0]) === size
                                  ? "bg-brand-900 text-white border-brand-900"
                                  : "border-brand-300 text-brand-700 hover:border-brand-500"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="w-full bg-brand-900 text-white py-2 text-xs font-medium hover:bg-brand-700 transition-colors"
                        >
                          Добавить
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowSizes(product.id);
                        }}
                        className="w-full bg-brand-900/95 backdrop-blur-sm text-white py-2.5 flex items-center justify-center gap-2 text-xs font-medium tracking-wider uppercase hover:bg-brand-800 transition-colors"
                      >
                        <ShoppingBag size={14} />
                        В корзину
                      </button>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={10}
                        className={
                          j < Math.floor(product.rating)
                            ? "fill-brand-400 text-brand-400"
                            : "text-brand-200"
                        }
                      />
                    ))}
                    <span className="text-xs text-brand-500 ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <p className="text-brand-500 text-[10px] uppercase tracking-wider">
                    {product.category}
                  </p>
                  <h3 className="text-brand-900 font-medium text-sm group-hover:text-brand-600 transition-colors truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-900 font-bold">
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-brand-400 text-xs line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="space-y-3">
            {/* Table header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-brand-100 text-xs font-semibold text-brand-700 uppercase tracking-wider">
              <div className="col-span-1"></div>
              <div className="col-span-3">Товар</div>
              <div className="col-span-2">Категория</div>
              <div className="col-span-1">Рейтинг</div>
              <div className="col-span-1">Размеры</div>
              <div className="col-span-2 text-right">Цена</div>
              <div className="col-span-2 text-right">Действия</div>
            </div>

            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="grid grid-cols-12 gap-4 items-center px-4 py-3 bg-brand-50 hover:bg-brand-100 transition-all duration-300 group"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateX(0)" : "translateX(-30px)",
                  transitionDelay: `${Math.min(i * 60, 500)}ms`,
                  transitionDuration: "600ms",
                }}
              >
                <div className="col-span-3 md:col-span-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-20 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80&auto=format&fit=crop";
                    }}
                  />
                </div>
                <div className="col-span-9 md:col-span-3">
                  <h3 className="text-brand-900 font-medium text-sm">
                    {product.name}
                  </h3>
                  {product.tag && (
                    <span
                      className={`inline-block mt-1 px-1.5 py-0.5 text-[9px] font-semibold tracking-wider uppercase ${
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
                  <p className="text-brand-500 text-xs mt-1 md:hidden">
                    {product.category}
                  </p>
                </div>
                <div className="hidden md:block col-span-2 text-brand-600 text-sm">
                  {product.category}
                </div>
                <div className="hidden md:flex col-span-1 items-center gap-1">
                  <Star
                    size={12}
                    className="fill-brand-400 text-brand-400"
                  />
                  <span className="text-brand-700 text-sm">{product.rating}</span>
                </div>
                <div className="hidden md:block col-span-1 text-brand-600 text-xs">
                  {product.sizes.join(", ")}
                </div>
                <div className="col-span-6 md:col-span-2 text-right">
                  <span className="text-brand-900 font-bold">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="block text-brand-400 text-xs line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                <div className="col-span-6 md:col-span-2 flex justify-end gap-2">
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="w-9 h-9 flex items-center justify-center border border-brand-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                  >
                    <Heart
                      size={14}
                      className={
                        isFavorite(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-brand-600"
                      }
                    />
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-1.5 bg-brand-900 text-white px-3 py-2 text-xs font-medium hover:bg-brand-700 transition-colors"
                  >
                    <ShoppingBag size={12} />
                    <span className="hidden sm:inline">В корзину</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
