import { useInView } from "../hooks/useInView";

const categories = [
  {
    name: "Платья",
    subtitle: "Элегантность каждый день",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-2",
    height: "h-[500px] md:h-full",
  },
  {
    name: "Верхняя одежда",
    subtitle: "Тепло и стиль",
    image:
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80&auto=format&fit=crop",
    span: "",
    height: "h-[300px]",
  },
  {
    name: "Аксессуары",
    subtitle: "Завершающий штрих",
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80&auto=format&fit=crop",
    span: "",
    height: "h-[300px]",
  },
  {
    name: "Костюмы",
    subtitle: "Деловой шик",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80&auto=format&fit=crop",
    span: "md:col-span-2",
    height: "h-[300px]",
  },
];

export function Categories() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="categories" className="py-24 bg-brand-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-brand-400 text-sm font-medium tracking-[0.3em] uppercase mb-3">
            Откройте для себя
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-brand-900 font-bold mb-4">
            Наши коллекции
          </h2>
          <div className="w-20 h-0.5 bg-brand-400 mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:grid-rows-[300px_300px]">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className={`group relative overflow-hidden cursor-pointer ${cat.span} ${cat.height} transition-all duration-700`}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                <p className="text-white/70 text-xs tracking-[0.2em] uppercase mb-2">
                  {cat.subtitle}
                </p>
                <h3 className="font-playfair text-2xl md:text-3xl text-white font-semibold">
                  {cat.name}
                </h3>
                <div className="w-0 group-hover:w-12 h-0.5 bg-brand-300 mt-3 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
