import React, { useEffect, useState } from 'react';
import Category from './Category';
import SearchProduct from './SearchProduct';
import FilterSection from './FilterSection';
import SupplierProductMenu from './SupplierProductMenu';

function SearchResults() {
  return (
    <>
      <div className='bg-[#F6F7FA]'>
        <div>
          <Category />
        </div>
        <SupplierProductMenu />
      
      <div className='flex pl-[90px] pr-[60px] justify-between flex-row gap-[20px]'>
        <div className='w-[20%]'><FilterSection /></div>
        <div className='w-[80%]'>
        <SearchProduct />
      </div>
        </div>
      </div>
    </>
  );
}

export default SearchResults;
