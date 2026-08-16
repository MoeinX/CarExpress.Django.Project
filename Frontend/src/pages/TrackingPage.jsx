import React from 'react';

const TrackingPage = () => {
  const steps = [
    "ورود به بندر شارجه",
    "ترخیص مبدأ و بارگیری",
    "در مسیر دریایی",
    "رسیدن به بندرعباس",
    "انتقال به منطقه آزاد",
    "پارک در منطقه آزاد"
  ];
  const currentStep = 2;
  
  return (
    <div className="max-w-4xl mx-auto mt-24 bg-white dark:bg-[#333F4A] p-8 rounded-2xl shadow-lg font-['Vazirmatn']">
      <h2 className="text-2xl font-bold mb-8 text-[#333F4A] dark:text-white border-b border-gray-200 dark:border-gray-600 pb-4">
        وضعیت انتقال: <span className="font-['Outfit']">TRQ-8902</span>
      </h2>
      
      <div className="relative mt-12 mb-12">
        <div className="absolute top-1/2 right-0 w-full h-1 bg-gray-200 dark:bg-gray-600 -translate-y-1/2 z-0"></div>
        <div className="absolute top-1/2 right-0 h-1 bg-[#E31837] -translate-y-1/2 z-0 transition-all duration-500" style={{width: `${(currentStep / (steps.length - 1)) * 100}%`}}></div>
        
        <div className="relative z-10 flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;
            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${isCurrent ? 'bg-[#FF8C00] text-white ring-4 ring-orange-200 dark:ring-orange-900/50' : isCompleted ? 'bg-[#E31837] text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-600 dark:text-gray-400'} font-['Outfit']`}>
                  {index + 1}
                </div>
                <div className={`text-xs md:text-sm w-20 md:w-24 text-center ${isCurrent ? 'font-bold text-[#FF8C00]' : isCompleted ? 'text-[#333F4A] dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}`}>
                  {step}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-[#F5F7FA] dark:bg-[#1A223E] p-6 rounded-lg border border-gray-200 dark:border-gray-700 mt-8">
        <h3 className="text-lg font-bold text-[#333F4A] dark:text-white mb-2">مرحله فعلی: {steps[currentStep]}</h3>
        <p className="text-[#333F4A] dark:text-gray-300 text-sm leading-relaxed">
          خودروی شما هم‌اکنون در مسیر دریایی به سمت بندرعباس است. پیش‌بینی می‌شود تا ۴۸ ساعت آینده به گمرک مقصد برسد.
        </p>
      </div>
    </div>
  );
};

export default TrackingPage;