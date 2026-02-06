import { useEffect, useState, useRef } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useStore } from "../store/StoreContext";

export function CartToast() {
  const { cartCount } = useStore();
  const [show, setShow] = useState(false);
  const prevCount = useRef(cartCount);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (cartCount > prevCount.current) {
      setShow(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShow(false), 2500);
    }
    prevCount.current = cartCount;
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [cartCount]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] transition-all duration-500 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 bg-brand-900 text-white px-6 py-3 shadow-2xl">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <Check size={16} />
        </div>
        <span className="text-sm font-medium">Товар добавлен в корзину</span>
        <div className="flex items-center gap-1 ml-2 pl-3 border-l border-white/20">
          <ShoppingBag size={14} />
          <span className="text-sm font-bold">{cartCount}</span>
        </div>
      </div>
    </div>
  );
}
