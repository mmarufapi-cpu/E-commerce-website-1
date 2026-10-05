'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, CreditCard, Banknote, Smartphone } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutView() {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, clearCart } = useStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mfs' | 'cod'>('cod');
  const [orderId, setOrderId] = useState<number>(123456);

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const total = subtotal + (subtotal * 0.15);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderId(Math.floor(100000 + Math.random() * 900000));
    setStep(3); // Success step
    clearCart();
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setTimeout(() => setStep(1), 500);
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#FDFBF7] overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-[#F5F2EC] p-4 rounded-xl shadow-sm border border-[#E5E1D8]">
          <h1 className="text-2xl font-bold tracking-tighter text-[#2D2D2D]">AURA. Checkout</h1>
          <button onClick={closeCheckout} className="p-2 hover:bg-white rounded-full transition text-[#7A7368]">
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 3 ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto bg-[#F5F2EC] p-8 rounded-2xl shadow-sm border border-[#E5E1D8] text-center mt-12"
          >
            <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-[#2D2D2D]">Order Confirmed!</h2>
            <p className="text-[#7A7368] mb-6">Your order #AUR-{orderId} has been placed successfully. We&apos;ll send you an email with tracking details.</p>
            <button 
              onClick={closeCheckout}
              className="w-full bg-[#2D2D2D] text-white py-3 rounded-md font-medium hover:bg-black transition"
            >
              Continue Shopping
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Col: Forms */}
            <div className="flex-1 space-y-6">
              {/* Shipping Address */}
              <div className="bg-[#F5F2EC] p-6 rounded-2xl shadow-sm border border-[#E5E1D8]">
                <h2 className="text-xl font-bold mb-6 text-[#2D2D2D]">Shipping Address</h2>
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5A5348] mb-1">First Name</label>
                      <input type="text" className="w-full bg-white border-[#E5E1D8] rounded-md shadow-sm focus:ring-[#8B7E66] focus:border-[#8B7E66] p-2 border outline-none text-[#2D2D2D]" required defaultValue="Jane" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5A5348] mb-1">Last Name</label>
                      <input type="text" className="w-full bg-white border-[#E5E1D8] rounded-md shadow-sm focus:ring-[#8B7E66] focus:border-[#8B7E66] p-2 border outline-none text-[#2D2D2D]" required defaultValue="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5A5348] mb-1">Email</label>
                    <input type="email" className="w-full bg-white border-[#E5E1D8] rounded-md shadow-sm focus:ring-[#8B7E66] focus:border-[#8B7E66] p-2 border outline-none text-[#2D2D2D]" required defaultValue="jane@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5A5348] mb-1">Phone Number</label>
                    <input type="tel" className="w-full bg-white border-[#E5E1D8] rounded-md shadow-sm focus:ring-[#8B7E66] focus:border-[#8B7E66] p-2 border outline-none text-[#2D2D2D]" required defaultValue="+880 1711 123456" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5A5348] mb-1">Street Address</label>
                    <input type="text" className="w-full bg-white border-[#E5E1D8] rounded-md shadow-sm focus:ring-[#8B7E66] focus:border-[#8B7E66] p-2 border outline-none text-[#2D2D2D]" required defaultValue="House 12, Road 4, Banani" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5A5348] mb-1">City</label>
                      <input type="text" className="w-full bg-white border-[#E5E1D8] rounded-md shadow-sm focus:ring-[#8B7E66] focus:border-[#8B7E66] p-2 border outline-none text-[#2D2D2D]" required defaultValue="Dhaka" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5A5348] mb-1">Postal Code</label>
                      <input type="text" className="w-full bg-white border-[#E5E1D8] rounded-md shadow-sm focus:ring-[#8B7E66] focus:border-[#8B7E66] p-2 border outline-none text-[#2D2D2D]" required defaultValue="1213" />
                    </div>
                  </div>
                </form>
              </div>

              {/* Payment Method */}
              <div className="bg-[#F5F2EC] p-6 rounded-2xl shadow-sm border border-[#E5E1D8]">
                <h2 className="text-xl font-bold mb-6 text-[#2D2D2D]">Payment Method</h2>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#8B7E66] bg-white' : 'border-[#E5E1D8] bg-white hover:border-[#A19B8F]'}`}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-[#8B7E66] focus:ring-[#8B7E66]" />
                    <Banknote className="w-6 h-6 ml-4 mr-3 text-[#7A7368]" />
                    <span className="font-medium text-[#2D2D2D]">Cash on Delivery</span>
                  </label>
                  
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'mfs' ? 'border-[#8B7E66] bg-white' : 'border-[#E5E1D8] bg-white hover:border-[#A19B8F]'}`}>
                    <input type="radio" name="payment" value="mfs" checked={paymentMethod === 'mfs'} onChange={() => setPaymentMethod('mfs')} className="w-4 h-4 text-[#8B7E66] focus:ring-[#8B7E66]" />
                    <Smartphone className="w-6 h-6 ml-4 mr-3 text-[#7A7368]" />
                    <div>
                      <span className="font-medium text-[#2D2D2D] block">Mobile Banking</span>
                      <span className="text-xs text-[#7A7368]">bKash, Nagad, Rocket</span>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#8B7E66] bg-white' : 'border-[#E5E1D8] bg-white hover:border-[#A19B8F]'}`}>
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 text-[#8B7E66] focus:ring-[#8B7E66]" />
                    <CreditCard className="w-6 h-6 ml-4 mr-3 text-[#7A7368]" />
                    <span className="font-medium text-[#2D2D2D]">Credit / Debit Card</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Col: Order Summary */}
            <div className="w-full lg:w-[400px]">
              <div className="bg-[#F5F2EC] p-6 rounded-2xl shadow-sm border border-[#E5E1D8] sticky top-8">
                <h2 className="text-xl font-bold mb-6 text-[#2D2D2D]">Order Summary</h2>
                
                <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-20 bg-white rounded-md overflow-hidden shrink-0 border border-[#E5E1D8]">
                        <Image src={item.product.image} alt={item.product.title} fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-medium leading-tight truncate text-[#2D2D2D]">{item.product.title}</p>
                        <p className="text-[#7A7368] text-xs mt-1">{item.selectedColor.name} | {item.selectedSize} | Qty: {item.quantity}</p>
                        <p className="font-semibold mt-2 text-[#2D2D2D]">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E5E1D8] pt-4 space-y-3 text-sm">
                  <div className="flex justify-between text-[#7A7368]">
                    <span>Subtotal</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#7A7368]">
                    <span>Tax (15%)</span>
                    <span>৳{(subtotal * 0.15).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#7A7368]">
                    <span>Shipping</span>
                    <span className="text-[#8B7E66] font-medium">Free</span>
                  </div>
                  <div className="border-t border-[#E5E1D8] pt-3 mt-3">
                    <div className="flex justify-between text-xl font-bold text-[#2D2D2D]">
                      <span>Total</span>
                      <span>৳{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#2D2D2D] text-white py-4 rounded-md font-bold text-lg mt-8 hover:bg-black transition-colors shadow-lg shadow-black/20"
                >
                  Place Order
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
