import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { ratingFilterAtom, minPriceAtom, maxPriceAtom } from '../redux/Store'; // Import atoms

const FilterModal = ({ onClose }) => {
  const [selectedRating, setSelectedRating] = useAtom(ratingFilterAtom); // Rating filter state
  const [tempMinPrice, setTempMinPrice] = useState(''); // Temporary min price input
  const [tempMaxPrice, setTempMaxPrice] = useState(''); // Temporary max price input
  const [minPrice, setMinPrice] = useAtom(minPriceAtom); // Persisted min price state
  const [maxPrice, setMaxPrice] = useAtom(maxPriceAtom); // Persisted max price state

  // Confirm price range
  const handleConfirmPrice = () => {
    const min = tempMinPrice ? parseFloat(tempMinPrice) : null;
    const max = tempMaxPrice ? parseFloat(tempMaxPrice) : null;
    setMinPrice(min); // Save min price to Jotai atom
    setMaxPrice(max); // Save max price to Jotai atom
    onClose(); // Close the modal after applying filters
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setSelectedRating(rating); // Update the rating filter
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Modal Header */}
      <div className="flex justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Filter</h2>
        <button onClick={onClose} className="text-lg font-bold">X</button>
      </div>

      {/* Modal Body */}
      <div className="flex-1 p-4">
        {/* Rating Filter */}
        <div className='mb-6'>
          <h4 className='font-bold text-base'>Store reviews</h4>
          <p className='text-sm'>Based on a 5-star rating system</p>
          <div className='flex flex-col gap-2 mt-2'>
            {[4, 4.5, 5].map((rating) => (
              <label className='flex items-center gap-2' key={rating}>
                <input
                  type="radio"
                  checked={selectedRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className='h-4 w-4 border rounded-full checked:bg-brandGreen focus:outline-none cursor-pointer'
                />
                <span>{rating} ⭐ & up</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h4 className="font-bold text-base">Price</h4>
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              placeholder="Min"
              value={tempMinPrice}
              onChange={(e) => setTempMinPrice(e.target.value)}
              className="pl-3 pr-2 py-1 border rounded-md w-full"
            />
            <input
              type="number"
              placeholder="Max"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(e.target.value)}
              className="pl-3 pr-2 py-1 border rounded-md w-full"
            />
          </div>
        </div>

        {/* Minimum Order */}
        <div className="mb-6">
          <h4 className="font-bold text-base">Minimum order</h4>
          <input
            type="number"
            placeholder="Minimum order"
            className="pl-3 pr-2 py-1 border rounded-md w-full"
          />
        </div>
      </div>

      {/* Modal Footer */}
      <div className="p-4 border-t">
        <button
          onClick={handleConfirmPrice}
          className="w-full py-2 bg-brandGreen text-white rounded-md"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
