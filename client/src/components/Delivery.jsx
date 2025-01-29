import { useState, useEffect } from 'react';

const Delivery = () => {
  const statesInNigeria = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", 
    "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", 
    "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", 
    "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", 
    "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", 
    "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", 
    "Zamfara"
  ];

  const pickupLocationsByState = {
    "Lagos": ["Ikeja", "Victoria Island", "Lekki", "Surulere"],
    "Abuja": ["Garki", "Wuse", "Maitama", "Kubwa"],
    "Kano": ["Kano Central", "Nasarawa", "Tarauni"],
    "Rivers": ["Port Harcourt", "Rumuokoro", "Trans-Amadi"],
    "Oyo": ["Ibadan North", "Ibadan South", "Moniya"],
    "Enugu": ["Enugu Central", "Nsukka", "Emene", "Abakpa"],
    // Add more states and locations as needed
  };

  const [selectedState, setSelectedState] = useState("");
  const [pickupLocations, setPickupLocations] = useState([]);

  useEffect(() => {
    if (selectedState) {
      setPickupLocations(pickupLocationsByState[selectedState] || []);
    } else {
      setPickupLocations([]);
    }
  }, [selectedState]);

  return (
    <div className='w-[30%]'>
      <h2 className='text-nowrap'>Delivery and Return</h2>
      <div>Choose your location</div>

      {/* State Selector */}
      <select
        className="mt-2 p-2 border border-gray-300 rounded-md w-full max-w-xs"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option className='w-[200px]' value="" disabled>Choose state</option>
        {statesInNigeria.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* Pickup Location Selector */}
      {selectedState && (
        <select
          className="mt-2 p-2 border border-gray-300 rounded-md w-full max-w-xs"
          disabled={pickupLocations.length === 0}
        >
          <option className='' value="" disabled>Select pickup location</option>
          {pickupLocations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      )}

      {/* Delivery Instructions */}
      <div>
         <div>
            <h3>Pickup Station</h3>
            <p>
            Delivery Fees ₦ 600
            Ready for pickup between 31 January and 01 February if you place your order within the next 13hrs 54mins
            </p>
         </div>
         <div>
            <h3>Door Delivery</h3>
            <p>
            Delivery Fees ₦ 600
            Ready for pickup between 31 January and 01 February if you place your order within the next 13hrs 54mins
            </p>
         </div>
         <div>
            <h3>Return Policy</h3>
            <p>
            Delivery Fees ₦ 600
            Ready for pickup between 31 January and 01 February if you place your order within the next 13hrs 54mins
            </p>
         </div>
      </div>
    </div>
  );
};

export default Delivery;