import React from 'react';

const TopCategories = () => {
  const categories = [
    { name: 'Electronics', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdfUUR4wn_vNFDXbA-e0Kh_IqgnOzTaLRd2g&s' },
    { name: 'Fashion', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4DyppIYKTOVU5xTht33MmJwHdrBUtKiZDOg&s' },
    { name: 'Home Appliances', image: 'https://perfectmalls.com.ng/wp-content/uploads/2024/07/image.jpg' },
    { name: 'Beauty', image: 'https://www.globalcosmeticsnews.com/wp-content/uploads/2023/09/glossier-at-sephora.jpg' },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Top Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <p className="font-semibold text-center">{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
