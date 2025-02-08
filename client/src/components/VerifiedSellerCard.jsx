import React from 'react';
import { Link } from 'react-router-dom';
import Chevron from "../assets/Chevron right.svg";

const VerifiedSellerCard = () => {
  const Companies = [
    {
      name: "Dangote",
      items: "Cements, Salt, Oil",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Dangote_Group_Logo.svg/1200px-Dangote_Group_Logo.svg.png",
    },
    {
      name: "Ebony Paints",
      items: "Paints, Coatings",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Dangote_Group_Logo.svg/1200px-Dangote_Group_Logo.svg.png",
    },
    {
      name: "Oando PLC",
      items: "Crude oil, Natural gas",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Dangote_Group_Logo.svg/1200px-Dangote_Group_Logo.svg.png",
    },
    {
      name: "Innoson",
      items: "Vehicles, Natural gas",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Dangote_Group_Logo.svg/1200px-Dangote_Group_Logo.svg.png",
    },
  ];

  return (
    <div className="w-full overflow-x-auto lg:overflow-visible px-4">
      {/* Responsive Layout */}
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 md:mt-[48px] w-full">
        {Companies.map((seller, index) => (
          <div
            key={index}
            className="bg-[#F9F9E6] rounded-[10px] w-[230px] md:w-auto flex-shrink-0 md:flex-shrink"
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
              <h3 className="font-bold text-lg mb-1">{seller.name}</h3>
              <p className="text-sm mb-1">{seller.items}</p>
              <Link
                to={`/verified-sellers`}
                className="text-brandGreen flex items-center text-base font-bold"
              >
                View supplier <img src={Chevron} alt="Chevron" className="ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifiedSellerCard;
