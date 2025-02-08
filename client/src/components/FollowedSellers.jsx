import { useState, useEffect } from "react";

// Mock API to simulate fetching followed sellers
const fetchFollowedSellers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "seller1",
          name: "Seller 1",
          description: "Best electronics and gadgets store.",
          storeLink: "/store/seller1",
        },
        {
          id: "seller2",
          name: "Seller 2",
          description: "Affordable fashion items for everyone.",
          storeLink: "/store/seller2",
        },
        {
          id: "seller3",
          name: "Seller 3",
          description: "Home decor and furniture.",
          storeLink: "/store/seller3",
        },
      ]);
    }, 1000); // Simulating a 1-second delay for fetching followed sellers
  });
};

const FollowedSellers = () => {
  const [followedSellers, setFollowedSellers] = useState([]);

  useEffect(() => {
    const loadFollowedSellers = async () => {
      const fetchedSellers = await fetchFollowedSellers();
      setFollowedSellers(fetchedSellers);
    };

    loadFollowedSellers();
  }, []);

  const unfollowSeller = (sellerId) => {
    setFollowedSellers(followedSellers.filter(seller => seller.id !== sellerId));
  };

  return (
    <div className="mt-10 md:p-8 border rounded-xl bg-gray-100 shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Followed Sellers</h3>
      {followedSellers.length === 0 ? (
        <p className="text-sm text-gray-600">You are not following any sellers.</p>
      ) : (
        <div className="space-y-6">
          {followedSellers.map((seller) => (
            <div key={seller.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700">{seller.name}</span>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <p>{seller.description}</p>
              </div>
              <div className="flex justify-between">
                <a
                  href={seller.storeLink}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  Visit Store
                </a>
                <button
                  onClick={() => unfollowSeller(seller.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition"
                >
                  Unfollow
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowedSellers;
