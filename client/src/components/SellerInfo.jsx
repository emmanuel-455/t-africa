import { Link } from "react-router-dom"

const SellerInfo = () => {
  return (
    <div className="bg-white inline-block rounded-xl py-4 mt-3 ml-3 w-full px-2">
      <h1 className="font-medium mb-3">SELLER INFORMATION</h1>
      <div className="flex justify-between items-end">
        <div>
        <Link to="/verified-sellers" className="font-semibold text-blue-600">ElectroWorld Store - AC</Link>
          <p className="text-sm"><span className="font-medium">118</span> Followers</p>
        </div>
        <button className="text-sm text-white px-3 py-2 rounded-lg bg-brandGreen">Follow</button>
      </div>
      <div className="mt-2">
        <h1 className="mb-1 font-medium">Seller Performance</h1>
        <div className="text-sm flex flex-col">
        <p>Shipping speed: <span>Excellent</span></p>
        <p>Quality Score <span>Good</span></p>
        <p>Customer Rating: <span>Good</span></p>
      </div>
      </div>
      
    </div>
  )
}

export default SellerInfo