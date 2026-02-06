import { useEffect } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { formatPrice } from "../data/products";

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    setCheckoutOpen,
  } = useStore();

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const delivery = cartTotal >= 15000 ? 0 : 590;
  const total = cartTotal + delivery;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-[90] transition-opacity duration-500 ${
          cartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[95] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-200">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-brand-700" />
            <h2 className="font-playfair text-xl font-bold text-brand-900">
              Корзина
            </h2>
            <span className="bg-brand-100 text-brand-600 text-xs font-semibold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-10 h-10 flex items-center justify-center hover:bg-brand-100 rounded-full transition-colors"
          >
            <X size={20} className="text-brand-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <ShoppingBag size={64} className="text-brand-200 mb-4" />
              <h3 className="font-playfair text-xl text-brand-900 font-semibold mb-2">
                Корзина пуста
              </h3>
              <p className="text-brand-500 text-sm">
                Добавьте товары, чтобы оформить заказ
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 p-3 bg-brand-50 group hover:bg-brand-100 transition-colors duration-300"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-28 object-cover shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80&auto=format&fit=crop";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-brand-900 font-medium text-sm truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-brand-500 text-xs mt-0.5">
                      Размер: {item.size}
                    </p>
                    <p className="text-brand-900 font-semibold text-sm mt-1">
                      {formatPrice(item.product.price)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-brand-200">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-brand-100 transition-colors"
                        >
                          <Minus size={14} className="text-brand-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-brand-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-brand-100 transition-colors"
                        >
                          <Plus size={14} className="text-brand-600" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-brand-900 font-semibold text-sm">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.size)
                          }
                          className="text-brand-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-brand-200 p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-brand-600">Подытог</span>
                <span className="text-brand-900 font-medium">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-600">Доставка</span>
                <span className={`font-medium ${delivery === 0 ? "text-green-600" : "text-brand-900"}`}>
                  {delivery === 0 ? "Бесплатно" : formatPrice(delivery)}
                </span>
              </div>
              {delivery > 0 && (
                <p className="text-xs text-brand-400">
                  Бесплатная доставка от {formatPrice(15000)}
                </p>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-brand-200">
                <span className="text-brand-900">Итого</span>
                <span className="text-brand-900">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCartOpen(false);
                setTimeout(() => setCheckoutOpen(true), 300);
              }}
              className="w-full bg-brand-900 text-white py-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wider uppercase hover:bg-brand-700 transition-colors group"
            >
              Оформить заказ
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
