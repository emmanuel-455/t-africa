import { useState, useEffect } from 'react';
import { MapPin, Truck, RotateCcw } from 'lucide-react';

const Delivery = () => {
   const [deliveryFee] = useState(`₦ ${1500}`);
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
    <div className='w-full rounded-xl bg-white py-4'>
      <h2 className='text-nowrap mb-3 text-lg font-semibold'>DELIVERY & RETURNS</h2>
      <div>Choose your location</div>

      <select
        className="mt-2 p-2 border mb-2 border-gray-300 rounded-md w-full max-w-xs"
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

      <div className='gap-2 flex pt-4 flex-col'>
        <div className="flex gap-2 items-start">
          <MapPin className="w-[100px] text-gray-600" />
          <div>
            <h3 className="font-medium mb-1">Pickup Station</h3>
            <p className="text-[13px]">
              Delivery Fees {deliveryFee}
              <br />
              Ready for pickup between 31 January and 01 February if you place your order within the next 13hrs 54mins
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <Truck className="w-[100px] text-gray-600" />
          <div>
            <h3 className="font-medium mb-1">Door Delivery</h3>
            <p className="text-[13px]">
              Delivery Fees {deliveryFee}
              <br />
              Ready for delivery between 31 January and 01 February if you place your order within the next 13hrs 54mins
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <RotateCcw className="w-[40px] text-gray-600" />
          <div>
            <h3 className="font-medium mb-1">Return Policy</h3>
            <p className="text-[13px]">
              Free return within 7 days for ALL eligible items
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
