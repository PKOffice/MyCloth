
import React from 'react';

const PromotionMarquee: React.FC = () => {
  return (
    <div className="w-full bg-[var(--color-text-main)] py-2.5 overflow-hidden whitespace-nowrap border-b border-[var(--color-border)] relative z-50">
      <div className="inline-block animate-marquee">
        <span className="text-[9px] font-black text-[var(--color-bg)] uppercase tracking-[0.4em] mx-10">
          SUMMER ATELIER SALE: 20% OFF ON ALL ARCHIVE ESSENTIALS — USE CODE: <span className="text-[var(--color-accent)] opacity-80">LUXE20</span> — FREE GLOBAL SHIPPING ON ORDERS OVER ₹5000 — 
        </span>
        <span className="text-[9px] font-black text-[var(--color-bg)] uppercase tracking-[0.4em] mx-10">
          SUMMER ATELIER SALE: 20% OFF ON ALL ARCHIVE ESSENTIALS — USE CODE: <span className="text-[var(--color-accent)] opacity-80">LUXE20</span> — FREE GLOBAL SHIPPING ON ORDERS OVER ₹5000 — 
        </span>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PromotionMarquee;
