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
    <div className='w-full lg:px-[100px] mb-[159px] pt-[46px] md:pt-[54px] lg:pt-[80px]'>
      <div className='flex flex-col w-full mx-auto items-center justify-center'>
        {/* Featured Categories Badge */}
        <span className='mb-4 font-medium md:mb-[18px] text-base md:text-lg px-3 py-2.5 bg-[#E6F9F0] text-brandGreen rounded'>
          Featured Categories
        </span>
        
        {/* Title and Description */}
        <div className='flex flex-col gap-4 md:gap-[16px] justify-center w-[278px] md:w-[674px] lg:w-[809] items-center text-center'>
          <h1 className='font-[700] text-2xl md:text-[48px]'>
            Explore Top Nigerian Exports
          </h1>
          <p className='text-base lg:text-lg text-black opacity-70 leading-relaxed max-w-full'>
            Browse through a wide range of high-quality products from leading Nigerian exporters and manufacturers.
          </p>
        </div>

        {/* Featured Categories Section */}
        <div className='w-full overflow-x-auto lg:overflow-x-visible'>
          <div className='flex lg:grid pl-[16px] lg:grid-cols-3 gap-4 lg:gap-[20px] mt-8 lg:mt-[48px] lg:w-full md:pl-[80px] lg:pl-0'>
            {categories.map((category, index) => (
              <div
                key={index}
                className='bg-[#E6F9F0] p-4 md:p-5 rounded-[10px] flex items-start flex-col cursor-pointer min-w-[196px] lg:min-w-0'
                onClick={() => handleCategoryClick(category.name)}
              >
                <div>
                  <img src={category.image} alt={category.name} />
                </div>
                <div>
                  <h1 className='font-bold text-base'>{category.name}</h1>
                  <p className='text-sm'>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default ConnectFeatured;
