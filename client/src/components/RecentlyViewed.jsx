import React from 'react';

const RecentlyViewed = () => {
  const viewedProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

  if (viewedProducts.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {viewedProducts.map((product, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <p className="font-semibold">{product.title}</p>
            <p className="text-gray-500">Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
