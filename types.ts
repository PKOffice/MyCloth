
export type Category = 'All' | 'Mens' | 'Womens' | 'Active' | 'Sleepwear';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  badges?: string[];
  stock: number;
  offerPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum SortOption {
  NONE = 'None',
  PRICE_LOW_HIGH = 'Price: Low to High',
  PRICE_HIGH_LOW = 'Price: High to Low',
  NAME_AZ = 'Name: A-Z'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'staff';
  token?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Manager' | 'Curator' | 'Inventory Lead' | 'Support';
  email: string;
  joinedAt: string;
  status: 'Active' | 'On Leave';
}
