import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"
function SellerDetails() {
  return (
    <div className="">
      <div className="flex gap-2 mb-5 items-center">
        <FaArrowLeft />
        <h1 className="">Seller Profile</h1>
      </div>
      <div className="bg-white px-8 py-8">
        <div className="flex justify-between border-b border-gray-300 pb-6 mb-[50px] items-end">
          <div>
            <Link to="/verified-sellers" className="font-semibold text-lg">ElectroWorld Store - AC</Link >
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

        <div className="flex gap-3">
          <div className="w-full">
          <h1 className="font-medium mb-4 border-b border-gray-300 pb-3">SELLERS INFORMATION</h1>
          <div className="flex flex-col gap-1 border-r border-gray-300">
            <p>Selling on Jumia: <span className="font-medium">9 months</span></p>
            <p>Successful Sales: <span className="font-medium">1000+</span></p>
            <p>Country of Origin: <span className="font-medium">Nigeria</span></p>
          </div>
          </div>
          <div className="w-full">
            <h1 className="font-medium mb-4 border-b border-gray-300 pb-3">SELLERS PERFORMANCE</h1>
            <div className="flex flex-col gap-1">
            <p>❇️ Shipping speed: <span className="font-medium">Exellent</span></p>
            <p>❇️ Quality Score: <span className="font-medium">Good</span></p>
            <p>❇️ Customer Rating: <span className="font-medium">Good</span></p>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerDetails
