import { useInView } from "../hooks/useInView";
import { ArrowRight } from "lucide-react";

export function Lookbook() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="lookbook" className="py-24 bg-brand-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-brand-400 text-sm font-medium tracking-[0.3em] uppercase mb-3">
            Вдохновение
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-brand-900 font-bold mb-4">
            Lookbook
          </h2>
          <div className="w-20 h-0.5 bg-brand-400 mx-auto" />
        </div>

        {/* Split Layout 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div
            className="relative overflow-hidden group cursor-pointer h-[500px] lg:h-[600px] transition-all duration-700"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateX(0)" : "translateX(-50px)",
              transitionDelay: "200ms",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&q=80&auto=format&fit=crop"
              alt="Lookbook 1"
              className="w-full h-full object-cover img-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-8 left-8 right-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-white/80 text-xs tracking-[0.2em] uppercase mb-2">
                Весенний образ
              </p>
              <h3 className="font-playfair text-3xl text-white font-semibold mb-3">
                Утренний свет
              </h3>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-white text-sm font-medium tracking-wider uppercase hover:gap-3 transition-all duration-300"
              >
                Смотреть <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div
              className="relative overflow-hidden group cursor-pointer flex-1 min-h-[250px] transition-all duration-700"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateX(0)" : "translateX(50px)",
                transitionDelay: "350ms",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=80&auto=format&fit=crop"
                alt="Lookbook 2"
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="font-playfair text-2xl text-white font-semibold">
                  Городской шик
                </h3>
              </div>
            </div>

            <div
              className="relative overflow-hidden group cursor-pointer flex-1 min-h-[250px] transition-all duration-700"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateX(0)" : "translateX(50px)",
                transitionDelay: "500ms",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80&auto=format&fit=crop"
                alt="Lookbook 3"
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="font-playfair text-2xl text-white font-semibold">
                  Вечерний выход
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width banner */}
        <div
          className="relative overflow-hidden group cursor-pointer h-[300px] md:h-[400px] transition-all duration-700"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(40px)",
            transitionDelay: "650ms",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80&auto=format&fit=crop"
            alt="Wide banner"
            className="w-full h-full object-cover img-zoom"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <p className="text-white/80 text-sm tracking-[0.3em] uppercase mb-3">
                Лимитированная серия
              </p>
              <h3 className="font-playfair text-3xl md:text-5xl text-white font-bold mb-6">
                Capsule Collection
              </h3>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white text-brand-900 px-8 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-brand-100 transition-colors duration-300"
              >
                Подробнее <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
