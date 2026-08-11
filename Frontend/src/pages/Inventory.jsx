import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CarCard from '../components/CarCard';
import { CARS_DATA } from '../data/cars';
import { Search } from 'lucide-react';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'SUV', 'Luxury', 'Sports'];

  const filteredCars = CARS_DATA.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navyDeep text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2">Dubai Live Car Marketplace</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Direct vehicle listings available in UAE showrooms</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-navyCard p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by car model..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-navyDeep text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-electricOrange"
            />
          </div>

          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCategory === cat 
                    ? 'bg-electricOrange text-white' 
                    : 'bg-slate-100 dark:bg-navyDeep text-slate-600 dark:text-slate-400 hover:text-electricOrange'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cars List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </main>
    </div>
  );
}