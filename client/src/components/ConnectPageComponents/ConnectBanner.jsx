import React from 'react';

function ConnectBanner() {
  return (
    <div className='flex mb-14 flex-col lg:flex-row gap-4 lg:h-[400px] px-2 lg:px-[100px]'>
      {/* Left Section */}
      <div className='w-full lg:w-[70%] md:w-[60%] h-[150px] rounded-lg lg:rounded-[30px] bg-brandGreen'>
        <p className='py-[30px] lg:py-[51px] px-[20px] lg:px-[40px] font-bold text-white text-2xl lg:text-4xl w-full lg:w-[308px]'>
          40% off everything
        </p>
      </div>

      {/* Right Section */}
      <div className='flex flex-row md:flex-col w-full lg:w-[30%] gap-4'>
        {/* First box */}
        <div className='bg-[#EFF0F2] rounded-lg w-full h-[140px] lg:h-[219px] font-bold px-[20px] lg:px-[30px] py-[10px] lg:py-[37px]'>
          <p className='text-[17px] lg:text-[20px] w-[full] lg:w-[165px]'>Start selling on T-Africa</p>
        </div>

        {/* Second box */}
        <div className='bg-[#EFF0F2] rounded-lg w-full h-[140px] lg:h-[219px]' />
      </div>
    </div>
  );
}

export default ConnectBanner;
