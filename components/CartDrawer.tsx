'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, setIsCheckoutOpen } = useStore();

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.15; // 15% VAT simulation
  const total = subtotal + tax;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FDFBF7] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#E5E1D8]">
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#2D2D2D]">
                <ShoppingBag className="w-5 h-5" /> Your Cart ({cart.length})
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#7A7368] hover:text-[#2D2D2D] hover:bg-[#F5F2EC] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#A19B8F] space-y-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p className="text-lg font-medium text-[#7A7368]">Your cart is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2 bg-[#2D2D2D] text-white rounded-md text-sm font-medium hover:bg-black transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-20 h-24 bg-[#F5F2EC] border border-[#E5E1D8] rounded-md overflow-hidden shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      {/* Details */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="text-sm font-medium text-[#2D2D2D] leading-snug truncate">{item.product.title}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#A19B8F] hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <p className="text-xs text-[#7A7368] mb-2">
                          Size: {item.selectedSize} | Color: {item.selectedColor.name}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border border-[#E5E1D8] rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                              className="px-2 py-1 text-[#7A7368] hover:text-[#2D2D2D] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-medium w-6 text-center text-[#2D2D2D]">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                              className="px-2 py-1 text-[#7A7368] hover:text-[#2D2D2D] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-[#2D2D2D]">৳{(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-[#E5E1D8] p-5 bg-[#F5F2EC] mt-auto">
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-[#7A7368]">
                    <span>Subtotal</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#7A7368]">
                    <span>Estimated Tax (15%)</span>
                    <span>৳{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#7A7368]">
                    <span>Shipping</span>
                    <span className="text-[#8B7E66] font-medium">Free</span>
                  </div>
                  <div className="h-px bg-[#E5E1D8] my-2" />
                  <div className="flex justify-between text-lg font-bold text-[#2D2D2D]">
                    <span>Total</span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#2D2D2D] text-white py-4 rounded-md font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg"
                >
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-xs text-center text-[#7A7368] mt-4">
                  Taxes and shipping calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
