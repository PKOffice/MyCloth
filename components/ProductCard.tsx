
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRef.current?.addEventListener('mouseenter', () => {
        gsap.to(imgRef.current, { scale: 1.08, duration: 0.8, ease: "power2.out" });
        gsap.to(overlayRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
      });
      cardRef.current?.addEventListener('mouseleave', () => {
        gsap.to(imgRef.current, { scale: 1, duration: 0.8, ease: "power2.out" });
        gsap.to(overlayRef.current, { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="product-card group relative flex flex-col cursor-pointer bg-transparent">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm group-hover:shadow-xl transition-shadow duration-500">
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-90"
        />
        
        {/* Hover Overlay */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/80 via-transparent to-transparent flex items-end p-6 opacity-0 translate-y-5 pointer-events-none group-hover:pointer-events-auto"
        >
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="w-full bg-[var(--color-accent)] text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-colors shadow-lg"
          >
            Add to Bag
          </button>
        </div>

        {product.badges?.map((badge, idx) => (
          <div 
            key={idx}
            className="absolute left-4 top-4 bg-[var(--color-text-main)] text-[var(--color-bg)] px-3 py-1 text-[9px] font-black uppercase tracking-widest"
          >
            {badge}
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="pt-6 flex flex-col space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-[var(--color-text-main)] uppercase tracking-tight group-hover:text-[var(--color-accent)] transition-colors leading-tight">
            {product.name}
          </h3>
          <span className="text-base font-bold text-[var(--color-text-main)] font-heading">₹{product.price.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">{product.category}</span>
          <span className="h-px w-6 bg-[var(--color-border)]"></span>
        </div>

        <p className="text-[13px] text-[var(--color-text-dim)] font-normal leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
