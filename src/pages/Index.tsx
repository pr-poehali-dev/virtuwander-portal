import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/c5719440-2b0b-4a62-8857-e7b496e2885a/files/b1febd41-bc55-4528-81eb-f6a6ee7be22c.jpg";
const PRODUCT_IMG = "https://cdn.poehali.dev/projects/c5719440-2b0b-4a62-8857-e7b496e2885a/files/b1dedcaf-55ff-4ea3-98bc-ea407bb4b18c.jpg";

const NAV_ITEMS = [
  { label: "Каталог", href: "#catalog" },
  { label: "Конфигуратор", href: "#configurator" },
  { label: "Туры", href: "#tours" },
  { label: "Сообщество", href: "#community" },
  { label: "Блог", href: "#blog" },
  { label: "О нас", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

const PRODUCTS = [
  {
    name: "VirtuWander Lite",
    price: "24 900",
    badge: "Хит продаж",
    badgeColor: "cyan",
    desc: "Для начинающих путешественников. 4K-дисплей, встроенный AI-гид, 500+ направлений.",
    specs: ["4K OLED · 120Hz", "AI-гид базовый", "Wi-Fi 6", "Автономность 6ч"],
    color: "от небесно-синего до горного зелёного",
  },
  {
    name: "VirtuWander Pro",
    price: "54 900",
    badge: "Популярный",
    badgeColor: "violet",
    desc: "Иммерсивный опыт без границ. 8K-дисплей, продвинутый AI-гид, NFT-паспорт путешественника.",
    specs: ["8K Micro-OLED · 144Hz", "AI-гид Pro", "Wi-Fi 6E + 5G", "Автономность 10ч"],
    color: "от космической черноты до неонового пурпура",
  },
  {
    name: "VirtuWander Ultra",
    price: "119 900",
    badge: "Премиум",
    badgeColor: "pink",
    desc: "Для настоящих исследователей метаверса. Haptic-обратная связь, метаверс-интеграция, VR-социальные сессии.",
    specs: ["12K перспективный · 240Hz", "AI-гид Elite + голос", "5G + Bluetooth 5.3", "Автономность 16ч"],
    color: "по индивидуальному заказу",
  },
];

const TOURS = [
  { name: "Париж", country: "Франция", type: "Культура", emoji: "🗼", color: "#00f5ff", duration: "45 мин", rating: "4.9" },
  { name: "Мачу-Пикчу", country: "Перу", type: "Приключение", emoji: "🏔️", color: "#9b59ff", duration: "60 мин", rating: "4.8" },
  { name: "Токио", country: "Япония", type: "Мегаполис", emoji: "🌸", color: "#ff2d78", duration: "50 мин", rating: "5.0" },
  { name: "Мальдивы", country: "Океан", type: "Релакс", emoji: "🏝️", color: "#00f5ff", duration: "40 мин", rating: "4.9" },
  { name: "Сафари", country: "Кения", type: "Природа", emoji: "🦁", color: "#9b59ff", duration: "55 мин", rating: "4.7" },
  { name: "Метаверс", country: "Digital", type: "NFT-тур", emoji: "🌐", color: "#ff2d78", duration: "∞", rating: "★ NEW" },
];

const PLANS = [
  {
    name: "Explorer",
    price: "990",
    period: "мес",
    desc: "Для начинающих путешественников",
    features: ["50 туров в месяц", "SD-качество (1080p)", "AI-гид базовый", "1 устройство"],
    popular: false,
    color: "cyan",
  },
  {
    name: "Voyager",
    price: "2 490",
    period: "мес",
    desc: "Лучший выбор для энтузиастов",
    features: ["Безлимитные туры", "4K Ultra HD", "AI-гид Pro + голос", "3 устройства", "NFT-паспорт", "Метаверс-клуб"],
    popular: true,
    color: "violet",
  },
  {
    name: "Pioneer",
    price: "4 990",
    period: "мес",
    desc: "Для профессиональных исследователей",
    features: ["Безлимит + эксклюзивы", "8K + haptic-контент", "AI Elite + кастомизация", "10 устройств", "NFT + минтинг туров", "VIP-события метаверса", "Приоритетная поддержка"],
    popular: false,
    color: "pink",
  },
];

const COMMUNITY_STATS = [
  { value: "2.4М+", label: "Путешественников" },
  { value: "180+", label: "Стран охвата" },
  { value: "12К+", label: "VR-туров" },
  { value: "98%", label: "Довольных клиентов" },
];

const BLOG_POSTS = [
  {
    tag: "AI & VR",
    title: "Как AI-гид адаптирует каждый тур под тебя",
    desc: "Разбираем технологию персонализации маршрутов на основе нейросетей и поведенческого анализа.",
    date: "12 марта 2026",
    readTime: "5 мин",
  },
  {
    tag: "Метаверс",
    title: "NFT-туры: зачем хранить путешествия в блокчейне",
    desc: "Цифровой паспорт путешественника, верификация воспоминаний и монетизация VR-опыта.",
    date: "8 марта 2026",
    readTime: "7 мин",
  },
  {
    tag: "Тренды 2026",
    title: "Web3 + туризм: новая эпоха виртуальных открытий",
    desc: "Децентрализованные туристические экосистемы, DAO-путешественники и токенизация впечатлений.",
    date: "3 марта 2026",
    readTime: "9 мин",
  },
];

const CONFIGURATOR_OPTIONS = {
  lenses: ["Стандартные", "Поляризованные", "Ночного видения", "AR-overlay"],
  colors: [
    { name: "Cyber Black", value: "#0d0d0d", accent: "#00f5ff" },
    { name: "Neon Violet", value: "#1a0533", accent: "#9b59ff" },
    { name: "Deep Ocean", value: "#001233", accent: "#00d4ff" },
    { name: "Arctic White", value: "#e8f4f8", accent: "#00f5ff" },
  ],
  features: ["Haptic-обратная связь", "Встроенные наушники", "Eye-tracking Pro", "Hand-tracking", "5G модуль"],
};

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const [activeLens, setActiveLens] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([0, 2]);
  const [fovValue, setFovValue] = useState(110);
  const [filterType, setFilterType] = useState("Все");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleFeature = (i: number) => {
    setSelectedFeatures(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  const tourTypes = ["Все", "Культура", "Приключение", "Мегаполис", "Релакс", "Природа", "NFT-тур"];
  const filteredTours = filterType === "Все" ? TOURS : TOURS.filter(t => t.type === filterType);

  const configPrice = 54900 + selectedFeatures.length * 4900 + (activeLens > 0 ? activeLens * 3500 : 0);

  return (
    <div className="min-h-screen font-ibm" style={{ backgroundColor: "var(--dark-bg)", color: "white" }}>
      <div className="scan-line" />

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="animate-orb absolute rounded-full opacity-20"
          style={{ width: 600, height: 600, top: "-10%", left: "-10%", background: "radial-gradient(circle, rgba(0,245,255,0.4) 0%, transparent 70%)" }} />
        <div className="animate-orb-delayed absolute rounded-full opacity-15"
          style={{ width: 500, height: 500, bottom: "5%", right: "-5%", background: "radial-gradient(circle, rgba(155,89,255,0.5) 0%, transparent 70%)" }} />
        <div className="animate-orb absolute rounded-full opacity-10"
          style={{ width: 400, height: 400, top: "40%", left: "60%", background: "radial-gradient(circle, rgba(255,45,120,0.4) 0%, transparent 70%)", animationDelay: "5s" }} />
      </div>

      {/* ===== NAV ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))" }}>
              <span className="text-lg">🥽</span>
            </div>
            <span className="font-montserrat font-black text-xl tracking-tight">
              Virtu<span className="gradient-text-cyan-violet">Wander</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button className="btn-outline-neon px-4 py-2 rounded-xl text-sm">Войти</button>
            <button className="btn-neon px-5 py-2 rounded-xl text-sm text-black font-bold">Купить</button>
          </div>

          <button className="lg:hidden p-2 rounded-lg" style={{ border: "1px solid rgba(0,245,255,0.3)" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} style={{ color: "var(--neon-cyan)" }} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden glass border-t" style={{ borderColor: "rgba(0,245,255,0.15)" }}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
              {NAV_ITEMS.map(item => (
                <a key={item.href} href={item.href} className="nav-link text-base py-2"
                  onClick={() => setMobileMenuOpen(false)}>{item.label}</a>
              ))}
              <div className="flex gap-3 pt-2">
                <button className="btn-outline-neon px-4 py-2 rounded-xl text-sm flex-1">Войти</button>
                <button className="btn-neon px-5 py-2 rounded-xl text-sm text-black font-bold flex-1">Купить</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center cyber-grid overflow-hidden pt-20" style={{ zIndex: 1 }}>
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="VirtuWander Hero" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(6,11,20,0.5) 60%, var(--dark-bg) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-tag animate-fade-up-1">
                <span className="w-2 h-2 rounded-full bg-neon-cyan inline-block" style={{ background: "var(--neon-cyan)" }} />
                Новинка 2026 года
              </div>
              <h1 className="font-montserrat font-black text-5xl lg:text-7xl leading-[1.05] mt-4 animate-fade-up-2">
                Путешествуй{" "}
                <span className="gradient-text block">без границ</span>
              </h1>
              <p className="text-lg mt-6 animate-fade-up-3" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>
                VR-очки с персональным AI-гидом. Мачу-Пикчу, Токио, Мальдивы —{" "}
                <strong style={{ color: "rgba(255,255,255,0.9)" }}>12 000+ направлений</strong> прямо у тебя дома.
                NFT-паспорт путешественника сохраняет каждое воспоминание.
              </p>

              <div className="flex flex-wrap gap-4 mt-8 animate-fade-up-4">
                <a href="#catalog">
                  <button className="btn-neon px-7 py-3.5 rounded-2xl text-black font-montserrat font-bold flex items-center gap-2">
                    <Icon name="ShoppingBag" size={18} />
                    Выбрать модель
                  </button>
                </a>
                <a href="#tours">
                  <button className="btn-outline-neon px-7 py-3.5 rounded-2xl font-montserrat font-semibold flex items-center gap-2">
                    <Icon name="Play" size={18} />
                    Смотреть туры
                  </button>
                </a>
              </div>

              <div className="flex items-center gap-6 mt-10 animate-fade-up-4">
                {[{ val: "12К+", lbl: "VR-туров" }, { val: "2.4М", lbl: "Пользователей" }, { val: "180+", lbl: "Стран" }].map(s => (
                  <div key={s.lbl}>
                    <div className="font-montserrat font-black text-2xl neon-text-cyan">{s.val}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center animate-float">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 rounded-3xl"
                  style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,245,255,0.15) 0%, transparent 70%)" }} />
                <img src={PRODUCT_IMG} alt="VirtuWander Pro" className="w-full rounded-3xl relative z-10"
                  style={{ boxShadow: "0 0 60px rgba(0,245,255,0.2), 0 0 120px rgba(155,89,255,0.1)" }} />
                <div className="glass absolute -top-4 -right-4 rounded-2xl px-4 py-2 z-20 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--neon-cyan)" }} />
                    <span className="text-sm font-semibold neon-text-cyan">AI активен</span>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Анализирую маршрут...</div>
                </div>
                <div className="glass absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 z-20">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🗼</span>
                    <div>
                      <div className="text-sm font-semibold">Париж, Франция</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Доступно сейчас</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>СКРОЛЛ</span>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--neon-cyan), transparent)" }} />
        </div>
      </section>

      {/* ===== CATALOG ===== */}
      <section id="catalog" className="relative py-24" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-tag" style={{ margin: "0 auto 12px" }}>
              <Icon name="ShoppingBag" size={12} />
              Каталог VR-очков
            </div>
            <h2 className="font-montserrat font-black text-4xl lg:text-5xl mt-2">
              Выбери своё <span className="gradient-text-cyan-violet">устройство</span>
            </h2>
            <p className="text-lg mt-4 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
              Три модели для любого уровня погружения — от первого знакомства до профессионального исследования метаверса
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {PRODUCTS.map((p, i) => (
              <div key={p.name} className={`product-card glass-card rounded-3xl p-6 ${i === 1 ? "lg:-translate-y-4" : ""}`}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background: p.badgeColor === "cyan" ? "rgba(0,245,255,0.15)" : p.badgeColor === "violet" ? "rgba(155,89,255,0.15)" : "rgba(255,45,120,0.15)",
                      color: p.badgeColor === "cyan" ? "var(--neon-cyan)" : p.badgeColor === "violet" ? "var(--neon-violet)" : "var(--neon-pink)",
                      border: `1px solid ${p.badgeColor === "cyan" ? "rgba(0,245,255,0.3)" : p.badgeColor === "violet" ? "rgba(155,89,255,0.3)" : "rgba(255,45,120,0.3)"}`,
                    }}>
                    {p.badge}
                  </span>
                  <Icon name="Eye" size={20} style={{ color: "rgba(255,255,255,0.3)" }} />
                </div>
                <h3 className="font-montserrat font-black text-2xl mb-1">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-montserrat font-bold text-3xl gradient-text-cyan-violet">{p.price}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>₽</span>
                </div>
                <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{p.desc}</p>
                <ul className="space-y-2 mb-6">
                  {p.specs.map(s => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: p.badgeColor === "cyan" ? "var(--neon-cyan)" : p.badgeColor === "violet" ? "var(--neon-violet)" : "var(--neon-pink)" }} />
                      <span style={{ color: "rgba(255,255,255,0.75)" }}>{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-xs mb-5 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.45)" }}>
                  Цвет: {p.color}
                </div>
                <button className={`w-full py-3 rounded-2xl font-montserrat font-bold text-sm transition-all duration-300 ${i === 1 ? "btn-neon text-black" : "btn-outline-neon"}`}>
                  {i === 1 ? "Купить сейчас" : "Подробнее"}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 glass rounded-2xl p-4 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold mr-2" style={{ color: "rgba(255,255,255,0.5)" }}>Фильтры:</span>
            {["Все модели", "До 30 000 ₽", "30–80 000 ₽", "Премиум", "С 5G", "С NFT-паспортом"].map(f => (
              <button key={f} className="text-xs px-4 py-1.5 rounded-full transition-all duration-200"
                style={{ border: "1px solid rgba(0,245,255,0.2)", color: "rgba(255,255,255,0.6)", background: "transparent" }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONFIGURATOR ===== */}
      <section id="configurator" className="relative py-24 cyber-grid" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-tag" style={{ margin: "0 auto 12px" }}>
              <Icon name="Settings" size={12} />
              Конфигуратор
            </div>
            <h2 className="font-montserrat font-black text-4xl lg:text-5xl mt-2">
              Собери <span className="gradient-text">свои VR-очки</span>
            </h2>
            <p className="text-lg mt-4 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
              Персонализируй каждую деталь — цвет, линзы, функции. Стоимость обновляется в реальном времени.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 space-y-6">
              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-montserrat font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Palette" size={18} style={{ color: "var(--neon-cyan)" }} />
                  Цвет корпуса
                </h3>
                <div className="flex flex-wrap gap-3">
                  {CONFIGURATOR_OPTIONS.colors.map((c, i) => (
                    <button key={c.name} onClick={() => setActiveColor(i)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-200"
                      style={{
                        background: activeColor === i ? "rgba(0,245,255,0.08)" : "rgba(255,255,255,0.04)",
                        border: activeColor === i ? "1px solid rgba(0,245,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: activeColor === i ? "0 0 0 1px rgba(0,245,255,0.4), 0 0 20px rgba(0,245,255,0.15)" : "none",
                      }}>
                      <div className="w-5 h-5 rounded-full border-2"
                        style={{ background: c.value, borderColor: c.accent }} />
                      <span className="text-sm" style={{ color: activeColor === i ? "white" : "rgba(255,255,255,0.6)" }}>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-montserrat font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Eye" size={18} style={{ color: "var(--neon-violet)" }} />
                  Тип линз
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {CONFIGURATOR_OPTIONS.lenses.map((l, i) => (
                    <button key={l} onClick={() => setActiveLens(i)}
                      className="p-3 rounded-2xl text-sm text-left transition-all duration-200"
                      style={{
                        background: activeLens === i ? "rgba(155,89,255,0.12)" : "rgba(255,255,255,0.04)",
                        border: activeLens === i ? "1px solid rgba(155,89,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                        color: activeLens === i ? "var(--neon-violet)" : "rgba(255,255,255,0.6)",
                      }}>
                      <div className="font-semibold mb-0.5">{l}</div>
                      <div className="text-xs opacity-60">{i === 0 ? "Базовая" : `+${(i * 3500).toLocaleString("ru")} ₽`}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-montserrat font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Maximize2" size={18} style={{ color: "var(--neon-pink)" }} />
                  Угол обзора: <span className="gradient-text-cyan-violet ml-1">{fovValue}°</span>
                </h3>
                <input type="range" min="90" max="200" value={fovValue}
                  onChange={e => setFovValue(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <span>90° Стандарт</span>
                  <span>200° Ultra Wide</span>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-montserrat font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Zap" size={18} style={{ color: "var(--neon-cyan)" }} />
                  Дополнительные функции
                </h3>
                <div className="space-y-3">
                  {CONFIGURATOR_OPTIONS.features.map((f, i) => (
                    <div key={f} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleFeature(i)}>
                      <div className={`custom-check ${selectedFeatures.includes(i) ? "checked" : ""}`}>
                        {selectedFeatures.includes(i) && <Icon name="Check" size={12} style={{ color: "var(--dark-bg)" }} />}
                      </div>
                      <span className="text-sm flex-1" style={{ color: selectedFeatures.includes(i) ? "white" : "rgba(255,255,255,0.6)" }}>{f}</span>
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>+4 900 ₽</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 sticky top-24">
              <div className="glass-violet rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Icon name="Package" size={20} style={{ color: "var(--neon-violet)" }} />
                  <h3 className="font-montserrat font-bold text-lg">Твоя конфигурация</h3>
                </div>
                <div className="rounded-2xl overflow-hidden mb-6 relative"
                  style={{ background: CONFIGURATOR_OPTIONS.colors[activeColor].value + "44", border: `1px solid ${CONFIGURATOR_OPTIONS.colors[activeColor].accent}33` }}>
                  <img src={PRODUCT_IMG} alt="Конфигурация" className="w-full opacity-80 mix-blend-luminosity" />
                  <div className="absolute inset-0 rounded-2xl"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${CONFIGURATOR_OPTIONS.colors[activeColor].accent}22, transparent 70%)` }} />
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { label: "Модель", val: "VirtuWander Pro" },
                    { label: "Цвет", val: CONFIGURATOR_OPTIONS.colors[activeColor].name },
                    { label: "Линзы", val: CONFIGURATOR_OPTIONS.lenses[activeLens] },
                    { label: "Угол обзора", val: `${fovValue}°` },
                    { label: "Функции", val: selectedFeatures.length > 0 ? `${selectedFeatures.length} доп.` : "Базовая" },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>{row.label}</span>
                      <span className="font-semibold">{row.val}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t mb-4" style={{ borderColor: "rgba(155,89,255,0.2)" }} />
                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-montserrat font-bold">Итого</span>
                  <div className="text-right">
                    <span className="font-montserrat font-black text-3xl gradient-text-cyan-violet">
                      {configPrice.toLocaleString("ru")}
                    </span>
                    <span className="text-lg"> ₽</span>
                  </div>
                </div>
                <button className="btn-neon w-full py-4 rounded-2xl text-black font-montserrat font-bold flex items-center justify-center gap-2">
                  <Icon name="ShoppingCart" size={18} />
                  Добавить в корзину
                </button>
                <button className="btn-outline-neon w-full py-3 rounded-2xl mt-3 font-montserrat font-semibold text-sm">
                  Сохранить конфигурацию
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TOURS ===== */}
      <section id="tours" className="relative py-24" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <div className="section-tag">
                <Icon name="Globe" size={12} />
                VR-туры
              </div>
              <h2 className="font-montserrat font-black text-4xl lg:text-5xl mt-2">
                12 000+ <span className="gradient-text">направлений</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {tourTypes.map(t => (
                <button key={t} onClick={() => setFilterType(t)}
                  className="text-xs px-4 py-2 rounded-full transition-all duration-200 font-semibold"
                  style={{
                    background: filterType === t ? "linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))" : "rgba(255,255,255,0.05)",
                    color: filterType === t ? "var(--dark-bg)" : "rgba(255,255,255,0.6)",
                    border: filterType === t ? "none" : "1px solid rgba(255,255,255,0.1)",
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTours.map((tour) => (
              <div key={tour.name} className="tour-card group" style={{ height: 260 }}>
                <div className="absolute inset-0 rounded-[16px]"
                  style={{ background: `linear-gradient(135deg, ${tour.color}22, rgba(6,11,20,0.9))`, border: `1px solid ${tour.color}33` }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <span className="text-[120px] select-none">{tour.emoji}</span>
                </div>
                <div className="tour-card-overlay rounded-[16px]" />
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{tour.emoji}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: `${tour.color}22`, color: tour.color, border: `1px solid ${tour.color}44` }}>
                      {tour.type}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-black text-2xl">{tour.name}</h3>
                    <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>{tour.country}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Clock" size={14} style={{ color: tour.color }} />
                        <span style={{ color: "rgba(255,255,255,0.6)" }}>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-sm font-semibold">{tour.rating}</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 opacity-0 group-hover:opacity-100"
                      style={{ background: tour.color, color: "var(--dark-bg)" }}>
                      Запустить тур
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="btn-outline-neon px-8 py-3.5 rounded-2xl font-montserrat font-semibold flex items-center gap-2 mx-auto">
              <Icon name="Map" size={18} />
              Смотреть все 12 000+ направлений
            </button>
          </div>
        </div>
      </section>

      {/* ===== SUBSCRIPTION ===== */}
      <section className="relative py-24 cyber-grid" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-tag" style={{ margin: "0 auto 12px" }}>
              <Icon name="Crown" size={12} />
              Подписка
            </div>
            <h2 className="font-montserrat font-black text-4xl lg:text-5xl mt-2">
              Безлимитные <span className="gradient-text">путешествия</span>
            </h2>
            <p className="text-lg mt-4 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
              Подпишись и открой доступ ко всем VR-турам, метаверс-событиям и NFT-паспорту
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.name}
                className="relative rounded-3xl p-px transition-all duration-300"
                style={{
                  background: plan.popular ? "linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))" : "transparent",
                  transform: plan.popular ? "scale(1.05)" : "scale(1)",
                }}>
                <div className="rounded-[calc(1.5rem-1px)] p-7 h-full"
                  style={{ background: plan.popular ? "#0a1220" : "rgba(13,20,34,0.6)", border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                  {plan.popular && (
                    <div className="text-center mb-4">
                      <span className="text-xs font-bold px-4 py-1 rounded-full"
                        style={{ background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))", color: "var(--dark-bg)" }}>
                        ★ ПОПУЛЯРНЫЙ
                      </span>
                    </div>
                  )}
                  <h3 className="font-montserrat font-black text-xl mb-1">{plan.name}</h3>
                  <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-montserrat font-black text-4xl gradient-text-cyan-violet">{plan.price}</span>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>₽/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: plan.color === "cyan" ? "rgba(0,245,255,0.15)" : plan.color === "violet" ? "rgba(155,89,255,0.15)" : "rgba(255,45,120,0.15)" }}>
                          <Icon name="Check" size={10}
                            style={{ color: plan.color === "cyan" ? "var(--neon-cyan)" : plan.color === "violet" ? "var(--neon-violet)" : "var(--neon-pink)" }} />
                        </div>
                        <span style={{ color: "rgba(255,255,255,0.75)" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3.5 rounded-2xl font-montserrat font-bold text-sm ${plan.popular ? "btn-neon text-black" : "btn-outline-neon"}`}>
                    {plan.popular ? "Начать сейчас" : "Выбрать план"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY ===== */}
      <section id="community" className="relative py-24" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-tag">
                <Icon name="Users" size={12} />
                Сообщество
              </div>
              <h2 className="font-montserrat font-black text-4xl lg:text-5xl mt-2 leading-tight">
                Клуб VR-<span className="gradient-text">путешественников</span>
              </h2>
              <p className="text-lg mt-6" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                Присоединяйся к 2.4 миллиона исследователей по всему миру. Совместные VR-сессии, обмен маршрутами, NFT-достижения и эксклюзивные метаверс-события.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {COMMUNITY_STATS.map(stat => (
                  <div key={stat.label} className="glass-card rounded-2xl p-4">
                    <div className="font-montserrat font-black text-3xl gradient-text-cyan-violet">{stat.value}</div>
                    <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <button className="btn-neon px-6 py-3 rounded-2xl text-black font-montserrat font-bold flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  Вступить в клуб
                </button>
                <button className="btn-outline-neon px-6 py-3 rounded-2xl font-semibold flex items-center gap-2">
                  <Icon name="MessageCircle" size={16} />
                  Форум
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: "Globe", title: "Социальные VR-сессии", desc: "Путешествуй вместе с друзьями в реальном времени, делись впечатлениями прямо в туре", color: "cyan" },
                { icon: "Award", title: "NFT-достижения", desc: "Получай уникальные токены за открытые направления, рекорды и особые события", color: "violet" },
                { icon: "Sparkles", title: "Метаверс-события", desc: "Эксклюзивные концерты, выставки и встречи в виртуальном пространстве клуба", color: "pink" },
                { icon: "Map", title: "Виртуальный паспорт", desc: "Твой цифровой travel-профиль со всеми посещёнными местами, отзывами и NFT", color: "cyan" },
              ].map(item => (
                <div key={item.title} className="glass-card rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: item.color === "cyan" ? "rgba(0,245,255,0.12)" : item.color === "violet" ? "rgba(155,89,255,0.12)" : "rgba(255,45,120,0.12)" }}>
                    <Icon name={item.icon} fallback="Star" size={18}
                      style={{ color: item.color === "cyan" ? "var(--neon-cyan)" : item.color === "violet" ? "var(--neon-violet)" : "var(--neon-pink)" }} />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-bold text-base mb-1">{item.title}</h4>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section id="blog" className="relative py-24 cyber-grid" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="section-tag">
                <Icon name="BookOpen" size={12} />
                Блог
              </div>
              <h2 className="font-montserrat font-black text-4xl lg:text-5xl mt-2">
                Тренды VR <span className="gradient-text-cyan-violet">2026</span>
              </h2>
            </div>
            <button className="btn-outline-neon px-5 py-2.5 rounded-xl text-sm font-semibold">Все статьи</button>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article key={post.title} className="glass-card rounded-3xl p-6 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: "rgba(0,245,255,0.1)", color: "var(--neon-cyan)", border: "1px solid rgba(0,245,255,0.2)" }}>
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                    <Icon name="Clock" size={11} />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="font-montserrat font-bold text-lg mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{post.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{post.date}</span>
                  <button className="flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--neon-cyan)" }}>
                    Читать <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="relative py-24" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass rounded-[2rem] p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 30% 50%, var(--neon-cyan), transparent 60%), radial-gradient(ellipse at 70% 50%, var(--neon-violet), transparent 60%)" }} />
            <div className="relative z-10">
              <div className="section-tag" style={{ margin: "0 auto 24px" }}>
                <Icon name="Info" size={12} />
                О компании
              </div>
              <h2 className="font-montserrat font-black text-4xl lg:text-6xl mb-6">
                Мы делаем <span className="gradient-text">путешествия</span><br />доступными каждому
              </h2>
              <p className="text-lg max-w-3xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>
                VirtuWander основана в 2022 году командой инженеров и путешественников. Наша миссия — стереть географические барьеры и дать каждому возможность исследовать мир через технологии иммерсивной реальности.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { icon: "Rocket", label: "Основана в 2022" },
                  { icon: "Users", label: "250+ сотрудников" },
                  { icon: "Globe", label: "Офисы в 12 странах" },
                  { icon: "Award", label: "CES Innovation 2025" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                    <Icon name={item.icon} fallback="Star" size={16} style={{ color: "var(--neon-cyan)" }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACTS ===== */}
      <section id="contacts" className="relative py-24 cyber-grid" style={{ zIndex: 1 }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-tag" style={{ margin: "0 auto 12px" }}>
              <Icon name="Mail" size={12} />
              Контакты
            </div>
            <h2 className="font-montserrat font-black text-4xl lg:text-5xl mt-2">
              Есть вопросы? <span className="gradient-text-cyan-violet">Напиши нам</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card rounded-3xl p-8">
              <h3 className="font-montserrat font-bold text-xl mb-6">Связаться с нами</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Имя</label>
                  <input type="text" placeholder="Иван Петров"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,245,255,0.15)", color: "white" }} />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Email</label>
                  <input type="email" placeholder="ivan@example.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,245,255,0.15)", color: "white" }} />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Сообщение</label>
                  <textarea rows={4} placeholder="Расскажи, чем можем помочь..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,245,255,0.15)", color: "white" }} />
                </div>
                <button className="btn-neon w-full py-3.5 rounded-2xl text-black font-montserrat font-bold">
                  Отправить сообщение
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: "Mail", label: "Email", val: "hello@virtuwander.com", color: "cyan" },
                { icon: "Phone", label: "Телефон", val: "+7 (800) 555-VR-01", color: "violet" },
                { icon: "MapPin", label: "Офис", val: "Москва, Пресненская наб. 8с1", color: "pink" },
                { icon: "MessageCircle", label: "Telegram", val: "@VirtuWander", color: "cyan" },
              ].map(item => (
                <div key={item.label} className="glass-card rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: item.color === "cyan" ? "rgba(0,245,255,0.1)" : item.color === "violet" ? "rgba(155,89,255,0.1)" : "rgba(255,45,120,0.1)" }}>
                    <Icon name={item.icon} fallback="Star" size={20}
                      style={{ color: item.color === "cyan" ? "var(--neon-cyan)" : item.color === "violet" ? "var(--neon-violet)" : "var(--neon-pink)" }} />
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{item.label}</div>
                    <div className="font-semibold text-sm">{item.val}</div>
                  </div>
                </div>
              ))}
              <div className="glass-card rounded-2xl p-5">
                <h4 className="font-montserrat font-bold mb-3 text-sm">Поддержка 24/7</h4>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Онлайн прямо сейчас</span>
                </div>
                <button className="btn-outline-neon w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                  <Icon name="Headphones" size={14} />
                  Чат с поддержкой
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative py-12" style={{ zIndex: 1, borderTop: "1px solid rgba(0,245,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))" }}>
                  <span className="text-sm">🥽</span>
                </div>
                <span className="font-montserrat font-black text-lg">Virtu<span className="gradient-text-cyan-violet">Wander</span></span>
              </div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
                Иммерсивные VR-путешествия нового поколения. Исследуй мир без ограничений.
              </p>
            </div>
            {[
              { title: "Продукты", links: ["VirtuWander Lite", "VirtuWander Pro", "VirtuWander Ultra", "Конфигуратор"] },
              { title: "VR-туры", links: ["Все направления", "Топ-рейтинг", "NFT-туры", "Метаверс"] },
              { title: "Компания", links: ["О нас", "Блог", "Карьера", "Пресс-кит"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-montserrat font-bold text-sm mb-4" style={{ color: "rgba(255,255,255,0.8)" }}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.45)" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--neon-cyan)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>© 2026 VirtuWander. Все права защищены.</p>
            <div className="flex items-center gap-4">
              {["Политика конфиденциальности", "Условия использования", "GDPR"].map(l => (
                <a key={l} href="#" className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}