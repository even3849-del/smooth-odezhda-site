import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80&auto=format&fit=crop"
          alt="Fashion Hero"
          className="w-full h-full object-cover scale-105 animate-[scaleIn_1.5s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-brand-300 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-4 opacity-0-init animate-fade-in-up delay-300">
              Коллекция Весна-Лето 2025
            </p>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-6 opacity-0-init animate-fade-in-up delay-400">
              Стиль —<br />
              <span className="italic font-normal text-brand-200">
                это ты
              </span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-lg mb-10 leading-relaxed opacity-0-init animate-fade-in-up delay-500">
              Откройте для себя новую коллекцию, где элегантность встречается
              с современностью. Каждая деталь продумана до совершенства.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0-init animate-fade-in-up delay-600">
              <a
                href="#featured"
                className="group relative inline-flex items-center gap-3 bg-white text-brand-900 px-8 py-4 text-sm font-semibold tracking-wider uppercase overflow-hidden transition-all duration-500 hover:bg-brand-400 hover:text-white"
              >
                <span className="relative z-10">Смотреть коллекцию</span>
                <ArrowRight
                  size={18}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-3 border border-white/40 text-white px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-500 hover:bg-white/10 hover:border-white/70"
              >
                Узнать больше
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/70 rounded-full animate-[fadeInUp_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
