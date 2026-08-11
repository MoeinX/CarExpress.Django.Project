import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gauge, Fuel, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function CarCard({ car }) {
  const navigate = useNavigate();
  const exchangeRate = 0.272;

  return (
    <div 
      onClick={() => navigate(`/car/${car.id}`)}
      className="bg-white dark:bg-navyCard rounded-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
    >
      <div>
        {/* Image & Status Badge */}
        <div className="relative h-52 bg-slate-100 dark:bg-navyDeep overflow-hidden">
          <img 
            src={car.images[0]} 
            alt={car.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          />
          <span className="absolute top-3 left-3 bg-white/90 dark:bg-navyDeep/90 backdrop-blur-md text-emerald-600 dark:text-emerald-400 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
            <ShieldCheck size={13} /> {car.status}
          </span>
          <span className="absolute top-3 right-3 bg-electricOrange text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            {car.year}
          </span>
        </div>

        {/* Specs Content */}
        <div className="p-5">
          <h3 className="font-bold text-navyDeep dark:text-white text-lg group-hover:text-electricOrange transition mb-2">
            {car.name}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 my-3 bg-slate-50 dark:bg-navyDeep/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5"><Gauge size={14} className="text-electricOrange" /> {car.mileage}</div>
            <div className="flex items-center gap-1.5"><Fuel size={14} className="text-electricOrange" /> {car.engine}</div>
          </div>
        </div>
      </div>

      {/* Pricing Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold">Dubai Price</p>
          <p className="text-base font-black font-mono text-navyDeep dark:text-white">
            {car.priceAed.toLocaleString()} <span className="text-xs text-electricOrange">AED</span>
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
            ≈ ${Math.round(car.priceAed * exchangeRate).toLocaleString()} USD
          </p>
        </div>

        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-navyDeep text-navyDeep dark:text-white group-hover:bg-electricOrange group-hover:text-white flex items-center justify-center transition">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </div>
  );
}