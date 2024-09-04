import React from 'react';
import { useAtom } from 'jotai';
import { selectedCategoryAtom } from '../../redux/Store';
import Agric from '../../assets/Agricon.svg';
import Textile from '../../assets/textiles.svg';
import Handicraft from '../../assets/handicraft.svg';
import Food from '../../assets/food.svg';
import Cosmetics from '../../assets/cosmetics.svg';
import Home from '../../assets/home.svg';

function ConnectFeatured() {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='w-full px-[70px] pt-[81px]'>
      <div className='flex flex-col w-full mx-auto items-center justify-center'>
        {/* Featured Categories Badge */}
        <span className='text-emerald mb-[18px] text-lg px-3.5 py-2.5 bg-[#E6F9F0] rounded'>
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
          {/* Category Card 1 */}
          <div
            className='bg-[#E6F9F0] p-5 rounded-[10px] gap-[12px] flex items-start w-[29%] flex-col cursor-pointer'
            onClick={() => handleCategoryClick('Agricultural Products')}
          >
            <div>
              <img src={Agric} alt="Agricultural Products" />
            </div>
            <div>
              <h1 className='font-bold text-sm'>Agricultural Products</h1>
              <p className='text-sm'>Explore a wide range of Nigerian agricultural products.</p>
            </div>
          </div>

          {/* Category Card 2 */}
          <div
            className='bg-[#E6F9F0] p-5 rounded-[10px] gap-[12px] flex items-start w-[29%] flex-col cursor-pointer'
            onClick={() => handleCategoryClick('Textiles and Apparel')}
          >
            <div>
              <img src={Textile} alt="Textiles and Apparel" />
            </div>
            <div>
              <h1 className='font-bold text-sm'>Textiles and Apparel</h1>
              <p className='text-sm'>Explore a wide range of Nigerian textiles and apparel.</p>
            </div>
          </div>

          {/* Category Card 3 */}
          <div
            className='bg-[#E6F9F0] p-5 rounded-[10px] gap-[12px] flex items-start w-[29%] flex-col cursor-pointer'
            onClick={() => handleCategoryClick('Handicrafts and Artisanal Goods')}
          >
            <div>
              <img src={Handicraft} alt="Handicrafts and Artisanal Goods" />
            </div>
            <div>
              <h1 className='font-bold text-sm'>Handicrafts and Artisanal Goods</h1>
              <p className='text-sm'>Explore a wide range of Nigerian handicrafts and artisanal goods.</p>
            </div>
          </div>

          {/* Category Card 4 */}
          <div
            className='bg-[#E6F9F0] p-5 rounded-[10px] gap-[12px] flex items-start w-[29%] flex-col cursor-pointer'
            onClick={() => handleCategoryClick('Food and Beverages')}
          >
            <div>
              <img src={Food} alt="Food and Beverages" />
            </div>
            <div>
              <h1 className='font-bold text-sm'>Food and Beverages</h1>
              <p className='text-sm'>Discover a variety of Nigerian food and beverage exports.</p>
            </div>
          </div>

          {/* Category Card 5 */}
          <div
            className='bg-[#E6F9F0] p-5 rounded-[10px] gap-[12px] flex items-start w-[29%] flex-col cursor-pointer'
            onClick={() => handleCategoryClick('Cosmetics and Personal Care')}
          >
            <div>
              <img src={Cosmetics} alt="Cosmetics and Personal Care" />
            </div>
            <div>
              <h1 className='font-bold text-sm'>Cosmetics and Personal Care</h1>
              <p className='text-sm'>Explore a wide range of Nigerian cosmetics and personal care products.</p>
            </div>
          </div>

          {/* Category Card 6 */}
          <div
            className='bg-[#E6F9F0] p-5 rounded-[10px] gap-[12px] flex items-start w-[29%] flex-col cursor-pointer'
            onClick={() => handleCategoryClick('Home and Decor')}
          >
            <div>
              <img src={Home} alt="Home and Decor" />
            </div>
            <div>
              <h1 className='font-bold text-sm'>Home and Decor</h1>
              <p className='text-sm'>Explore a wide range of Nigerian home and decor items.</p>
            </div>
          </div>
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
