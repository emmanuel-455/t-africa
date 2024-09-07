import React from 'react';
import { Link } from 'react-router-dom';
import Chevron from "../assets/Chevron right.svg"

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
    <div className="flex justify-between gap-4 mt-8">
      {Companies.map((seller, index) => (
        <div
          
          key={index}
          className="w-[23%]"
        >
          <div className="bg-[#F9F9E6] rounded-xl overflow-hidden">
            {/* Image Section */}
            <div className="bg-[#EFF0F2] h-40">
              {/* <img
                src=""
                alt=""
                className="w-full h-40 object-cover"
              /> */}
            </div>

            {/* Card Info Section */}
            <div className="p-4 bg-[#F6F7FA]">
              <h3 className="font-bold text-xl mb-2">{seller.name}</h3>
              <p className="text-[14px] mb-2">{seller.items}</p>
              <Link
                to={`/verified-sellers/${seller.name.toLowerCase()}`}
                className="text-brandGreen flex items-center justify-start text-lg font-bold"
              >
                View supplier <img src={Chevron} alt="" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerifiedSellerCard;
