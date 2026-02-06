import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface StoreState {
  cart: CartItem[];
  favorites: number[];
  searchOpen: boolean;
  cartOpen: boolean;
  favoritesOpen: boolean;
  checkoutOpen: boolean;
  orderComplete: boolean;
  orderNumber: string;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, qty: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  cartTotal: number;
  cartCount: number;
  setSearchOpen: (v: boolean) => void;
  setCartOpen: (v: boolean) => void;
  setFavoritesOpen: (v: boolean) => void;
  setCheckoutOpen: (v: boolean) => void;
  setOrderComplete: (v: boolean) => void;
  setOrderNumber: (v: string) => void;
}

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const addToCart = useCallback((product: Product, size?: string) => {
    const selectedSize = size || product.sizes[0];
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, size: selectedSize }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: number, size: string, qty: number) => {
      if (qty <= 0) {
        removeFromCart(productId, size);
        return;
      }
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: qty }
            : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isFavorite = useCallback(
    (productId: number) => favorites.includes(productId),
    [favorites]
  );

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        searchOpen,
        cartOpen,
        favoritesOpen,
        checkoutOpen,
        orderComplete,
        orderNumber,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        isFavorite,
        cartTotal,
        cartCount,
        setSearchOpen,
        setCartOpen,
        setFavoritesOpen,
        setCheckoutOpen,
        setOrderComplete,
        setOrderNumber,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
