import React from 'react';
import Banner from "../../assets/connectbg.png";
import SearchIcon from "../../assets/connectSearch.svg"; // Import search icon as an image

function ConnectBanner() {
  return (
    <div
      className='w-full h-screen bg-cover bg-center'
      style={{ backgroundImage: `url(${Banner})` }}
    >
      <div className='w-[513px] gap-[24px] pt-[14%] ml-16 flex flex-col'>
        <h1 className='text-[57px] font-[500] leading-[58px] text-white'>
          Connect with reliable Nigerian exporters
        </h1>
        <p className='text-lg leading-[24px] text-white mb-4'>
          Search and connect with top Nigerian exporters and manufacturers. Explore a wide range of high-quality products.
        </p>
        <div className="relative gap-2 w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-3 pl-12 font-500 pr-4 rounded-[8px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <img
            src={SearchIcon}
            alt="Search Icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
        </div>
      </div>
    </div>
  );
}

export default ConnectBanner;
