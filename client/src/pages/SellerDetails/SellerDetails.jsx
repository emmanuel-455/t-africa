import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

function SellerDetails() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [reviews] = useState([
    { id: 1, name: "John Doe", rating: 4, comment: "Great seller, fast delivery!" },
    { id: 2, name: "Jane Smith", rating: 5, comment: "Excellent quality, highly recommend!" },
    { id: 3, name: "Emeka O.", rating: 3, comment: "Good product but delivery took time." }
  ]);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      {/* Back Button and Seller Title */}
      <div className="flex gap-2 mb-5 items-center">
        <FaArrowLeft className="cursor-pointer" />
        <h1 className="text-lg font-semibold">Seller Profile</h1>
      </div>

      {/* Seller Details Card */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between border-b border-gray-300 pb-6 mb-6 items-end">
          <div>
            <Link to="/verified-sellers" className="font-semibold text-lg text-blue-600">
              ElectroWorld Store - AC
            </Link>
            <p className="text-sm mb-6 text-gray-600">88% Seller Score</p>
            <p>Country Of Origin: <span className="font-medium">Nigeria</span></p>
          </div>
          <div className="flex items-center gap-3">
            <p><span className="font-medium">118</span> Followers</p>
            <button 
              className={`text-white text-sm px-3 py-1 rounded-md transition-all ${
                isFollowing ? "bg-gray-500" : "bg-brandGreen"
              }`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>

        {/* Seller Information and Performance */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Seller Info */}
          <div>
            <h1 className="font-medium mb-4 border-b border-gray-300 pb-3">SELLER INFORMATION</h1>
            <div className="flex flex-col gap-2">
              <p>Selling on Jumia: <span className="font-medium">9 months</span></p>
              <p>Successful Sales: <span className="font-medium">1000+</span></p>
              <p>Country of Origin: <span className="font-medium">Nigeria</span></p>
            </div>
          </div>

          {/* Seller Performance */}
          <div>
            <h1 className="font-medium mb-4 border-b border-gray-300 pb-3">SELLER PERFORMANCE</h1>
            <div className="flex flex-col gap-2">
              <p>✅ Shipping speed: <span className="font-medium">Excellent</span></p>
              <p>✅ Quality Score: <span className="font-medium">Good</span></p>
              <p>✅ Customer Rating: <span className="font-medium">Good</span></p>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-8">
          <h1 className="font-medium mb-4 border-b border-gray-300 pb-3">CUSTOMER REVIEWS</h1>
          <div>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 py-4">
                  <p className="font-semibold">{review.name} - ⭐ {review.rating}/5</p>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDetails;
