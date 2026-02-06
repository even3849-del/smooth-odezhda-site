import { useInView } from "../hooks/useInView";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Анна Петрова",
    role: "Блогер",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop",
    text: "Обожаю ÉLÉGANCE! Качество тканей невероятное, а каждое платье сидит идеально. Это мой любимый бренд уже 3 года.",
    rating: 5,
  },
  {
    name: "Мария Козлова",
    role: "Дизайнер интерьеров",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop",
    text: "Нашла здесь идеальный тренч, который ищу уже давно. Доставка была молниеносной, а упаковка — просто произведение искусства.",
    rating: 5,
  },
  {
    name: "Екатерина Смирнова",
    role: "Предприниматель",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop",
    text: "Костюмы от ÉLÉGANCE — это что-то особенное. Чувствую себя уверенно на любой деловой встрече. Рекомендую всем!",
    rating: 5,
  },
];

export function Testimonials() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-24 bg-brand-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-brand-400 text-sm font-medium tracking-[0.3em] uppercase mb-3">
            Отзывы
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-brand-900 font-bold mb-4">
            Наши клиенты
          </h2>
          <div className="w-20 h-0.5 bg-brand-400 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-white p-8 relative group hover:shadow-xl transition-all duration-500"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${i * 150}ms`,
                transitionDuration: "700ms",
              }}
            >
              <Quote
                size={40}
                className="text-brand-200 mb-4 group-hover:text-brand-300 transition-colors duration-500"
              />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="fill-brand-400 text-brand-400"
                  />
                ))}
              </div>
              <p className="text-brand-700 leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-brand-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-brand-900 font-semibold text-sm">
                    {t.name}
                  </p>
                  <p className="text-brand-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
