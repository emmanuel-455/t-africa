import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

function ReviewsSection({ reviews, isUserLoggedIn, newReview, setNewReview, reviewRating, setReviewRating, handleSubmitReview }) {
  const [showReviews, setShowReviews] = useState(false);

  return (
    <div className="border-t pt-4">
      <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>

      {/* Dropdown Toggle Button */}
      <button
        onClick={() => setShowReviews((prev) => !prev)}
        className="flex items-center bg-brandGreen hover:bg-brandGreen text-white font-medium py-2 px-4 rounded-lg mb-4"
      >
        {showReviews ? "Hide Reviews" : "Show Reviews"}
        <FiChevronDown
          className={`ml-2 transform transition-transform duration-300 ${showReviews ? "rotate-180" : "rotate-0"}`}
          size={20}
        />
      </button>

      {/* Reviews Section */}
      {showReviews && (
        <>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold">{review.user}</p>
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </>
      )}

      {/* Add a Review Section */}
      {isUserLoggedIn ? (
        <div className="mt-4">
          <h3 className="font-semibold">Add a Review</h3>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            placeholder="Write your review..."
          />
          <div className="flex items-center mt-2">
            <span className="mr-2">Rating:</span>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`cursor-pointer ${index < reviewRating ? "text-yellow-500" : "text-gray-300"}`}
                onClick={() => setReviewRating(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
          <button
            onClick={handleSubmitReview}
            className="bg-brandGreen hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg mt-2"
          >
            Submit Review
          </button>
        </div>
      ) : (
        <Link to="/signin" className="text-brandGreen hover:underline">
          Sign in to leave a review
        </Link>
      )}
    </div>
  );
}

export default ReviewsSection;
