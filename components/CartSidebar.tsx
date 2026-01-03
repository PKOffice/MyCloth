
import React from 'react';
import { CartItem } from '../types';
import { GST_RATE } from '../constants';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = subtotal * GST_RATE;
  const total = subtotal + gst;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <div className="relative flex h-full w-full max-w-lg flex-col bg-[var(--color-bg)] border-l border-[var(--color-border)] shadow-2xl animate-in slide-in-from-right duration-500 ease-out">
        
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-12 py-10">
          <div>
            <span className="text-[10px] font-black text-[var(--color-accent)] uppercase tracking-[0.5em] mb-2 block">Personal</span>
            <h2 className="text-4xl font-extrabold uppercase tracking-tighter text-[var(--color-text-main)]">Archive_</h2>
          </div>
          <button 
            onClick={onClose} 
            className="group flex h-14 w-14 items-center justify-center border border-[var(--color-border)] text-[var(--color-text-main)] transition-all hover:bg-[var(--color-accent)] hover:text-white"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-12 py-12">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-10 text-[var(--color-accent)]/20 animate-pulse">
                <i className="fa-solid fa-layer-group text-8xl"></i>
              </div>
              <h3 className="text-2xl font-serif italic text-[var(--color-text-dim)] mb-8">Archive is currently vacant.</h3>
              <button 
                onClick={onClose}
                className="group relative px-12 py-5 border border-[var(--color-accent)] text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all"
              >
                Begin Collection
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {items.map((item) => (
                <div key={item.id} className="flex gap-10 group">
                  <div className="h-48 w-32 flex-shrink-0 overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-2">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xl font-extrabold uppercase tracking-tight text-[var(--color-text-main)] leading-tight">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-[var(--color-text-dim)] hover:text-[var(--color-accent)] transition-colors p-2">
                          <i className="fa-regular fa-trash-can text-lg"></i>
                        </button>
                      </div>
                      <p className="text-[10px] font-black text-[var(--color-accent)] uppercase tracking-[0.3em] mt-3 italic">{item.category}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-8">
                      <div className="flex items-center space-x-6 bg-[var(--color-surface)] px-6 py-2 border border-[var(--color-border)]">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-[var(--color-text-dim)] hover:text-[var(--color-accent)] transition-colors"
                        >
                          <i className="fa-solid fa-minus text-xs"></i>
                        </button>
                        <span className="text-sm font-black text-[var(--color-text-main)] min-w-[30px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-[var(--color-text-dim)] hover:text-[var(--color-accent)] transition-colors"
                        >
                          <i className="fa-solid fa-plus text-xs"></i>
                        </button>
                      </div>
                      <span className="text-lg font-serif italic text-[var(--color-accent)]">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="bg-[var(--color-surface)] px-12 py-12 border-t border-[var(--color-border)] shadow-inner">
            <div className="space-y-6">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-text-dim)]">
                <span>Base_Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-text-dim)]">
                <span>GST_Impound (18%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-[var(--color-border)] pt-10">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-accent)]">Final_Investment</span>
                <span className="text-3xl font-serif italic text-[var(--color-text-main)]">₹{Math.round(total).toLocaleString()}</span>
              </div>
            </div>
            
            <button className="mt-12 w-full bg-[var(--color-accent)] py-6 text-[11px] font-black uppercase tracking-[0.6em] text-white shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all">
              Execute Settlement
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
