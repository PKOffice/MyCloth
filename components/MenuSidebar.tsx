
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MenuSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
  onLogin: (user: any) => void;
  onLogout: () => void;
}

const MenuSidebar: React.FC<MenuSidebarProps> = ({ isOpen, onClose, user, onLogin, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(sidebarRef.current, 
        { x: '100%' }, 
        { x: '0%', duration: 0.6, ease: 'expo.out' }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: formData.name || 'Atelier Member', email: formData.email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div 
        ref={sidebarRef}
        className="relative flex h-full w-full max-w-[450px] flex-col bg-[var(--color-bg)] border-l border-[var(--color-border)] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-8 border-b border-[var(--color-border)]">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text-dim)]">ATELIER PORTAL</span>
          <button 
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center border border-[var(--color-border)] hover:bg-[var(--color-text-main)] hover:text-[var(--color-bg)] transition-all"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {user ? (
            /* Logged In State */
            <div className="space-y-12 py-10">
              <div className="text-center">
                <div className="w-20 h-20 bg-[var(--color-text-main)] text-[var(--color-bg)] flex items-center justify-center text-3xl font-black mx-auto mb-6 rounded-none shadow-xl border border-[var(--color-border)]">
                  {user.name[0]}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-[var(--color-text-main)] mb-1">
                  Welcome, {user.name.split(' ')[0]}
                </h3>
                <p className="text-[10px] font-bold text-[var(--color-text-dim)] uppercase tracking-widest">
                  Archive Member since 2024
                </p>
              </div>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-between px-6 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-main)] transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest">Archive_History</span>
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
                <button className="w-full flex items-center justify-between px-6 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-main)] transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest">Atelier_Settings</span>
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center justify-between px-6 py-4 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">Terminate_Session</span>
                  <i className="fa-solid fa-arrow-right-from-bracket text-[10px]"></i>
                </button>
              </div>
            </div>
          ) : (
            /* Guest / Auth State with TABS */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex border-b border-[var(--color-border)] mb-12">
                <button 
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${
                    activeTab === 'login' ? 'text-[var(--color-text-main)]' : 'text-[var(--color-text-dim)]'
                  }`}
                >
                  AUTHENTICATE
                  {activeTab === 'login' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-text-main)]" />}
                </button>
                <button 
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${
                    activeTab === 'signup' ? 'text-[var(--color-text-main)]' : 'text-[var(--color-text-dim)]'
                  }`}
                >
                  JOIN ATELIER
                  {activeTab === 'signup' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-text-main)]" />}
                </button>
              </div>

              <form onSubmit={handleAuth} className="space-y-8">
                {activeTab === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">ALIAS_REFERENCE</label>
                    <input 
                      type="text" required
                      className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-4 text-xs outline-none focus:border-[var(--color-text-main)] transition-all text-[var(--color-text-main)]"
                      placeholder="YOUR FULL NAME"
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">DIGITAL_MAIL</label>
                  <input 
                    type="email" required
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-4 text-xs outline-none focus:border-[var(--color-text-main)] transition-all text-[var(--color-text-main)]"
                    placeholder="EMAIL@DOMAIN.COM"
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">SECURE_PHRASE</label>
                  <input 
                    type="password" required
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-4 text-xs outline-none focus:border-[var(--color-text-main)] transition-all text-[var(--color-text-main)]"
                    placeholder="••••••••"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[var(--color-text-main)] text-[var(--color-bg)] py-5 text-[11px] font-black uppercase tracking-[0.5em] shadow-xl hover:translate-y-[-2px] active:translate-y-0 transition-transform"
                >
                  {activeTab === 'login' ? 'ACCESS ARCHIVE' : 'JOIN COLLECTIVE'}
                </button>

                <div className="pt-6 text-center">
                  <p className="text-[9px] font-bold text-[var(--color-text-dim)] leading-relaxed uppercase tracking-widest max-w-[200px] mx-auto">
                    Membership confirms adherence to MyCloth aesthetic and material standards.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer Brand */}
        <div className="p-8 border-t border-[var(--color-border)] bg-[var(--color-surface)] text-center">
          <span className="text-[14px] font-black tracking-tighter text-[var(--color-text-main)] uppercase">
            MyCloth<span className="text-[var(--color-accent)]">.</span>
          </span>
          <p className="text-[8px] font-bold text-[var(--color-text-dim)] uppercase tracking-[0.4em] mt-2">© 2024 MyCloth</p>
        </div>
      </div>
    </div>
  );
};

export default MenuSidebar;
