import React from 'react';
import { Link } from 'react-router-dom';
import Chevron from "../assets/Chevron right.svg";

const VerifiedSellerCard = () => {
  const Companies = [
    {
      name: "Dangote",
      items: "Cements, Salt, Oil",
    },
    {
      name: "Ebony Paints",
      items: "Paints, Coatings",
    },
    {
      name: "Oando PLC",
      items: "Crude oil, Natural gas",
    },
    {
      name: "Innoson",
      items: "Vehicles, Natural gas",
    },
  ];

  return (
    <div className="w-full overflow-x-auto lg:overflow-x-visible">
      {/* Use flex for smaller screens and grid for larger screens */}
      <div className="flex lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pl-4 gap-4 lg:gap-[20px] mt-8 lg:mt-[48px] lg:w-full md:pl-[80px] lg:pl-0">
        {Companies.map((seller, index) => (
          <div
            key={index}
            className="bg-[#F9F9E6] rounded-[10px] min-w-[285px] lg:w-auto flex-shrink-0"  // Prevent shrinking
          >
            <div className="rounded-t-[10px] bg-[#EFF0F2] h-40">
              {/* Image placeholder */}
              {/* <img src="" alt={seller.name} className="w-full h-40 object-cover" /> */}
            </div>

            {/* Card Info Section */}
            <div className="p-4 bg-[#F6F7FA] rounded-b-[10px]">
              <h3 className="font-bold text-lg mb-2">{seller.name}</h3>
              <p className="text-sm mb-2">{seller.items}</p>
              <Link
                to={`/verified-sellers/${seller.name.toLowerCase()}`}
                className="text-brandGreen flex items-center justify-start text-base font-bold"
              >
                View supplier <img src={Chevron} alt="Chevron" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifiedSellerCard;
