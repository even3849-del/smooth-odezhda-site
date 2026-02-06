import { useInView } from "../hooks/useInView";
import { Leaf, Award, Truck, Sparkles } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Экологичность",
    desc: "Используем только натуральные и переработанные материалы, заботясь о планете.",
  },
  {
    icon: Award,
    title: "Премиум качество",
    desc: "Каждое изделие проходит строгий контроль качества на всех этапах производства.",
  },
  {
    icon: Truck,
    title: "Быстрая доставка",
    desc: "Бесплатная доставка по всей России за 2-3 дня. Примерка перед покупкой.",
  },
  {
    icon: Sparkles,
    title: "Уникальный дизайн",
    desc: "Наши дизайнеры создают коллекции, которые подчёркивают вашу индивидуальность.",
  },
];

export function About() {
  const { ref, isInView } = useInView(0.1);
  const { ref: ref2, isInView: isInView2 } = useInView(0.1);

  return (
    <section id="about" className="bg-white">
      {/* Story Section */}
      <div className="py-24" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div
              className="relative transition-all duration-1000"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateX(0)" : "translateX(-60px)",
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&auto=format&fit=crop"
                  alt="Our story"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-100 -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-brand-300 -z-10" />
            </div>

            {/* Text */}
            <div
              className="transition-all duration-1000"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateX(0)" : "translateX(60px)",
                transitionDelay: "200ms",
              }}
            >
              <p className="text-brand-400 text-sm font-medium tracking-[0.3em] uppercase mb-3">
                Наша история
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-brand-900 font-bold mb-6 leading-tight">
                Создаём моду с{" "}
                <span className="italic font-normal text-brand-500">
                  душой
                </span>
              </h2>
              <div className="w-16 h-0.5 bg-brand-400 mb-8" />
              <p className="text-brand-700 leading-relaxed mb-6 text-lg">
                ÉLÉGANCE — это больше чем бренд одежды. Это философия стиля,
                основанная на гармонии между классикой и современными трендами.
                Мы верим, что одежда должна рассказывать вашу историю.
              </p>
              <p className="text-brand-600 leading-relaxed mb-8">
                С 2015 года мы создаём коллекции, вдохновлённые путешествиями,
                искусством и природой. Каждая деталь — от выбора ткани до
                последнего стежка — отражает нашу страсть к совершенству.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-brand-200">
                <div>
                  <p className="font-playfair text-3xl font-bold text-brand-900">10+</p>
                  <p className="text-brand-500 text-sm mt-1">Лет опыта</p>
                </div>
                <div>
                  <p className="font-playfair text-3xl font-bold text-brand-900">50K+</p>
                  <p className="text-brand-500 text-sm mt-1">Клиентов</p>
                </div>
                <div>
                  <p className="font-playfair text-3xl font-bold text-brand-900">200+</p>
                  <p className="text-brand-500 text-sm mt-1">Моделей</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-brand-900" ref={ref2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isInView2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-brand-300 text-sm font-medium tracking-[0.3em] uppercase mb-3">
              Почему мы
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-white font-bold mb-4">
              Наши преимущества
            </h2>
            <div className="w-20 h-0.5 bg-brand-400 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="text-center p-8 border border-brand-700/50 hover:border-brand-400 transition-all duration-500 group hover:bg-brand-800/50"
                style={{
                  opacity: isInView2 ? 1 : 0,
                  transform: isInView2
                    ? "translateY(0)"
                    : "translateY(40px)",
                  transitionDelay: `${i * 150}ms`,
                  transitionDuration: "700ms",
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 border border-brand-500 rounded-full mb-6 group-hover:bg-brand-400 group-hover:border-brand-400 transition-all duration-500">
                  <feature.icon
                    size={24}
                    className="text-brand-300 group-hover:text-white transition-colors duration-500"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-brand-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
