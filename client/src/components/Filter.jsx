import React, { useState } from 'react';
import FilterIcon from "../assets/filter.svg";
import { useAtom } from 'jotai';
import { ratingFilterAtom, minPriceAtom, maxPriceAtom } from '../redux/Store'; // Import the required atoms
import FilterModal from './FilterModal'; // Import the FilterModal component

const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle the modal

  const handleOpenModal = () => {
    setIsModalOpen(true); // Open the modal when filter is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <div className='w-[25px] flex items-center gap-1' onClick={handleOpenModal}>
        <img src={FilterIcon} alt="Filter" />
        <p className='font-semibold text-xs mt-1'>FILTER</p>
      </div>

      {/* Full-Screen Modal for Filter */}
      {isModalOpen && (
        <FilterModal onClose={handleCloseModal} /> // Pass onClose handler to the modal
      )}
    </div>
  );
};

export default Filter;
