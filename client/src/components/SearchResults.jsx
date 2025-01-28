import Category from './Category';
import SearchProduct from './SearchProduct';
import FilterSection from './FilterSection';
//import SupplierProductMenu from './SupplierProductMenu';

function SearchResults() {
  return (
    <>
    <div className='mb-[20px]'>
          <Category />
        </div>   
      <div className='bg-[#F6F7FA] rounded-2xl'>
           
      <div className='lg:flex pt-7  lg:pl-[50px] lg:pr-[60px] justify-between flex-row gap-[20px]'>
        <div className='lg:w-[20%]'><FilterSection /></div>
        <div className='lg:w-[80%] w-full'>
        <SearchProduct />
      </div>
        </div>
      </div>
    </>
  );
}

export default SearchResults;
