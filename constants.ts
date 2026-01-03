
import { Product } from './types';

export const PRODUCTS: Product[] = [
  // MENS - INNERWEAR & ESSENTIALS
  {
    id: 'm1',
    name: 'Ghost-Fit Technical Trunk',
    category: 'Mens',
    price: 1499,
    description: 'Ultra-thin Italian microfiber with a second-skin feel. Zero-bunching technology.',
    image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=800&auto=format&fit=crop',
    badges: ['Best Seller'],
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'm2',
    name: 'Bamboo-Lux Crew Vest',
    category: 'Mens',
    price: 1299,
    description: 'Thermo-regulating bamboo fiber that breathes 3x better than cotton.',
    image: 'https://images.unsplash.com/photo-1603566233481-99890a55edba?q=80&w=800&auto=format&fit=crop',
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'm3',
    name: 'Carbon-Fiber Performance Brief',
    category: 'Mens',
    price: 1899,
    description: 'Antimicrobial carbon-weave for the modern professional. Odor-locking tech.',
    image: 'https://images.unsplash.com/photo-1617175548993-431804f38e78?q=80&w=800&auto=format&fit=crop',
    badges: ['Tech-Series'],
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'm4',
    name: 'Aero-Mesh Boxer Brief',
    category: 'Mens',
    price: 1699,
    description: 'Strategically placed ventilation zones for maximum airflow and cooling.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'm5',
    name: 'Seamless Pima Cotton Tee',
    category: 'Mens',
    price: 2199,
    description: 'The ultimate base layer. Long-staple cotton for unmatched softness.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'm6',
    name: 'Signature Modal Briefs',
    category: 'Mens',
    price: 1350,
    description: 'Classic silhouette reimagined in heavy-weight modal for premium drape.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
    badges: ['Luxe Essentials'],
    /* Added missing stock property */
    stock: 50
  },

  // WOMENS - INTIMATES & LINGERIE
  {
    id: 'w1',
    name: 'Ethereal Silk Bralette',
    category: 'Womens',
    price: 3499,
    description: 'Pure Mulberry silk construction. Wire-free architecture for effortless poise.',
    image: 'https://unsplash.com/photos/woman-in-white-sports-bra-and-white-panty-5FuBbHonciU?q=80&w=800&auto=format&fit=crop',
    badges: ['Artisan'],
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'w2',
    name: 'Sculpt-Flow Bodysuit',
    category: 'Womens',
    price: 4899,
    description: 'Seamless contouring that defines without restricting. Perfect base layer.',
    image: 'https://unsplash.com/photos/woman-kneeling-on-bed-WU_y9Iz5x4o?q=80&w=800&auto=format&fit=crop',
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'w3',
    name: 'No-Show Aura Set',
    category: 'Womens',
    price: 2299,
    description: 'Laser-cut precision edges. Invisible even under the most fitted silk dresses.',
    image: 'https://unsplash.com/photos/a-woman-wearing-a-blue-swimsuit-_ppO1_1Gios?q=80&w=800&auto=format&fit=crop',
    badges: ['Essential'],
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'w4',
    name: 'Plunge Micro-Mesh Bra',
    category: 'Womens',
    price: 3199,
    description: 'Architecture meets comfort. Strategic support with sheer aesthetic panels.',
    image: 'https://unsplash.com/photos/three-womens-underwear-on-a-white-table-sTMqdpeJG6E?q=80&w=800&auto=format&fit=crop',
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'w5',
    name: 'Silk Lace Chemise',
    category: 'Womens',
    price: 5999,
    description: 'Intricate French lace paired with 22-momme silk for ultimate nighttime luxury.',
    image: 'https://www.istockphoto.com/photo/yellow-cotton-bra-on-violet-background-gm475766222-65548767?q=80&w=800&auto=format&fit=crop',
    badges: ['Premium'],
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'w6',
    name: 'High-Waist Contour Brief',
    category: 'Womens',
    price: 1799,
    description: 'Gentle compression mapping to smooth and support throughout the day.',
    image: 'https://www.istockphoto.com/photo/beautiful-woman-in-the-bed-gm696817510-129002997?q=80&w=800&auto=format&fit=crop',
    /* Added missing stock property */
    stock: 50
  },

  // ACTIVE - PERFORMANCE WEAR
  {
    id: 'a1',
    name: 'Gravity-Zero Sports Bra',
    category: 'Active',
    price: 4299,
    description: 'Encapsulation technology for high-impact activities. Zero bounce, pure focus.',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop',
    badges: ['High Impact'],
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'a2',
    name: 'Compress-Tech Legging',
    category: 'Active',
    price: 5499,
    description: 'Medical-grade compression mapping to improve blood flow during recovery.',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d17a12?q=80&w=800&auto=format&fit=crop',
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'a3',
    name: 'Velocity Base Layer',
    category: 'Active',
    price: 2899,
    description: 'Micro-perforated fabric for extreme moisture management in peak heat.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'a4',
    name: 'Dynamic Short Liner',
    category: 'Active',
    price: 1999,
    description: 'Ultra-lightweight liner with hidden key pocket and anti-chafe finish.',
    image: 'https://images.unsplash.com/photo-1539109132314-34a93663a700?q=80&w=800&auto=format&fit=crop',
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'a5',
    name: 'Aero-Compression Tank',
    category: 'Active',
    price: 3200,
    description: 'Stay dry with advanced moisture-wicking yarns and ergonomic seaming.',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop',
    badges: ['Pro-Series'],
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 'a6',
    name: 'Seamless Utility Bralette',
    category: 'Active',
    price: 2799,
    description: 'Hybrid design for low-impact yoga and daily active lifestyle.',
    image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=800&auto=format&fit=crop',
    /* Added missing stock property */
    stock: 50
  },

  // SLEEPWEAR - COMFORT & RELAXATION
  {
    id: 's1',
    name: 'Midnight Modal Robe',
    category: 'Sleepwear',
    price: 7999,
    description: 'A draped masterpiece in heavy-weight modal. The pinnacle of relaxation.',
    image: 'https://images.unsplash.com/photo-1589156206699-bc21e38c8a7d?q=80&w=800&auto=format&fit=crop',
    badges: ['Collector'],
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 's2',
    name: 'Cloud-Knit Sleep Set',
    category: 'Sleepwear',
    price: 4599,
    description: 'Brushed micro-knits that mimic the softness of a summer cloud.',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop',
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 's3',
    name: 'Pure Cashmere Eyemask',
    category: 'Sleepwear',
    price: 2499,
    description: '100% Grade-A cashmere. Total darkness for deep, restorative REM cycles.',
    image: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=800&auto=format&fit=crop',
    badges: ['Limited'],
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 's4',
    name: 'Nocturnal Silk Pant',
    category: 'Sleepwear',
    price: 5299,
    description: 'Wide-leg architecture in 22mm momme silk. Cooling and decadent.',
    image: 'https://images.unsplash.com/photo-1598559069352-3d8437b0d42c?q=80&w=800&auto=format&fit=crop',
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 's5',
    name: 'Brushed Cotton Lounge Set',
    category: 'Sleepwear',
    price: 3900,
    description: 'Heavyweight brushed cotton for chilly nights. Oversized, cozy fit.',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop',
    /* Added missing stock property */
    stock: 50
  },
  {
    id: 's6',
    name: 'Organic Modal Nightgown',
    category: 'Sleepwear',
    price: 4199,
    description: 'Minimalist drape with adjustable straps for a custom comfort level.',
    image: 'https://images.unsplash.com/photo-1590735204550-51255e7a75fa?q=80&w=800&auto=format&fit=crop',
    badges: ['Eco-Luxe'],
    /* Added missing stock property */
    stock: 50
  }
];

export const GST_RATE = 0.18;
