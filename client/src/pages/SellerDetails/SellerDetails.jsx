import { FaArrowLeft } from "react-icons/fa"
function SellerDetails() {
  return (
    <div className="">
      <div className="flex gap-2 mb-5 items-center">
        <FaArrowLeft />
        <h1 className="">Seller Profile</h1>
      </div>
      <div className="bg-white px-8 py-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="font-semibold">ElectroWorld Store - AC</p>
            <p className="text-sm mb-6">
              88% Seller Score
            </p>
            <p className="text-sm">Country Of Origin: <span className="font-medium">Nigeria</span></p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <p className=""><span className="font-medium">118</span> Followers</p>
            <button className="text-white text-sm bg-brandGreen px-3 py-1 rounded-md">Follow</button>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
          <h1>SELLERS INFORMATION</h1>
          <div>
            <p>Selling on Jumia: <span>9 months</span></p>
            <p>Successful Sales: <span>1000+</span></p>
            <p>Country of Origin: <span>Nigeria</span></p>
          </div>
          </div>
          <div>
            <h1>SELLERS PERFORMANCE</h1>
            <div>
            <p>Shipping speed: <span>Exellent</span></p>
            <p>Quality Score: <span>Good</span></p>
            <p>Customer Rating: <span>Good</span></p>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerDetails
