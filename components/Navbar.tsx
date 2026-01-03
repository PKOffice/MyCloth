
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void; 
  onOpenAuth: () => void;
  onOpenAdmin?: () => void;
  onGoHome: () => void;
  user: any | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onOpenCart, 
  onOpenMenu, 
  onOpenAuth,
  onOpenAdmin,
  onGoHome,
  user, 
  searchQuery, 
  setSearchQuery, 
  isLightMode, 
  onToggleTheme 
}) => {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 lg:px-12 lg:py-5">
        
        {/* Unified Logo and Brand Name Section */}
        <div 
          className="flex items-center space-x-3 md:space-x-5 cursor-pointer group" 
          onClick={onGoHome}
          aria-label="Go to Home"
        >
          <div className="relative">
            <div className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center bg-[var(--color-text-main)] text-[var(--color-bg)] shadow-xl transition-transform duration-500 group-hover:rotate-12">
               <span className="text-xs md:text-sm font-black tracking-tighter">MC</span>
            </div>
            <div className="absolute -inset-1 border border-[var(--color-accent)] -z-10 transition-transform duration-500 group-hover:-rotate-6"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-light tracking-[0.1em] text-[var(--color-text-main)] uppercase md:text-2xl leading-none">
              My<span className="font-black">Cloth</span><span className="text-[var(--color-accent)]">.</span>
            </span>
          </div>
        </div>

        <div className="hidden lg:block flex-1 max-w-sm px-8">
           <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] text-[10px]"></i>
            <input
              type="text"
              placeholder="SEARCH THE ARCHIVE"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[var(--color-border)] bg-transparent py-2.5 pl-10 pr-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-main)] outline-none focus:border-[var(--color-accent)] transition-all"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6">
          <button onClick={onToggleTheme} className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-text-main)] transition-all">
            <i className={`fa-solid ${isLightMode ? 'fa-moon' : 'fa-sun'} text-lg`}></i>
          </button>

          {user?.role === 'admin' && (
            <button 
              onClick={onOpenAdmin}
              className="hidden md:flex items-center gap-2 px-4 py-2 border border-blue-500/20 text-blue-500 hover:bg-blue-500 hover:text-white transition-all group"
            >
              <i className="fa-solid fa-gauge-high text-xs"></i>
              <span className="text-[9px] font-black uppercase tracking-widest">Atelier_Control</span>
            </button>
          )}

          <button onClick={onOpenAuth} className="hidden md:flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] hover:border-[var(--color-text-main)] transition-all group">
            <i className="fa-regular fa-user text-base text-[var(--color-text-main)]"></i>
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-main)]">
              {user ? user.name.split(' ')[0] : 'Profile'}
            </span>
          </button>

          <button onClick={onOpenCart} className="group relative flex items-center gap-3 px-4 py-2 bg-[var(--color-text-main)] border border-transparent hover:bg-transparent hover:border-[var(--color-text-main)] transition-all">
            <div className="relative">
              <i className="fa-solid fa-bag-shopping text-base md:text-lg text-[var(--color-bg)] group-hover:text-[var(--color-text-main)]"></i>
              {cartCount > 0 && (
                <span className="absolute -right-3 -top-3 flex h-4 w-4 items-center justify-center bg-[var(--color-accent)] text-[8px] font-black text-white">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-bg)] group-hover:text-[var(--color-text-main)] hidden sm:block">Archive</span>
          </button>

          <button onClick={onOpenMenu} className="md:hidden flex flex-col items-center justify-center gap-1.5 h-10 w-10 border border-[var(--color-border)] hover:border-[var(--color-text-main)] transition-all">
            <div className="w-5 h-[2px] bg-[var(--color-text-main)]"></div>
            <div className="w-5 h-[2px] bg-[var(--color-text-main)]"></div>
            <div className="w-3 h-[2px] bg-[var(--color-text-main)] self-start ml-2.5"></div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
