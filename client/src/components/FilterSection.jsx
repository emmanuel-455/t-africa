import { useAtom } from 'jotai';
import { ratingFilterAtom, minPriceAtom, maxPriceAtom } from '../Redux/Store'; // Import the required atoms
import { useEffect, useState } from 'react';

const FilterSectigion = () => {
  const [selectedRating, setSelectedRating] = useAtom(ratingFilterAtom); // Rating filter state
  const [tempMinPrice, setTempMinPrice] = useState(''); // Temporary min price input
  const [tempMaxPrice, setTempMaxPrice] = useState(''); // Temporary max price input
  const [minPrice, setMinPrice] = useAtom(minPriceAtom); // Persisted min price state
  const [maxPrice, setMaxPrice] = useAtom(maxPriceAtom); // Persisted max price state

  // Handle rating change
  const handleRatingChange = (rating) => {
    setSelectedRating(rating); // Update the rating filter
  };

  // Load filter values from localStorage on mount
  // Load filter values from localStorage on mount
  useEffect(() => {
  const savedMinPrice = localStorage.getItem('minPrice');
  const savedMaxPrice = localStorage.getItem('maxPrice');
  const savedRating = localStorage.getItem('selectedRating');

  if (savedMinPrice) {
    setMinPrice(parseFloat(savedMinPrice)); // Parse as float and set the atom value
  }
  if (savedMaxPrice) {
    setMaxPrice(parseFloat(savedMaxPrice)); // Parse as float and set the atom value
  }
  if (savedRating) {
    setSelectedRating(parseFloat(savedRating)); // Parse as float and set the atom value
  }
}, []);


  // Save filter values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('minPrice', JSON.stringify(minPrice));
    localStorage.setItem('maxPrice', JSON.stringify(maxPrice));
    localStorage.setItem('selectedRating', JSON.stringify(selectedRating));

    console.log("Rating Filter:", selectedRating);
  console.log("Min Price:", minPrice);
  console.log("Max Price:", maxPrice);
  }, [minPrice, maxPrice, selectedRating]);

  

  // Confirm price range
  const handleConfirmPrice = () => {
    const min = tempMinPrice ? parseFloat(tempMinPrice) : null;
    const max = tempMaxPrice ? parseFloat(tempMaxPrice) : null;

    setMinPrice(min); // Save min price to Jotai atom
    setMaxPrice(max); // Save max price to Jotai atom
  };

  return (
    <div className='flex hidden lg:block flex-col gap-[16px]'>
      <h1 className='font-bold text-[24px]'>Filters</h1>
      <div className='gap-[16px] p-4 flex flex-col bg-white rounded-[16px]'>

        {/* Rating Filter Section */}
        <div>
          <h4 className='font-bold text-base'>Store reviews</h4>
          <p className='text-sm'>Based on a 5-star rating system</p>
        </div>
        <div className='flex flex-col gap-[10px]'>
          {[4, 4.5, 5].map((rating) => (
            <div className='flex gap-2 items-center' key={rating}>
              <input
                type="radio"
                checked={selectedRating === rating}
                onChange={() => handleRatingChange(rating)}
                className='appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-brandGreen focus:outline-none cursor-pointer'
              />
              <div>{rating} ⭐ & up</div>
            </div>
          ))}
        </div>

        {/* Price Filter Section */}
        <div className="w-full">
          <h4 className="text-lg font-bold mb-2">Price</h4>
          <div className='flex w-full'>
            <div className='flex flex-row gap-2'>
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Min"
                  value={tempMinPrice}
                  onChange={(e) => setTempMinPrice(e.target.value)}
                  className="pl-3 pr-2 py-1 border outline-none border-[#E0E5EB] rounded-md w-[100%]"
                />
              </div>
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Max"
                  value={tempMaxPrice}
                  onChange={(e) => setTempMaxPrice(e.target.value)}
                  className="pl-3 pr-2 py-1 border outline-none border-[#E0E5EB] rounded-md w-[100%]"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleConfirmPrice}
            className="mt-2 px-4 py-2 w-full font-bold text-sm rounded-[10px] bg-[#E0E5EB]"
          >
            Confirm
          </button>
        </div>

        {/* Minimum Order Section */}
        <div className='flex flex-col gap-2'>
          <h4 className='text-lg font-bold mb-2'>Minimum order</h4>
          <input
            type="text"
            className='pl-3 pr-2 py-1 border outline-none border-[#E0E5EB] rounded-md w-[100%]'
          />
          <button className="mt-2 px-4 py-2 w-full font-bold text-sm rounded-[10px] bg-[#E0E5EB]">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
