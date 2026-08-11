import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { 
  Calculator, 
  Car, 
  Ship, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Globe2, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export default function Home() {
  const [aedPrice, setAedPrice] = useState(120000);
  const [shippingType, setShippingType] = useState('container'); // container or roro
  const exchangeRate = 0.272; // 1 AED to USD approx

  // Calculate Breakdown
  const carUsd = Math.round(aedPrice * exchangeRate);
  const shippingCost = shippingType === 'container' ? 1800 : 1200;
  const insuranceAndAdmin = Math.round(carUsd * 0.03);
  const estimatedCustoms = Math.round(carUsd * 0.40); // Avg 40% tariff
  const grandTotal = carUsd + shippingCost + insuranceAndAdmin + estimatedCustoms;

  return (
    <div className="min-h-screen bg-[#131b26] text-slate-100 font-sans selection:bg-accentBlue selection:text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a2432] border border-slate-700/50 shadow-neo-flat text-accentBlue text-xs font-semibold">
              <Sparkles size={14} /> Direct Vehicle Import from UAE
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Import Your Dream Car From <span className="text-transparent bg-clip-text bg-gradient-to-r from-accentBlue to-cyan-400">Dubai</span> With Zero Hassle
            </h1>
            
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Transparent pricing, live AED to USD conversion, real-time customs clearance, and insured sea freight straight to your door.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#calculator" 
                className="px-8 py-3.5 rounded-xl bg-accentBlue text-slate-950 font-bold text-sm shadow-neo-btn hover:brightness-110 transition flex items-center gap-2"
              >
                Calculate Import Cost <ArrowRight size={18} />
              </a>
              <a 
                href="#inventory" 
                className="px-8 py-3.5 rounded-xl bg-[#1a2432] text-slate-200 font-bold text-sm shadow-neo-btn hover:shadow-neo-pressed border border-slate-700/40 transition"
              >
                Browse Inventory
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80">
              <div>
                <p className="text-2xl font-black text-white font-mono">1,200+</p>
                <p className="text-xs text-slate-400 mt-0.5">Vehicles Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white font-mono">14 Days</p>
                <p className="text-xs text-slate-400 mt-0.5">Average Shipping</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white font-mono">100%</p>
                <p className="text-xs text-slate-400 mt-0.5">Insured Transit</p>
              </div>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-accentBlue/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-50"></div>
            <div className="relative rounded-3xl bg-[#1a2432] p-3 border border-slate-700/40 shadow-neo-flat overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80" 
                alt="Dubai Luxury Car Import" 
                className="w-full h-[380px] object-cover rounded-2xl"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#131b26]/90 backdrop-blur-md border border-slate-700/50 flex justify-between items-center shadow-lg">
                <div>
                  <p className="text-xs text-slate-400">Featured Vessel Arrival</p>
                  <p className="text-sm font-bold text-white">Jebel Ali ➔ Destination Port</p>
                </div>
                <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full">On Schedule</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Cost Calculator Section */}
      <section id="calculator" className="py-16 bg-[#17212e]/50 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center justify-center gap-2">
              <Calculator className="text-accentBlue" /> Transparent Cost Calculator
            </h2>
            <p className="text-slate-400 text-sm">No hidden fees. Estimate exact costs including purchase, logistics, and duties.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Form */}
            <div className="lg:col-span-6 bg-[#1a2432] p-6 sm:p-8 rounded-2xl shadow-neo-flat border border-slate-700/30 space-y-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  1. Vehicle Price in Dubai (AED)
                </label>
                <div className="bg-[#131b26] p-3 rounded-xl shadow-neo-pressed border border-slate-800 flex items-center">
                  <input 
                    type="number" 
                    value={aedPrice} 
                    onChange={(e) => setAedPrice(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-transparent text-xl font-mono font-bold text-accentBlue outline-none"
                  />
                  <span className="text-xs text-slate-500 font-bold px-2">AED</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Approx. ${carUsd.toLocaleString()} USD</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  2. Shipping Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setShippingType('container')}
                    className={`p-3 rounded-xl text-xs font-semibold border transition text-center ${
                      shippingType === 'container' 
                        ? 'bg-accentBlue/10 border-accentBlue text-accentBlue shadow-neo-pressed' 
                        : 'bg-[#131b26] border-slate-800 text-slate-400'
                    }`}
                  >
                    Container Shipping ($1,800)
                  </button>
                  <button 
                    onClick={() => setShippingType('roro')}
                    className={`p-3 rounded-xl text-xs font-semibold border transition text-center ${
                      shippingType === 'roro' 
                        ? 'bg-accentBlue/10 border-accentBlue text-accentBlue shadow-neo-pressed' 
                        : 'bg-[#131b26] border-slate-800 text-slate-400'
                    }`}
                  >
                    Ro-Ro Carrier ($1,200)
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full py-4 rounded-xl bg-accentBlue text-slate-950 font-bold text-sm shadow-neo-btn hover:brightness-110 transition">
                  Proceed with Inspection Request
                </button>
              </div>
            </div>

            {/* Price Breakdown Display */}
            <div className="lg:col-span-6 bg-[#1a2432] p-6 sm:p-8 rounded-2xl shadow-neo-flat border border-slate-700/30">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-6 border-b border-slate-800 pb-3">
                Estimated Price Breakdown
              </h3>

              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-sans text-xs text-slate-400">Base Car Price ({aedPrice.toLocaleString()} AED)</span>
                  <span>${carUsd.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-sans text-xs text-slate-400">Ocean Freight ({shippingType.toUpperCase()})</span>
                  <span>${shippingCost.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-sans text-xs text-slate-400">Marine Insurance & Admin Fees</span>
                  <span>${insuranceAndAdmin.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-sans text-xs text-slate-400">Estimated Customs Tariff & Port Charges</span>
                  <span>${estimatedCustoms.toLocaleString()} USD</span>
                </div>

                <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-white">
                  <div className="font-sans">
                    <p className="font-bold text-base">Est. Total Delivered Cost</p>
                    <p className="text-[10px] text-slate-500">Includes all port taxes and handling</p>
                  </div>
                  <span className="text-2xl font-black text-emerald-400">${grandTotal.toLocaleString()} USD</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">How Import Works</h2>
          <p className="text-slate-400 text-sm">4 simple steps to get your vehicle from Dubai showroom to your driveway.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Vehicle Selection', desc: 'Choose from our verified Dubai inventory or request a custom car search.', icon: Search },
            { step: '02', title: 'Physical Inspection', desc: 'Our certified Dubai team conducts a 150-point technical report.', icon: CheckCircle2 },
            { step: '03', title: 'Secure Shipping', desc: 'Vehicle is loaded onto ocean vessels with full marine insurance coverage.', icon: Ship },
            { step: '04', title: 'Customs & Delivery', desc: 'We handle all customs documentation and deliver directly to your address.', icon: Globe2 },
          ].map((item, index) => (
            <div key={index} className="bg-[#1a2432] p-6 rounded-2xl shadow-neo-flat border border-slate-700/30 relative">
              <span className="text-3xl font-mono font-black text-slate-700/50 absolute top-4 right-4">{item.step}</span>
              <div className="w-10 h-10 rounded-xl bg-[#131b26] text-accentBlue flex items-center justify-center shadow-neo-pressed mb-4">
                <item.icon size={20} />
              </div>
              <h3 className="font-bold text-white text-base mb-2">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Inventory Grid */}
      <section id="inventory" className="py-16 bg-[#17212e]/30 border-t border-slate-800/60 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Available Dubai Inventory</h2>
            <p className="text-xs text-slate-400">Ready for instant ocean shipment</p>
          </div>
          <span className="text-xs text-slate-500 font-mono">Updated Today • Live Exchange: 1 AED ≈ $0.272 USD</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              name: 'Mercedes-Benz C200 AMG 2024', 
              priceAed: 185000, 
              image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
              specs: 'Zero Km • GCC Specs • Full Option' 
            },
            { 
              name: 'Toyota Land Cruiser V8 2023', 
              priceAed: 310000, 
              image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
              specs: '12,000 Km • GCC Specs • Sunroof' 
            },
            { 
              name: 'Porsche Macan GTS 2024', 
              priceAed: 390000, 
              image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
              specs: 'Brand New • Warranty Included' 
            },
          ].map((car, idx) => (
            <div key={idx} className="bg-[#1a2432] rounded-2xl shadow-neo-flat border border-slate-700/30 overflow-hidden flex flex-col justify-between">
              <div className="relative h-48 bg-[#131b26]">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-[#131b26]/90 text-accentBlue text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700">
                  Ready to Ship
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white text-base mb-1">{car.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{car.specs}</p>
                <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Dubai Price</p>
                    <p className="text-sm font-bold font-mono text-accentBlue">{car.priceAed.toLocaleString()} AED</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase">Est. USD</p>
                    <p className="text-sm font-bold font-mono text-emerald-400">${Math.round(car.priceAed * exchangeRate).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5">
                <button className="w-full py-2.5 rounded-xl bg-[#131b26] text-accentBlue text-xs font-semibold shadow-neo-btn hover:shadow-neo-pressed border border-slate-700/40 transition">
                  Request Full Inspection Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0f151e] border-t border-slate-800/80 text-center text-xs text-slate-500">
        <p>© 2026 CarExpress UAE. All rights reserved. Direct Vehicle Import Platform.</p>
      </footer>
    </div>
  );
}