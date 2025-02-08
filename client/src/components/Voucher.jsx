import { useState, useEffect } from "react";

// Mock API to simulate fetching voucher data
const fetchVouchers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "voucher1",
          code: "DISCOUNT10",
          description: "Get 10% off on your next purchase!",
          expiration: "2025-12-31"
        },
        {
          id: "voucher2",
          code: "FREEDELIVERY",
          description: "Free delivery on orders over ₦1000",
          expiration: "2025-06-30"
        },
        {
          id: "voucher3",
          code: "SUMMER20",
          description: "Get 20% off on summer items.",
          expiration: "2025-08-15"
        }
      ]);
    }, 1000); // Simulating a 1-second delay for the mock API
  });
};

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const loadVouchers = async () => {
      const fetchedVouchers = await fetchVouchers();
      setVouchers(fetchedVouchers);
    };

    loadVouchers();
  }, []);

  return (
    <div className="mt-10 md:p-8 border rounded-xl bg-gray-100 shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Vouchers</h3>
      {vouchers.length === 0 ? (
        <p className="text-lg text-gray-600">No vouchers available at the moment.</p>
      ) : (
        <div className="space-y-6">
          {vouchers.map((voucher) => (
            <div key={voucher.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700">{voucher.code}</span>
                <span className="text-sm text-gray-500">Expires: {voucher.expiration}</span>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <p>{voucher.description}</p>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Apply Voucher
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Voucher;


 
