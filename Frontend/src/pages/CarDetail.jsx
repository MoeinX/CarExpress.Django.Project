import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CARS_DATA } from '../data/cars';
import { ChevronLeft, ChevronRight, MapPin, ShieldCheck, PhoneCall, Calculator } from 'lucide-react';

export default function CarDetail() {
  const { id } = useParams();
  const car = CARS_DATA.find((c) => c.id === id) || CARS_DATA[0];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const exchangeRate = 0.272;

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navyDeep text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <Link to="/inventory" className="text-xs font-bold text-electricOrange hover:underline mb-6 inline-block">
          ← Back to Inventory
        </Link>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Image Slider Section */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-96 sm:h-[450px] bg-black rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 group">
              <img 
                src={car.images[currentImgIndex]} 
                alt={car.name} 
                className="w-full h-full object-cover" 
              />

              {car.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-electricOrange transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-electricOrange transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {car.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {car.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition ${
                      currentImgIndex === idx ? 'border-electricOrange' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Detailed Description */}
            <div className="bg-white dark:bg-navyCard p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mt-6">
              <h3 className="font-bold text-lg mb-3">Vehicle Overview</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{car.description}</p>
            </div>
          </div>

          {/* Pricing & Specification Sidebar */}
          <div className="lg:col-span-5 bg-white dark:bg-navyCard p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <span className="text-xs text-electricOrange font-bold uppercase">{car.brand} • {car.category}</span>
              <h1 className="text-2xl font-black mt-1">{car.name}</h1>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-2">
                <MapPin size={14} className="text-electricOrange" /> {car.location}
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-slate-50 dark:bg-navyDeep p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-400">Dubai Showroom Price</p>
              <p className="text-3xl font-black font-mono text-electricOrange my-1">
                {car.priceAed.toLocaleString()} <span className="text-sm font-sans">AED</span>
              </p>
              <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                ≈ ${Math.round(car.priceAed * exchangeRate).toLocaleString()} USD (Excl. Duties)
              </p>
            </div>

            {/* Specs Table */}
            <div className="space-y-3 text-xs border-y border-slate-100 dark:border-slate-800 py-4">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Model Year</span><span className="font-bold text-slate-900 dark:text-white">{car.year}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Mileage</span><span className="font-bold text-slate-900 dark:text-white">{car.mileage}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Engine</span><span className="font-bold text-slate-900 dark:text-white">{car.engine}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Specifications</span><span className="font-bold text-slate-900 dark:text-white">{car.specs}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full py-3.5 rounded-xl bg-electricOrange text-white font-bold text-sm shadow-lg shadow-electricOrange/20 hover:bg-electricOrangeHover transition flex items-center justify-center gap-2">
                <PhoneCall size={18} /> Request Inspection & Shipping
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}