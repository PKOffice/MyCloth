
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import ProductCard from './components/ProductCard.tsx';
import CartSidebar from './components/CartSidebar.tsx';
import MenuSidebar from './components/MenuSidebar.tsx';
import AuthModal from './components/AuthModal.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import PromotionMarquee from './components/PromotionMarquee.tsx';
import { api } from './services/api.ts';
import { Product, CartItem, Category, SortOption, User } from './types.ts';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mycloth_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('mycloth_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.NONE);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLightMode, setIsLightMode] = useState(() => {
    const saved = localStorage.getItem('mycloth_theme');
    return saved === null ? true : saved === 'light';
  });
  
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial data load
    const init = async () => {
      try {
        await api.initInventory();
        await loadProducts();
      } catch (e) {
        console.error("Initialization failed:", e);
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    const data = await api.getProducts();
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    localStorage.setItem('mycloth_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mycloth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mycloth_user');
    }
  }, [user]);

  useEffect(() => {
    const mode = isLightMode ? 'light' : 'dark';
    localStorage.setItem('mycloth_theme', mode);
    if (isLightMode) {
      document.body.classList.remove('theme-dark');
    } else {
      document.body.classList.add('theme-dark');
    }
  }, [isLightMode]);

  const handleGoHome = () => {
    setIsAdminOpen(false);
    setIsCartOpen(false);
    setIsMenuOpen(false);
    setIsAuthOpen(false);
    setActiveCategory('All');
    setSortOption(SortOption.NONE);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = useMemo(() => {
    let result = products;
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    switch (sortOption) {
      case SortOption.PRICE_LOW_HIGH: result = [...result].sort((a, b) => a.price - b.price); break;
      case SortOption.PRICE_HIGH_LOW: result = [...result].sort((a, b) => b.price - a.price); break;
      case SortOption.NAME_AZ: result = [...result].sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return result;
  }, [products, searchQuery, activeCategory, sortOption]);

  useEffect(() => {
    if (gridRef.current && !isLoading) {
      const cards = gridRef.current.querySelectorAll('.product-card');
      ScrollTrigger.getAll().forEach(t => t.kill());

      cards.forEach((card) => {
        gsap.fromTo(card, 
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }
  }, [filteredProducts, isLoading]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));

  const categories: Category[] = ['All', 'Mens', 'Womens', 'Active', 'Sleepwear'];

  return (
    <div className="min-h-screen theme-transition bg-[var(--color-bg)] selection:bg-[var(--color-text-main)] selection:text-[var(--color-bg)]">
      <PromotionMarquee />
      
      <Navbar 
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onGoHome={handleGoHome}
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLightMode={isLightMode}
        onToggleTheme={() => setIsLightMode(!isLightMode)}
      />

      <Hero />

      <main className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-24 py-20 md:py-32">
        <section className="mb-16 md:mb-24">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 md:gap-10 mb-12 md:mb-16">
            <div>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text-dim)] mb-3 md:mb-4 block">Archive Selection</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[var(--color-text-main)] leading-none">
                Bespoke <br className="hidden md:block"/> <span className="font-serif italic lowercase font-normal text-[var(--color-text-dim)]">Foundations.</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-4 md:gap-6 border-b border-[var(--color-border)] pb-4 w-full lg:w-auto">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[var(--color-text-dim)] whitespace-nowrap">Sort Order</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="bg-transparent border-0 font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-[var(--color-text-main)] focus:ring-0 p-0 cursor-pointer w-full outline-none"
              >
                {Object.values(SortOption).map(option => (
                  <option key={option} value={option} className="bg-[var(--color-surface)] text-[var(--color-text-main)]">{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] transition-all relative py-2 md:py-3 ${
                  activeCategory === cat ? 'text-[var(--color-text-main)]' : 'text-[var(--color-text-dim)] hover:text-[var(--color-text-main)]'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-text-main)]" />
                )}
              </button>
            ))}
          </div>
        </section>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-[var(--color-surface)] rounded-sm mb-6"></div>
                <div className="h-4 w-2/3 bg-[var(--color-surface)] mb-4"></div>
                <div className="h-4 w-1/3 bg-[var(--color-surface)]"></div>
              </div>
            ))}
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-16 md:gap-y-24">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="py-24 md:py-40 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-dim)] italic">No artifacts found in this specific selection.</p>
          </div>
        )}
      </main>

      <footer className="bg-[var(--color-bg)] border-t border-[var(--color-border)] py-16 md:py-32 mt-20">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-24 text-center md:text-left">
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
            <div className="max-w-md mx-auto md:mx-0">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-[var(--color-text-main)] mb-4 md:mb-6">MyCloth<span className="text-[var(--color-accent)]">.</span></h3>
              <p className="text-xs md:text-sm text-[var(--color-text-dim)] leading-relaxed">
                Architectural foundations for the daily archive. We engineer the bespoke interface between the body and cloth.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-24">
              <div className="flex flex-col gap-4">
                <span className="text-[9px] font-black text-[var(--color-text-dim)] uppercase tracking-widest">Connect</span>
                <a href="#" className="text-[10px] font-bold hover:text-[var(--color-accent)] transition-colors">Instagram</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[9px] font-black text-[var(--color-text-dim)] uppercase tracking-widest">Atelier</span>
                <a href="#" className="text-[10px] font-bold hover:text-[var(--color-accent)] transition-colors">Philosophy</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[9px] font-black text-[var(--color-text-dim)] uppercase tracking-widest">Support</span>
                <a href="#" className="text-[10px] font-bold hover:text-[var(--color-accent)] transition-colors">Returns</a>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-12 border-t border-[var(--color-border)] text-center text-[8px] font-black text-[var(--color-text-dim)] uppercase tracking-[0.5em]">
            © 2024 MYCLOTH COLLECTIVE
          </div>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <MenuSidebar 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
        onLogin={(u) => setUser(u)}
        onLogout={() => { setUser(null); setIsMenuOpen(false); }}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(u) => setUser(u)}
        user={user}
        onLogout={() => { setUser(null); setIsAuthOpen(false); }}
      />

      {isAdminOpen && <AdminDashboard onClose={() => { setIsAdminOpen(false); loadProducts(); }} />}
    </div>
  );
};

export default App;
