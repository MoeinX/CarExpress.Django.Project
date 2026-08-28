import React from 'react';

const BrandLogo = ({ className = 'h-9 sm:h-10 w-auto' }) => {
  return (
    <div className="flex items-center shrink-0">
      {/* Light Mode: Logo-Dark for light background */}
      <img
        src="/assets/images/Logo-Light.png"
        alt="زمین دریا ترابر کیان"
        className={`${className} object-contain block dark:hidden select-none`}
      />
      {/* Dark Mode: Logo-Light for dark background */}
      <img
        src="/assets/images/Logo-Dark.png"
        alt="زمین دریا ترابر کیان"
        className={`${className} object-contain hidden dark:block select-none`}
      />
    </div>
  );
};

export default BrandLogo;
