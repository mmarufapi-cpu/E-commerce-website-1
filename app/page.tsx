'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import CartDrawer from '@/components/CartDrawer';
import CheckoutView from '@/components/CheckoutView';
import { PRODUCTS, CATEGORIES, Size, SIZES } from '@/lib/mock-data';
import { motion } from 'motion/react';
import { ArrowRight, Filter, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSort, setActiveSort] = useState<'featured'|'price-low'|'price-high'>('featured');
  const [activeSizeFilter, setActiveSizeFilter] = useState<Size | null>(null);

  // Filter & Sort Logic
  const filteredProducts = PRODUCTS.filter(p => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (activeSizeFilter && !p.sizes.includes(activeSizeFilter)) return false;
    return true;
  });

  if (activeSort === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (activeSort === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2D2D] font-sans selection:bg-[#8B7E66] selection:text-white flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] w-full bg-[#F5F2EC] overflow-hidden border-b border-[#E5E1D8]">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80"
            alt="New Collection Hero"
            fill
            className="object-cover object-center mix-blend-multiply opacity-80"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2EC] via-[#F5F2EC]/80 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center sm:justify-start container mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-xl text-center sm:text-left text-[#2D2D2D]"
            >
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#8B7E66] mb-4 block">Collection 2026</span>
              <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6 leading-tight">
                Organic Textures &<br /><span className="italic font-serif">Timeless Silhouettes</span>
              </h1>
              <p className="text-lg md:text-xl text-[#7A7368] mb-8 max-w-md mx-auto sm:mx-0">
                Discover the latest arrivals crafted with premium sustainable fabrics and timeless silhouettes.
              </p>
              <button className="bg-[#2D2D2D] text-white px-8 py-3 text-sm font-medium hover:bg-black transition-colors inline-flex items-center gap-3 rounded-sm">
                Shop Summer
              </button>
            </motion.div>
          </div>
        </section>

        {/* Main Shop Grid Area */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            
            {/* Sidebar Filters (Desktop) */}
            <div className="hidden md:block w-64 shrink-0 space-y-10">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-[#5A5348] mb-5">Categories</h3>
                <ul className="space-y-3">
                  {CATEGORIES.map(cat => (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={`text-sm transition-colors ${activeCategory === cat ? 'font-medium text-[#2D2D2D] border-b-2 border-[#8B7E66]' : 'text-[#7A7368] hover:text-[#2D2D2D]'}`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Filter */}
              <div>
                <h3 className="font-semibold text-[#5A5348] mb-5">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setActiveSizeFilter(activeSizeFilter === size ? null : size)}
                      className={`w-12 h-10 border text-sm transition-all flex items-center justify-center rounded-sm ${
                        activeSizeFilter === size 
                          ? 'border-[#2D2D2D] bg-[#2D2D2D] text-white' 
                          : 'border-[#E5E1D8] bg-white text-[#7A7368] hover:border-[#8B7E66]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Grid Area */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-[#E5E1D8]">
                <h2 className="text-xl font-medium text-[#5A5348]">
                  {activeCategory === 'All' ? 'All Products' : activeCategory} 
                  <span className="text-[#A19B8F] text-sm font-normal ml-2">({filteredProducts.length} items)</span>
                </h2>

                {/* Mobile Filter Toggle & Sort */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button className="md:hidden flex items-center gap-2 px-4 py-1.5 border border-[#E5E1D8] text-xs font-medium flex-1 justify-center bg-white rounded-full text-[#2D2D2D]">
                    <Filter className="w-3 h-3" /> Filters
                  </button>
                  
                  <div className="relative flex-1 sm:w-48 group">
                    <select 
                      className="w-full appearance-none border border-[#E5E1D8] rounded-full px-4 py-1.5 pr-8 text-xs font-medium bg-white focus:outline-none focus:border-[#8B7E66] cursor-pointer text-[#2D2D2D]"
                      value={activeSort}
                      onChange={(e) => setActiveSort(e.target.value as any)}
                    >
                      <option value="featured">Sort: Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A19B8F] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                  <button 
                    onClick={() => { setActiveCategory('All'); setActiveSizeFilter(null); }}
                    className="mt-4 text-black font-medium underline underline-offset-4 hover:text-gray-600"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="border-t border-[#E5E1D8] bg-[#F5F2EC] py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#E5E1D8]">
              <div className="p-4 text-[#5A5348]">
                <h4 className="font-semibold text-lg mb-2">Free Shipping</h4>
                <p className="text-[#7A7368] text-sm">On all orders over ৳5000</p>
              </div>
              <div className="p-4 text-[#5A5348]">
                <h4 className="font-semibold text-lg mb-2">Sustainable Materials</h4>
                <p className="text-[#7A7368] text-sm">Eco-friendly fabrics and processes</p>
              </div>
              <div className="p-4 text-[#5A5348]">
                <h4 className="font-semibold text-lg mb-2">Easy Returns</h4>
                <p className="text-[#7A7368] text-sm">30-day return policy</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Modals & Overlays */}
      <ProductModal />
      <CartDrawer />
      <CheckoutView />
    </div>
  );
}
