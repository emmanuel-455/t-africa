const TopCategories = () => {
  const categories = [
    { name: 'Electronics', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdfUUR4wn_vNFDXbA-e0Kh_IqgnOzTaLRd2g&s' },
    { name: 'Fashion', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4DyppIYKTOVU5xTht33MmJwHdrBUtKiZDOg&s' },
    { name: 'Home Appliances', image: 'https://perfectmalls.com.ng/wp-content/uploads/2024/07/image.jpg' },
    { name: 'Beauty', image: 'https://www.globalcosmeticsnews.com/wp-content/uploads/2023/09/glossier-at-sephora.jpg' },
  ];

  return (
    <section className="px-4 md:px-8 lg:px-16 py-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Top Categories</h2>
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-40 sm:w-48 md:w-56 lg:w-64"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <p className="font-semibold text-center text-sm sm:text-base py-2">{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
