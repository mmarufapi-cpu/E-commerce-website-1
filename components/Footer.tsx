'use client';

import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F5F2EC] border-t border-[#E5E1D8] pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Intro */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight text-[#5A5348] uppercase">AURA</h3>
            <p className="text-[#7A7368] text-sm leading-relaxed max-w-xs">
              Elevating everyday essentials with premium fabrics and timeless design. Designed for the modern individual.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#7A7368] hover:bg-[#8B7E66] hover:text-white transition-colors border border-[#E5E1D8]">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#7A7368] hover:bg-[#8B7E66] hover:text-white transition-colors border border-[#E5E1D8]">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#7A7368] hover:bg-[#8B7E66] hover:text-white transition-colors border border-[#E5E1D8]">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#5A5348]">Shop</h4>
            <ul className="space-y-3 text-sm text-[#7A7368]">
              <li><a href="#" className="hover:text-[#2D2D2D] transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-[#2D2D2D] transition-colors">Men&apos;s Collection</a></li>
              <li><a href="#" className="hover:text-[#2D2D2D] transition-colors">Women&apos;s Collection</a></li>
              <li><a href="#" className="hover:text-[#2D2D2D] transition-colors">Kids</a></li>
              <li><a href="#" className="hover:text-[#2D2D2D] transition-colors text-red-700">Sale & Offers</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#5A5348]">Support</h4>
            <ul className="space-y-3 text-sm text-[#7A7368]">
              <li><a href="#" className="hover:text-[#2D2D2D] transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-[#2D2D2D] transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-[#2D2D2D] transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-[#2D2D2D] transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-[#2D2D2D] transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#5A5348]">Contact Us</h4>
            <ul className="space-y-4 text-sm text-[#7A7368]">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-[#A19B8F]" />
                <span>123 Fashion Ave, Suite 400<br/>Dhaka, Bangladesh 1213</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-[#A19B8F]" />
                <span>+880 1711-000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-[#A19B8F]" />
                <span>support@aura-apparel.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#E5E1D8] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#A19B8F] text-[10px] uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} Aura Apparel. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
            <span className="text-[10px] font-bold text-[#2D2D2D] uppercase tracking-widest">Visa / Mastercard / Amex</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
