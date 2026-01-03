
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      })
      .from(imgRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
      }, 0.2);

      gsap.to(imgRef.current, {
        y: 80,
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[70vh] lg:h-[80vh] flex items-center bg-[var(--color-bg)] overflow-hidden px-6 md:px-12 lg:px-24 py-20 transition-colors"
    >
      {/* Structural Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-surface)] -z-10 transition-colors" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-[1600px] mx-auto gap-12 items-center">
        
        {/* Content Block */}
        <div ref={contentRef} className="lg:col-span-6 z-10 space-y-8">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--color-text-main)]"></span>
            <span className="hero-reveal text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-dim)]">
              MyCloth EDITION / 2026
            </span>
          </div>
          
          <div className="space-y-4">
            <h1 className="hero-reveal text-5xl md:text-7xl lg:text-[6vw] font-black leading-[1.1] tracking-tight uppercase text-[var(--color-text-main)]">
              Personal <br/>
              <span className="font-serif italic lowercase font-normal text-[var(--color-text-dim)]">Refinement.</span>
            </h1>
            <p className="hero-reveal text-lg md:text-xl text-[var(--color-text-dim)] font-normal max-w-lg leading-relaxed font-heading">
              Engineering the bespoke interface between the body and its environment. Experience architectural comfort through our nano-tech fabrications.
            </p>
          </div>

          <div className="hero-reveal flex flex-wrap items-center gap-8 pt-4">
            <button className="btn-premium px-10 py-5 bg-[var(--color-text-main)] text-[var(--color-bg)] text-[11px] font-black uppercase tracking-[0.3em] shadow-xl hover:translate-y-[-2px] active:translate-y-0 transition-transform">
              EXPLORE ARCHIVE
            </button>
            <div className="flex items-center gap-4">
              <div className="h-10 w-[1px] bg-[var(--color-border)]"></div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-[var(--color-text-dim)] uppercase tracking-widest">Philosophy</span>
                <span className="text-xs font-bold text-[var(--color-text-main)]">Bespoke Architectural Dress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Block */}
        <div className="lg:col-span-6 relative h-[50vh] lg:h-[65vh] flex justify-center lg:justify-end">
          <div className="relative w-full lg:w-[90%] h-full overflow-hidden border border-[var(--color-border)] shadow-2xl">
            <img 
              ref={imgRef}
              src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1600&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
              alt="MyCloth Detail"
            />
            
            {/* Minimal Detail Box */}
            <div className="hero-reveal absolute bottom-0 left-0 lg:-left-8 bg-[var(--color-bg)] p-8 lg:p-10 max-w-[280px] shadow-2xl transition-colors">
              <span className="text-[10px] font-black text-[var(--color-text-main)] uppercase tracking-widest block mb-3">Refinement 01</span>
              <p className="text-sm font-bold text-[var(--color-text-main)] leading-tight">
                Anatomical mapping for personalized kinetic freedom.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
