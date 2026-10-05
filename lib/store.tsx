'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Size, Color } from './mock-data';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize: Size;
  selectedColor: Color;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[]; // array of product ids
  addToCart: (product: Product, quantity: number, size: Size, color: Color) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (isOpen: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('aura-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('aura-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem('aura-cart', JSON.stringify(cart));
      localStorage.setItem('aura-wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [cart, wishlist]);

  const addToCart = (product: Product, quantity: number, size: Size, color: Color) => {
    setCart(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === size && item.selectedColor.name === color.name
      );
      if (existingItemIndex >= 0) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }
      return [...prev, {
        id: `${product.id}-${size}-${color.name}-${Date.now()}`,
        product,
        quantity,
        selectedSize: size,
        selectedColor: color
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity } : item));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{
      cart, wishlist, addToCart, removeFromCart, updateQuantity, toggleWishlist, clearCart,
      isCartOpen, setIsCartOpen, isCheckoutOpen, setIsCheckoutOpen,
      selectedProduct, setSelectedProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
