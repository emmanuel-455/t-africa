import React from 'react';
import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../../redux/Store';
import Agric from '../../assets/Agricon.svg';
import Textile from '../../assets/textiles.svg';
import Handicraft from '../../assets/handicraft.svg';
import Food from '../../assets/food.svg';
import Cosmetics from '../../assets/cosmetics.svg';
import Home from '../../assets/home.svg';

// Define the categories data
const categories = [
  {
    name: 'Agricultural Products',
    image: Agric,
    description: 'Explore a wide range of Nigerian agricultural products.',
  },
  {
    name: 'Textiles and Apparel',
    image: Textile,
    description: 'Explore a wide range of Nigerian textiles and apparel.',
  },
  {
    name: 'Handicrafts and Artisanal Goods',
    image: Handicraft,
    description: 'Explore a wide range of Nigerian handicrafts and artisanal goods.',
  },
  {
    name: 'Food and Beverages',
    image: Food,
    description: 'Discover a variety of Nigerian food and beverage exports.',
  },
  {
    name: 'Cosmetics and Personal Care',
    image: Cosmetics,
    description: 'Explore a wide range of Nigerian cosmetics and personal care products.',
  },
  {
    name: 'Home and Decor',
    image: Home,
    description: 'Explore a wide range of Nigerian home and decor items.',
  },
];

function ConnectFeatured() {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='w-full px-[70px] mb-[159px] pt-[81px]'>
      <div className='flex flex-col w-full mx-auto items-center justify-center'>
        {/* Featured Categories Badge */}
        <span className='text-emerald mb-[18px] text-lg px-3.5 py-2.5 bg-[#E6F9F0] text-brandGreen rounded'>
          Featured Categories
        </span>
        
        {/* Title and Description */}
        <div className='flex flex-col gap-[16px] justify-center items-center text-center'>
          <h1 className='font-[700] text-[48px]'>
            Explore Top Nigerian Exports
          </h1>
          <p className='text-lg leading-relaxed max-w-[70%]'>
            Browse through a wide range of high-quality products from leading Nigerian exporters and manufacturers.
          </p>
        </div>

        {/* Featured Categories Section */}
        <div className='flex flex-wrap gap-[24px] mt-[48px] justify-center w-full'>
          {categories.map((category, index) => (
            <div
              key={index}
              className='bg-[#E6F9F0] p-5 rounded-[10px] gap-[12px] flex items-start w-[29%] flex-col cursor-pointer'
              onClick={() => handleCategoryClick(category.name)}
            >
              <div>
                <img src={category.image} alt={category.name} />
              </div>
              <div>
                <h1 className='font-bold text-sm'>{category.name}</h1>
                <p className='text-sm'>{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Display Selected Category */}
        {selectedCategory && (
          <div className='mt-10'>
            <h2 className='text-2xl font-bold'>Selected Category: {selectedCategory}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectFeatured;
