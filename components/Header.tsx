'use client';

import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { cart, setIsCartOpen, wishlist } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = ['Men', 'Women', 'Kids', 'New Arrivals', 'Sale'];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#E5E1D8] transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#5A5348] hover:text-[#2D2D2D] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="text-2xl font-semibold tracking-tight text-[#5A5348] uppercase">
              AURA
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href="#" 
                className="text-sm font-medium text-[#7A7368] hover:text-[#2D2D2D] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="hidden sm:block relative">
              <input 
                type="text" 
                placeholder="Search apparel..." 
                className="w-48 lg:w-64 pl-10 pr-4 py-1.5 bg-[#F5F2EC] border border-[#E5E1D8] focus:bg-white focus:border-[#8B7E66] focus:ring-0 rounded-full text-xs text-[#2D2D2D] transition-all outline-none"
              />
              <Search className="w-4 h-4 text-[#A19B8F] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            
            <button className="hidden sm:flex p-2 text-[#5A5348] hover:text-[#2D2D2D] transition-colors relative">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8B7E66] rounded-full"></span>
              )}
            </button>
            
            <button className="hidden sm:block p-2 text-[#5A5348] hover:text-[#2D2D2D] transition-colors">
              <User className="w-5 h-5" />
            </button>
            
            <button 
              className="p-2 text-[#5A5348] hover:text-[#2D2D2D] transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#8B7E66] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#FDFBF7] border-t border-[#E5E1D8] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <div className="mb-4 relative">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full pl-10 pr-4 py-2 bg-[#F5F2EC] border border-[#E5E1D8] rounded-full text-sm outline-none focus:border-[#8B7E66]"
                />
                <Search className="w-4 h-4 text-[#A19B8F] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {navLinks.map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="block px-3 py-3 text-base font-medium text-[#5A5348] hover:bg-[#F5F2EC] rounded-md"
                >
                  {link}
                </a>
              ))}
              <div className="border-t border-[#E5E1D8] mt-4 pt-4 flex gap-4">
                 <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-[#5A5348] bg-[#F5F2EC] rounded-md border border-[#E5E1D8]">
                   <User className="w-4 h-4" /> Account
                 </button>
                 <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-[#5A5348] bg-[#F5F2EC] rounded-md border border-[#E5E1D8]">
                   <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
