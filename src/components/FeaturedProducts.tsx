import { Heart, ShoppingBag, Star } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useStore } from "../store/StoreContext";
import { products as allProducts, formatPrice } from "../data/products";
import type { Product } from "../data/products";

const featuredProducts = allProducts.slice(0, 8);

function ProductCard({
  product,
  index,
  isInView,
}: {
  product: Product;
  index: number;
  isInView: boolean;
}) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();

  return (
    <div
      className="group cursor-pointer transition-all duration-700"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(50px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-brand-100 aspect-[3/4] mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover img-zoom"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80&auto=format&fit=crop";
          }}
        />
        {/* Tag */}
        {product.tag && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold tracking-wider uppercase ${
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
        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <Heart
            size={18}
            className={`transition-colors duration-300 ${
              isFavorite(product.id)
                ? "fill-red-500 text-red-500"
                : "text-brand-800"
            }`}
          />
        </button>
        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full bg-brand-900/95 backdrop-blur-sm text-white py-3 flex items-center justify-center gap-2 text-sm font-medium tracking-wider uppercase hover:bg-brand-800 transition-colors duration-300"
          >
            <ShoppingBag size={16} />В корзину
          </button>
        </div>
      </div>
      {/* Info */}
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < Math.floor(product.rating)
                  ? "fill-brand-400 text-brand-400"
                  : "text-brand-200"
              }
            />
          ))}
          <span className="text-xs text-brand-500 ml-1">{product.rating}</span>
        </div>
        <h3 className="text-brand-900 font-medium text-sm group-hover:text-brand-600 transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-brand-900 font-semibold">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-brand-400 line-through text-sm">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  const { ref, isInView } = useInView(0.05);

  return (
    <section id="featured" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-brand-400 text-sm font-medium tracking-[0.3em] uppercase mb-3">
            Тщательно подобрано для вас
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-brand-900 font-bold mb-4">
            Новинки сезона
          </h2>
          <div className="w-20 h-0.5 bg-brand-400 mx-auto" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center mt-16 transition-all duration-700 delay-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="#pricelist"
            className="relative inline-flex items-center gap-3 border-2 border-brand-900 text-brand-900 px-10 py-4 text-sm font-semibold tracking-wider uppercase group overflow-hidden transition-all duration-500 hover:text-white"
          >
            <span className="absolute inset-0 bg-brand-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10">Смотреть весь каталог</span>
          </a>
        </div>
      </div>
    </section>
  );
}
