import { useEffect } from "react";
import { X, Heart, ShoppingBag, Star, Trash2 } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { products, formatPrice } from "../data/products";

export function FavoritesDrawer() {
  const {
    favorites,
    favoritesOpen,
    setFavoritesOpen,
    toggleFavorite,
    addToCart,
  } = useStore();

  const favProducts = products.filter((p) => favorites.includes(p.id));

  useEffect(() => {
    if (favoritesOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [favoritesOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-[90] transition-opacity duration-500 ${
          favoritesOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setFavoritesOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[95] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          favoritesOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-200">
          <div className="flex items-center gap-3">
            <Heart size={20} className="text-red-500 fill-red-500" />
            <h2 className="font-playfair text-xl font-bold text-brand-900">
              Избранное
            </h2>
            <span className="bg-brand-100 text-brand-600 text-xs font-semibold px-2 py-0.5 rounded-full">
              {favProducts.length}
            </span>
          </div>
          <button
            onClick={() => setFavoritesOpen(false)}
            className="w-10 h-10 flex items-center justify-center hover:bg-brand-100 rounded-full transition-colors"
          >
            <X size={20} className="text-brand-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {favProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <Heart
                size={64}
                className="text-brand-200 mb-4"
              />
              <h3 className="font-playfair text-xl text-brand-900 font-semibold mb-2">
                Пока пусто
              </h3>
              <p className="text-brand-500 text-sm">
                Нажмите на сердечко, чтобы добавить товар в избранное
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {favProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-brand-50 hover:bg-brand-100 transition-colors duration-300 group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-32 object-cover shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80&auto=format&fit=crop";
                    }}
                  />
                  <div className="flex-1 min-w-0">
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
                    <h3 className="text-brand-900 font-medium text-sm mb-1 truncate">
                      {product.name}
                    </h3>
                    <p className="text-brand-500 text-xs mb-2">
                      {product.category}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-brand-900 font-semibold text-sm">
                        {formatPrice(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-brand-400 text-xs line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-1.5 bg-brand-900 text-white px-3 py-1.5 text-xs font-medium hover:bg-brand-700 transition-colors"
                      >
                        <ShoppingBag size={12} />
                        В корзину
                      </button>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="flex items-center gap-1.5 border border-brand-300 text-brand-600 px-3 py-1.5 text-xs font-medium hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={12} />
                        Убрать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {favProducts.length > 0 && (
          <div className="border-t border-brand-200 p-4">
            <button
              onClick={() => {
                favProducts.forEach((p) => addToCart(p));
                setFavoritesOpen(false);
              }}
              className="w-full bg-brand-900 text-white py-3 flex items-center justify-center gap-2 text-sm font-semibold tracking-wider uppercase hover:bg-brand-700 transition-colors"
            >
              <ShoppingBag size={16} />
              Добавить всё в корзину
            </button>
          </div>
        )}
      </div>
    </>
  );
}
