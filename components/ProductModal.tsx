'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Product, Size, Color } from '@/lib/mock-data';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Plus, Minus, Heart, Ruler, Check, Maximize2, Minimize2 } from 'lucide-react';
import Image from 'next/image';

export default function ProductModal() {
  const { selectedProduct, setSelectedProduct } = useStore();

  if (!selectedProduct) return null;

  return <ProductModalContent key={selectedProduct.id} product={selectedProduct} onClose={() => setSelectedProduct(null)} />;
}

function ProductModalContent({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<Color>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric'>('details');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedSuccess(true);
    setTimeout(() => {
      onClose();
      setAddedSuccess(false);
    }, 1000);
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % product.gallery.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + product.gallery.length) % product.gallery.length);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
        />
        
        {/* Bottom Sheet on Mobile / Modal on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: '100%', scale: 1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: '100%', scale: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative bg-[#FDFBF7] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col sm:flex-row z-10 transition-all duration-300 ${
            isFullScreen ? 'h-[96vh] sm:max-h-[90vh]' : 'max-h-[92vh] sm:max-h-[90vh]'
          }`}
        >
          {/* Mobile Drag Handle Bar / Header to toggle full screen */}
          <div 
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="w-full sm:hidden pt-2 pb-1.5 flex flex-col items-center cursor-pointer shrink-0 bg-[#F5F2EC]/80 border-b border-[#E5E1D8] active:bg-[#EAE5DC]"
            title="Tap or drag to toggle full screen"
          >
            <div className="w-12 h-1.5 bg-[#A19B8F] rounded-full my-1" />
            <div className="flex items-center gap-1.5 text-[11px] text-[#5A5348] font-medium uppercase tracking-wider pb-0.5">
              {isFullScreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" /> Tap to collapse
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" /> Tap for full screen
                </>
              )}
            </div>
          </div>

          {/* Close Button (Desktop & Mobile) */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-[#F5F2EC]/90 backdrop-blur-md rounded-full text-[#7A7368] hover:text-[#2D2D2D] transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Image Gallery */}
          <div className={`w-full sm:w-1/2 relative bg-[#F5F2EC] ${isFullScreen ? 'h-[45vh] sm:h-auto' : 'h-[35vh] sm:h-auto'} min-h-[280px] transition-all`}>
             <Image
              src={product.gallery[currentImageIndex]}
              alt={product.title}
              fill
              className="object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {product.gallery.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow hover:bg-white transition text-[#5A5348]">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow hover:bg-white transition text-[#5A5348]">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.gallery.map((_, idx) => (
                    <div key={idx} className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-[#8B7E66]' : 'bg-white/50 border border-[#E5E1D8]'}`} />
                  ))}
                </div>
              </>
            )}
            
            {product.discount && (
              <span className="absolute top-4 left-4 bg-[#E5E1D8] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2D2D2D] rounded-full">
                {product.discount}
              </span>
            )}
          </div>

          {/* Right: Details */}
          <div className="w-full sm:w-1/2 p-6 sm:p-8 overflow-y-auto flex-1">
            <div className="mb-6">
              <p className="text-xs text-[#7A7368] uppercase tracking-widest mb-2">{product.category}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2D2D] leading-tight mb-3">{product.title}</h2>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold text-[#2D2D2D]">৳{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-[#A19B8F] line-through">৳{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-[#5A5348]">Color: <span className="text-[#7A7368] ml-1">{selectedColor.name}</span></span>
              </div>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${selectedColor.name === color.name ? 'border-[#8B7E66]' : 'border-transparent'}`}
                  >
                    <div className="w-full h-full rounded-full border border-[#E5E1D8]" style={{ backgroundColor: color.hex }} title={color.name} />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-[#5A5348]">Size</span>
                <button className="text-xs text-[#7A7368] hover:text-[#2D2D2D] underline flex items-center gap-1">
                  <Ruler className="w-3 h-3" /> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 text-sm font-medium rounded-md border transition-all ${
                      selectedSize === size 
                        ? 'border-[#2D2D2D] bg-[#2D2D2D] text-white' 
                        : 'border-[#E5E1D8] text-[#7A7368] hover:border-[#8B7E66]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-sm font-medium text-[#5A5348] block mb-3">Quantity</span>
              <div className="flex items-center w-32 border border-[#E5E1D8] rounded-md">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-[#7A7368] hover:text-[#2D2D2D] hover:bg-[#F5F2EC] transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center text-sm font-medium text-[#2D2D2D]">{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-[#7A7368] hover:text-[#2D2D2D] hover:bg-[#F5F2EC] transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button 
                onClick={handleAddToCart}
                disabled={addedSuccess}
                className={`flex-1 py-3.5 px-6 rounded-md text-sm font-bold tracking-wide uppercase transition-all flex items-center justify-center gap-2 ${
                  addedSuccess ? 'bg-[#8B7E66] text-white' : 'bg-[#2D2D2D] text-white hover:bg-black'
                }`}
              >
                {addedSuccess ? <><Check className="w-5 h-5"/> Added</> : 'Add to Cart'}
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="p-3.5 border border-[#E5E1D8] rounded-md hover:border-[#8B7E66] hover:bg-[#F5F2EC] transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#8B7E66] text-[#8B7E66]' : 'text-[#7A7368]'}`} />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-t border-[#E5E1D8] pt-6">
              <div className="flex gap-6 border-b border-[#E5E1D8] mb-4">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'details' ? 'text-[#2D2D2D]' : 'text-[#7A7368]'}`}
                >
                  Details
                  {activeTab === 'details' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B7E66]" />}
                </button>
                <button 
                  onClick={() => setActiveTab('fabric')}
                  className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'fabric' ? 'text-[#2D2D2D]' : 'text-[#7A7368]'}`}
                >
                  Fabric & Care
                  {activeTab === 'fabric' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B7E66]" />}
                </button>
              </div>
              <div className="text-sm text-[#7A7368] leading-relaxed min-h-[100px]">
                {activeTab === 'details' ? product.description : product.fabric}
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
