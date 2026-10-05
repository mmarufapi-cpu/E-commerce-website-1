export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type Color = { name: string; hex: string };

export interface Product {
  id: string;
  title: string;
  category: 'Men' | 'Women' | 'Kids' | 'New Arrivals' | 'Sale';
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  sizes: Size[];
  colors: Color[];
  description: string;
  fabric: string;
  isNew?: boolean;
  discount?: string;
  rating: number;
  reviews: number;
}

export const CATEGORIES = ['All', 'Men', 'Women', 'Kids', 'New Arrivals', 'Sale'];
export const SIZES: Size[] = ['S', 'M', 'L', 'XL', 'XXL'];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Essential Premium Heavyweight T-Shirt',
    category: 'Men',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#ffffff' },
      { name: 'Olive', hex: '#556b2f' }
    ],
    description: 'Our premium heavyweight t-shirt offers a structured, relaxed fit. Crafted from 100% organic cotton for ultimate comfort and durability.',
    fabric: '100% Organic Heavyweight Cotton (240 GSM)',
    isNew: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'p2',
    title: 'Classic Denim Trucker Jacket',
    category: 'Men',
    price: 3500,
    originalPrice: 4500,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Indigo', hex: '#28324e' },
      { name: 'Light Wash', hex: '#87a2ba' }
    ],
    description: 'The iconic denim jacket, updated with a modern fit and subtle stretch. Perfect for layering year-round.',
    fabric: '98% Cotton, 2% Elastane',
    discount: '22% OFF',
    rating: 4.5,
    reviews: 89
  },
  {
    id: 'p3',
    title: 'Flowy Floral Midi Dress',
    category: 'Women',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Red Floral', hex: '#a62c2b' },
      { name: 'Blue Floral', hex: '#436b95' }
    ],
    description: 'A breezy midi dress featuring a vibrant floral print, wrap-style bodice, and a tiered skirt.',
    fabric: '100% Viscose',
    rating: 4.9,
    reviews: 210
  },
  {
    id: 'p4',
    title: 'Oversized Vintage Wash Hoodie',
    category: 'Women',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Dusty Pink', hex: '#dca4a6' }
    ],
    description: 'Ultra-soft oversized hoodie with a vintage wash finish. Dropped shoulders and a cozy kangaroo pocket.',
    fabric: '80% Cotton, 20% Polyester',
    isNew: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 'p5',
    title: 'Slim Fit Selvedge Jeans',
    category: 'Men',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Raw Indigo', hex: '#111e3b' }
    ],
    description: 'Premium selvedge denim woven on vintage shuttle looms. Slim fit with a slight taper below the knee.',
    fabric: '100% Selvedge Cotton Denim',
    rating: 4.6,
    reviews: 67
  },
  {
    id: 'p6',
    title: 'Kids Playtime Graphic Tee',
    category: 'Kids',
    price: 800,
    originalPrice: 1000,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Yellow', hex: '#ffc300' },
      { name: 'Sky Blue', hex: '#87ceeb' }
    ],
    description: 'Fun and durable graphic tee for kids. Made with soft, breathable cotton that withstands endless playtime.',
    fabric: '100% Combed Cotton',
    discount: '20% OFF',
    rating: 4.8,
    reviews: 42
  },
  {
    id: 'p7',
    title: 'Tailored Linen Blend Trousers',
    category: 'Women',
    price: 3100,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sand', hex: '#d9b382' },
      { name: 'White', hex: '#ffffff' }
    ],
    description: 'Elegant wide-leg trousers in a breathable linen blend. High-waisted with a pleated front.',
    fabric: '55% Linen, 45% Viscose',
    isNew: true,
    rating: 4.4,
    reviews: 112
  },
  {
    id: 'p8',
    title: 'Water-Resistant Windbreaker',
    category: 'Sale',
    price: 1800,
    originalPrice: 2800,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Neon Green', hex: '#39ff14' },
      { name: 'Black', hex: '#000000' }
    ],
    description: 'Lightweight packable windbreaker with a water-resistant coating. Perfect for unpredictable weather.',
    fabric: '100% Recycled Nylon',
    discount: '35% OFF',
    rating: 4.2,
    reviews: 315
  }
];
