import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4 text-white">
              ÉLÉGANCE
            </h3>
            <p className="text-brand-400 text-sm leading-relaxed mb-6">
              Создаём моду, которая вдохновляет. Каждая коллекция — это история
              стиля, элегантности и уверенности в себе.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 border border-brand-700 flex items-center justify-center hover:bg-brand-400 hover:border-brand-400 transition-all duration-300 group"
                >
                  <Icon
                    size={18}
                    className="text-brand-400 group-hover:text-white transition-colors duration-300"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6 text-brand-200">
              Магазин
            </h4>
            <ul className="space-y-3">
              {["Новинки", "Платья", "Верхняя одежда", "Аксессуары", "Костюмы", "Sale"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-brand-400 text-sm hover:text-white transition-colors duration-300 hover:pl-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6 text-brand-200">
              Информация
            </h4>
            <ul className="space-y-3">
              {[
                "О компании",
                "Доставка и оплата",
                "Возврат и обмен",
                "Размерная сетка",
                "Программа лояльности",
                "Контакты",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-brand-400 text-sm hover:text-white transition-colors duration-300 hover:pl-1 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6 text-brand-200">
              Контакты
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-400 mt-0.5 shrink-0" />
                <span className="text-brand-400 text-sm">
                  Москва, ул. Тверская 15, ТЦ «Модный квартал», 2 этаж
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-400 shrink-0" />
                <a
                  href="tel:+74951234567"
                  className="text-brand-400 text-sm hover:text-white transition-colors duration-300"
                >
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-400 shrink-0" />
                <a
                  href="mailto:info@elegance.ru"
                  className="text-brand-400 text-sm hover:text-white transition-colors duration-300"
                >
                  info@elegance.ru
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 border border-brand-700/50 bg-brand-800/30">
              <p className="text-brand-300 text-xs">
                <span className="font-semibold text-white">Режим работы:</span>
                <br />
                Пн-Сб: 10:00 — 21:00
                <br />
                Вс: 11:00 — 20:00
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-brand-700/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-500 text-xs">
            © 2025 ÉLÉGANCE. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            {["Visa", "MasterCard", "МИР", "СБП"].map((p) => (
              <span
                key={p}
                className="text-brand-500 text-xs font-medium border border-brand-700/50 px-3 py-1"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
