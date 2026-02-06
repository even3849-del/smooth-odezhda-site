import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { Send, Check } from "lucide-react";

export function Newsletter() {
  const { ref, isInView } = useInView(0.1);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80&auto=format&fit=crop"
          alt="Newsletter bg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-900/85" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <div
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-brand-300 text-sm font-medium tracking-[0.3em] uppercase mb-3">
            Будьте в курсе
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white font-bold mb-4">
            Подпишитесь на новости
          </h2>
          <p className="text-brand-300 mb-10 max-w-lg mx-auto leading-relaxed">
            Получайте эксклюзивные предложения, новости о коллекциях и
            вдохновение для стиля прямо на вашу почту.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`flex flex-col sm:flex-row gap-3 max-w-lg mx-auto transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <input
            type="email"
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-brand-400 transition-all duration-300 text-sm tracking-wide backdrop-blur-sm"
            required
          />
          <button
            type="submit"
            className={`px-8 py-4 text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-500 ${
              submitted
                ? "bg-green-500 text-white"
                : "bg-white text-brand-900 hover:bg-brand-100"
            }`}
          >
            {submitted ? (
              <>
                <Check size={18} /> Готово!
              </>
            ) : (
              <>
                <Send size={16} /> Подписаться
              </>
            )}
          </button>
        </form>

        <p
          className={`text-white/40 text-xs mt-6 transition-all duration-700 delay-400 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          Нажимая «Подписаться», вы соглашаетесь на получение рассылки. Отписаться можно в любой момент.
        </p>
      </div>
    </section>
  );
}
