'use client';

import React from 'react';
import { Product, CATEGORIES } from '@/lib/mock-data';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';
import Image from 'next/image';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, wishlist, setSelectedProduct } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-[#FDFBF7]"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F2EC] rounded-2xl mb-3 cursor-pointer border border-[#E5E1D8]" onClick={() => setSelectedProduct(product)}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {/* Secondary Image on Hover */}
        {product.gallery.length > 1 && (
          <Image
            src={product.gallery[1]}
            alt={`${product.title} alternate view`}
            fill
            className="absolute inset-0 object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            referrerPolicy="no-referrer"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="bg-[#8B7E66] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-full">
              New
            </span>
          )}
          {product.discount && (
            <span className="bg-[#E5E1D8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2D2D2D] rounded-full">
              {product.discount}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10 text-[#8B7E66]"
        >
          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-[#8B7E66] text-[#8B7E66]' : 'text-[#8B7E66]'}`} />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-3 translate-y-full opacity-0 transition-transform duration-300 group-hover:translate-y-0 group-hover:opacity-100 bg-[#2D2D2D]/90 z-20">
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
            className="w-full text-white text-xs font-bold uppercase tracking-wider text-center"
          >
            QUICK ADD +
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 px-1">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="text-sm font-medium text-[#2D2D2D] line-clamp-2 leading-snug cursor-pointer hover:underline" onClick={() => setSelectedProduct(product)}>
              {product.title}
            </h3>
            <p className="text-xs text-[#7A7368] mt-1">{product.category}</p>
          </div>
          <div className="flex items-center gap-1 text-xs shrink-0 pt-0.5">
            <Star className="w-3 h-3 fill-[#8B7E66] text-[#8B7E66]" />
            <span className="font-medium text-[#7A7368]">{product.rating}</span>
          </div>
        </div>
        
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-[#2D2D2D]">৳{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm font-normal text-[#A19B8F] line-through">৳{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        
        {/* Colors quick view */}
        <div className="mt-3 flex gap-1.5">
          {product.colors.map((color, idx) => (
            <div 
              key={idx} 
              className="w-3 h-3 rounded-full border border-[#E5E1D8]"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
