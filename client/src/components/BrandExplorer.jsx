import React from 'react';

const BrandExplorer = () => {
  const brands = [
    { name: 'Apple', logo: 'https://www.tailorbrands.com/wp-content/uploads/2021/01/apple_logo_1988.jpg' },
    { name: 'Samsung', logo: 'https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/256_144_1.png?$512_N_PNG$' },
    { name: 'Sony', logo: 'https://thumbs.dreamstime.com/b/sony-logo-editorial-illustrative-white-background-eps-download-vector-jpeg-sony-logo-editorial-illustrative-white-background-208332904.jpg' },
    { name: 'Nike', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs6cur5CKeAnQgfHssh1wtgJyGLz76tLrRHQ&s' },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Explore Brands</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {brands.map((brand, index) => (
          <div key={index} className="flex flex-col items-center p-4 rounded-lg">
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-16 h-16 object-cover mb-2"
            />
            <p className="font-semibold">{brand.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandExplorer;
