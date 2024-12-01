import React from 'react';
import { Link } from 'react-router-dom';
import Chevron from "../assets/Chevron right.svg";

const VerifiedSellerCard = () => {
  const Companies = [
    {
      name: "Dangote",
      items: "Cements, Salt, Oil",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Dangote_Group_Logo.svg/1200px-Dangote_Group_Logo.svg.png", // Replace with the actual image path
    },
    {
      name: "Ebony Paints",
      items: "Paints, Coatings",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Dangote_Group_Logo.svg/1200px-Dangote_Group_Logo.svg.png", // Replace with the actual image path
    },
    {
      name: "Oando PLC",
      items: "Crude oil, Natural gas",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Dangote_Group_Logo.svg/1200px-Dangote_Group_Logo.svg.png", // Replace with the actual image path
    },
    {
      name: "Innoson",
      items: "Vehicles, Natural gas",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Dangote_Group_Logo.svg/1200px-Dangote_Group_Logo.svg.png", // Replace with the actual image path
    },
  ];

  return (
    <div className="w-full overflow-x-auto lg:overflow-x-visible">
      {/* Use flex for smaller screens and grid for larger screens */}
      <div className="flex pl-4 gap-4 lg:gap-[20px] mt-8 lg:mt-[48px] lg:w-full md:pl-[80px] lg:pl-0">
        {Companies.map((seller, index) => (
          <div
            key={index}
            className="bg-[#F9F9E6] rounded-[10px] min-w-[285px] lg:w-auto flex-shrink-0"  // Prevent shrinking
          >
            {/* Company Image Section */}
            <div className="rounded-t-[10px] bg-[#EFF0F2] h-40">
              <img
                src={seller.image}
                alt={seller.name}
                className="w-full h-full object-cover rounded-t-[10px]"
              />
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
