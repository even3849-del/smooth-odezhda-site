import { useState, useEffect } from "react";
import {
  X,
  MapPin,
  CreditCard,
  Check,
  ChevronLeft,
  Package,
  Truck,
  Shield,
  Banknote,
  Smartphone,
  ArrowRight,
  Copy,
  CheckCheck,
  Sparkles,
} from "lucide-react";
import { useStore } from "../store/StoreContext";
import { formatPrice } from "../data/products";

type Step = "address" | "payment" | "confirm" | "done";

const paymentMethods = [
  {
    id: "card",
    name: "Банковская карта",
    desc: "Visa, MasterCard, МИР",
    icon: CreditCard,
    fields: ["cardNumber", "cardExpiry", "cardCvv", "cardName"],
  },
  {
    id: "sbp",
    name: "Система быстрых платежей",
    desc: "СБП — оплата по QR",
    icon: Smartphone,
    fields: [],
  },
  {
    id: "cash",
    name: "Наличные при получении",
    desc: "Оплата курьеру",
    icon: Banknote,
    fields: [],
  },
];

export function CheckoutModal() {
  const {
    cart,
    cartTotal,
    checkoutOpen,
    setCheckoutOpen,
    clearCart,
    setOrderComplete,
    orderNumber,
    setOrderNumber,
  } = useStore();

  const [step, setStep] = useState<Step>("address");
  const [copied, setCopied] = useState(false);

  // Address fields
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    city: "",
    street: "",
    building: "",
    apartment: "",
    zip: "",
    comment: "",
  });

  // Payment fields
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });

  const delivery = cartTotal >= 15000 ? 0 : 590;
  const total = cartTotal + delivery;

  useEffect(() => {
    if (checkoutOpen) {
      document.body.style.overflow = "hidden";
      setStep("address");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [checkoutOpen]);

  const handlePlaceOrder = () => {
    const num = "ÉLG-" + Math.random().toString(36).substr(2, 8).toUpperCase();
    setOrderNumber(num);
    setOrderComplete(true);
    setStep("done");
    clearCart();
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    setOrderComplete(false);
    setStep("address");
  };

  const formatCardNumber = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    }
    return cleaned;
  };

  const isAddressValid =
    address.name && address.phone && address.city && address.street && address.building;

  const isPaymentValid =
    selectedPayment !== "card" ||
    (cardData.cardNumber.replace(/\s/g, "").length >= 16 &&
      cardData.cardExpiry.length >= 5 &&
      cardData.cardCvv.length >= 3 &&
      cardData.cardName.length > 2);

  if (!checkoutOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-[scaleIn_0.4s_ease-out] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-200 bg-brand-50">
          <div className="flex items-center gap-3">
            {step !== "address" && step !== "done" && (
              <button
                onClick={() =>
                  setStep(step === "confirm" ? "payment" : "address")
                }
                className="w-8 h-8 flex items-center justify-center hover:bg-brand-200 rounded-full transition-colors"
              >
                <ChevronLeft size={18} className="text-brand-600" />
              </button>
            )}
            <h2 className="font-playfair text-lg font-bold text-brand-900">
              {step === "address" && "Адрес доставки"}
              {step === "payment" && "Способ оплаты"}
              {step === "confirm" && "Подтверждение заказа"}
              {step === "done" && "Заказ оформлен!"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-brand-200 rounded-full transition-colors"
          >
            <X size={18} className="text-brand-600" />
          </button>
        </div>

        {/* Steps Indicator */}
        {step !== "done" && (
          <div className="px-6 py-3 bg-brand-50 border-b border-brand-100">
            <div className="flex items-center gap-2">
              {(["address", "payment", "confirm"] as Step[]).map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step === s
                        ? "bg-brand-900 text-white"
                        : (["address", "payment", "confirm"].indexOf(step) > i)
                        ? "bg-green-500 text-white"
                        : "bg-brand-200 text-brand-500"
                    }`}
                  >
                    {["address", "payment", "confirm"].indexOf(step) > i ? (
                      <Check size={14} />
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < 2 && (
                    <div
                      className={`flex-1 h-0.5 transition-colors duration-300 ${
                        ["address", "payment", "confirm"].indexOf(step) > i
                          ? "bg-green-500"
                          : "bg-brand-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Address */}
          {step === "address" && (
            <div className="space-y-4 animate-[fadeInUp_0.3s_ease-out]">
              <div className="flex items-center gap-2 text-brand-600 text-sm mb-4">
                <MapPin size={16} />
                <span>Укажите адрес доставки</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-brand-700 mb-1 uppercase tracking-wider">
                    Имя и фамилия *
                  </label>
                  <input
                    type="text"
                    value={address.name}
                    onChange={(e) =>
                      setAddress({ ...address, name: e.target.value })
                    }
                    placeholder="Иван Иванов"
                    className="w-full px-4 py-3 border border-brand-200 text-sm text-brand-900 placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-700 mb-1 uppercase tracking-wider">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) =>
                      setAddress({ ...address, phone: e.target.value })
                    }
                    placeholder="+7 (999) 123-45-67"
                    className="w-full px-4 py-3 border border-brand-200 text-sm text-brand-900 placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-brand-700 mb-1 uppercase tracking-wider">
                    Город *
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    placeholder="Москва"
                    className="w-full px-4 py-3 border border-brand-200 text-sm text-brand-900 placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-700 mb-1 uppercase tracking-wider">
                    Индекс
                  </label>
                  <input
                    type="text"
                    value={address.zip}
                    onChange={(e) =>
                      setAddress({ ...address, zip: e.target.value })
                    }
                    placeholder="101000"
                    className="w-full px-4 py-3 border border-brand-200 text-sm text-brand-900 placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-brand-700 mb-1 uppercase tracking-wider">
                  Улица *
                </label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  placeholder="ул. Тверская"
                  className="w-full px-4 py-3 border border-brand-200 text-sm text-brand-900 placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-brand-700 mb-1 uppercase tracking-wider">
                    Дом *
                  </label>
                  <input
                    type="text"
                    value={address.building}
                    onChange={(e) =>
                      setAddress({ ...address, building: e.target.value })
                    }
                    placeholder="15"
                    className="w-full px-4 py-3 border border-brand-200 text-sm text-brand-900 placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-700 mb-1 uppercase tracking-wider">
                    Квартира
                  </label>
                  <input
                    type="text"
                    value={address.apartment}
                    onChange={(e) =>
                      setAddress({ ...address, apartment: e.target.value })
                    }
                    placeholder="42"
                    className="w-full px-4 py-3 border border-brand-200 text-sm text-brand-900 placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-brand-700 mb-1 uppercase tracking-wider">
                  Комментарий
                </label>
                <textarea
                  value={address.comment}
                  onChange={(e) =>
                    setAddress({ ...address, comment: e.target.value })
                  }
                  placeholder="Код домофона, этаж и т.д."
                  rows={3}
                  className="w-full px-4 py-3 border border-brand-200 text-sm text-brand-900 placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                />
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 text-blue-800 text-xs mt-2">
                <Truck size={18} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Доставка 2-3 рабочих дня</p>
                  <p>
                    {delivery === 0
                      ? "Бесплатная доставка для вашего заказа!"
                      : `Стоимость доставки: ${formatPrice(delivery)}. Бесплатно от ${formatPrice(15000)}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === "payment" && (
            <div className="space-y-4 animate-[fadeInUp_0.3s_ease-out]">
              <div className="flex items-center gap-2 text-brand-600 text-sm mb-4">
                <CreditCard size={16} />
                <span>Выберите способ оплаты</span>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id}>
                    <button
                      onClick={() => setSelectedPayment(method.id)}
                      className={`w-full flex items-center gap-4 p-4 border-2 transition-all duration-300 text-left ${
                        selectedPayment === method.id
                          ? "border-brand-900 bg-brand-50"
                          : "border-brand-200 hover:border-brand-400"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${
                          selectedPayment === method.id
                            ? "bg-brand-900 text-white"
                            : "bg-brand-100 text-brand-600"
                        }`}
                      >
                        <method.icon size={22} />
                      </div>
                      <div className="flex-1">
                        <p className="text-brand-900 font-semibold text-sm">
                          {method.name}
                        </p>
                        <p className="text-brand-500 text-xs">{method.desc}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedPayment === method.id
                            ? "border-brand-900 bg-brand-900"
                            : "border-brand-300"
                        }`}
                      >
                        {selectedPayment === method.id && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                    </button>

                    {/* Card Fields */}
                    {method.id === "card" && selectedPayment === "card" && (
                      <div className="mt-3 p-4 bg-brand-50 border border-brand-200 border-t-0 space-y-3 animate-[fadeInUp_0.3s_ease-out]">
                        <div>
                          <label className="block text-xs font-medium text-brand-700 mb-1 uppercase tracking-wider">
                            Номер карты
                          </label>
                          <input
                            type="text"
                            value={cardData.cardNumber}
                            onChange={(e) =>
                              setCardData({
                                ...cardData,
                                cardNumber: formatCardNumber(e.target.value),
                              })
                            }
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            className="w-full px-4 py-3 border border-brand-200 text-sm text-brand-900 placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors bg-white font-mono tracking-wider"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-brand-700 mb-1 uppercase tracking-wider">
                              Срок
                            </label>
                            <input
                              type="text"
                              value={cardData.cardExpiry}
                              onChange={(e) =>
                                setCardData({
                                  ...cardData,
                                  cardExpiry: formatExpiry(e.target.value),
                                })
                              }
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full px-4 py-3 border border-brand-200 text-sm text-brand-900 placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors bg-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-brand-700 mb-1 uppercase tracking-wider">
                              CVV
                            </label>
                            <input
                              type="password"
                              value={cardData.cardCvv}
                              onChange={(e) =>
                                setCardData({
                                  ...cardData,
                                  cardCvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                                })
                              }
                              placeholder="•••"
                              maxLength={3}
                              className="w-full px-4 py-3 border border-brand-200 text-sm text-brand-900 placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors bg-white font-mono"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-brand-700 mb-1 uppercase tracking-wider">
                            Имя на карте
                          </label>
                          <input
                            type="text"
                            value={cardData.cardName}
                            onChange={(e) =>
                              setCardData({
                                ...cardData,
                                cardName: e.target.value.toUpperCase(),
                              })
                            }
                            placeholder="IVAN IVANOV"
                            className="w-full px-4 py-3 border border-brand-200 text-sm text-brand-900 placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors bg-white font-mono uppercase"
                          />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-brand-500">
                          <Shield size={14} />
                          Данные защищены шифрованием SSL
                        </div>
                      </div>
                    )}

                    {/* SBP QR */}
                    {method.id === "sbp" && selectedPayment === "sbp" && (
                      <div className="mt-3 p-6 bg-brand-50 border border-brand-200 border-t-0 text-center animate-[fadeInUp_0.3s_ease-out]">
                        <div className="w-40 h-40 mx-auto mb-3 bg-white border-2 border-brand-200 flex items-center justify-center">
                          <div className="grid grid-cols-5 gap-1 p-3">
                            {Array.from({ length: 25 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-4 h-4 ${
                                  Math.random() > 0.35
                                    ? "bg-brand-900"
                                    : "bg-transparent"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-brand-600 text-xs">
                          Отсканируйте QR-код в приложении банка
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === "confirm" && (
            <div className="space-y-6 animate-[fadeInUp_0.3s_ease-out]">
              {/* Order Summary */}
              <div>
                <h3 className="text-sm font-semibold text-brand-900 uppercase tracking-wider mb-3">
                  Состав заказа
                </h3>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex items-center gap-3 p-2 bg-brand-50"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-18 object-cover shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-brand-900 text-sm font-medium truncate">
                          {item.product.name}
                        </p>
                        <p className="text-brand-500 text-xs">
                          Размер: {item.size} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-brand-900 font-semibold text-sm shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address Summary */}
              <div className="p-4 bg-brand-50 border border-brand-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-brand-600" />
                  <h3 className="text-sm font-semibold text-brand-900 uppercase tracking-wider">
                    Адрес доставки
                  </h3>
                </div>
                <p className="text-brand-700 text-sm">
                  {address.name}, {address.phone}
                </p>
                <p className="text-brand-600 text-sm">
                  {address.zip && `${address.zip}, `}г. {address.city}, {address.street}, д.{" "}
                  {address.building}
                  {address.apartment && `, кв. ${address.apartment}`}
                </p>
                {address.comment && (
                  <p className="text-brand-500 text-xs mt-1 italic">
                    {address.comment}
                  </p>
                )}
              </div>

              {/* Payment Summary */}
              <div className="p-4 bg-brand-50 border border-brand-200">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard size={14} className="text-brand-600" />
                  <h3 className="text-sm font-semibold text-brand-900 uppercase tracking-wider">
                    Способ оплаты
                  </h3>
                </div>
                <p className="text-brand-700 text-sm">
                  {paymentMethods.find((m) => m.id === selectedPayment)?.name}
                </p>
                {selectedPayment === "card" && cardData.cardNumber && (
                  <p className="text-brand-500 text-xs mt-1">
                    •••• •••• •••• {cardData.cardNumber.slice(-4)}
                  </p>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-brand-200">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-600">
                    Товары ({cart.reduce((s, i) => s + i.quantity, 0)} шт.)
                  </span>
                  <span className="text-brand-900">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-600">Доставка</span>
                  <span className={delivery === 0 ? "text-green-600" : "text-brand-900"}>
                    {delivery === 0 ? "Бесплатно" : formatPrice(delivery)}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-3 border-t border-brand-200">
                  <span className="text-brand-900">К оплате</span>
                  <span className="text-brand-900">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Done */}
          {step === "done" && (
            <div className="text-center py-8 animate-[scaleIn_0.5s_ease-out]">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles size={36} className="text-green-600" />
              </div>
              <h3 className="font-playfair text-3xl text-brand-900 font-bold mb-3">
                Заказ оформлен!
              </h3>
              <p className="text-brand-600 mb-6 max-w-sm mx-auto">
                Спасибо за покупку! Мы уже начали собирать ваш заказ. 
                Ожидайте доставку через 2-3 рабочих дня.
              </p>

              <div className="inline-flex items-center gap-3 bg-brand-50 border border-brand-200 px-6 py-3 mb-6">
                <Package size={18} className="text-brand-600" />
                <span className="text-brand-900 font-mono font-bold text-lg">
                  {orderNumber}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(orderNumber);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="ml-2 hover:scale-110 transition-transform"
                >
                  {copied ? (
                    <CheckCheck size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} className="text-brand-500" />
                  )}
                </button>
              </div>

              <div className="space-y-3 max-w-xs mx-auto">
                <div className="flex items-center gap-3 text-left text-sm p-3 bg-blue-50">
                  <Truck size={18} className="text-blue-600 shrink-0" />
                  <span className="text-blue-800">
                    Трек-номер придёт на {address.phone || "ваш телефон"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-left text-sm p-3 bg-green-50">
                  <Shield size={18} className="text-green-600 shrink-0" />
                  <span className="text-green-800">
                    Гарантия возврата 14 дней
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step !== "done" && (
          <div className="border-t border-brand-200 p-4 bg-brand-50">
            {step === "address" && (
              <button
                onClick={() => setStep("payment")}
                disabled={!isAddressValid}
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wider uppercase transition-all group ${
                  isAddressValid
                    ? "bg-brand-900 text-white hover:bg-brand-700"
                    : "bg-brand-200 text-brand-400 cursor-not-allowed"
                }`}
              >
                Далее: Оплата
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            )}
            {step === "payment" && (
              <button
                onClick={() => setStep("confirm")}
                disabled={!isPaymentValid}
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wider uppercase transition-all group ${
                  isPaymentValid
                    ? "bg-brand-900 text-white hover:bg-brand-700"
                    : "bg-brand-200 text-brand-400 cursor-not-allowed"
                }`}
              >
                Далее: Подтверждение
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            )}
            {step === "confirm" && (
              <button
                onClick={handlePlaceOrder}
                className="w-full py-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wider uppercase bg-green-600 text-white hover:bg-green-700 transition-colors group"
              >
                <Check size={16} />
                Подтвердить и оплатить {formatPrice(total)}
              </button>
            )}
          </div>
        )}

        {step === "done" && (
          <div className="border-t border-brand-200 p-4 bg-brand-50">
            <button
              onClick={handleClose}
              className="w-full py-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wider uppercase bg-brand-900 text-white hover:bg-brand-700 transition-colors"
            >
              Продолжить покупки
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
