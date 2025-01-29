import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="flex w-full gap-4 flex-row">
      <div className="flex rounded-md flex-col w-[20%] bg-white">
        <ul className="">
          <Link  to="/profile"><li className="py-3 hover:bg-gray-300 rounded-t-md px-5">My Account</li>
          </Link>
          <li className="py-3 hover:bg-gray-300 px-5">Orders</li>
          <li className="py-3 hover:bg-gray-300 px-5">Inbox</li>
          <li className="py-3 hover:bg-gray-300 px-5">Pending Review</li>
          <li className="py-3 hover:bg-gray-300 px-5">Voucher</li>
          <li className="py-3 hover:bg-gray-300 px-5">Saved Items</li>        
          <li className="py-3 hover:bg-gray-300 px-5">Followed Sellers</li>               
          </ul>
          <p>Logout</p>
      </div>
      <div className="bg-white px-6 py-4 w-[80%]">
        <h1 className="text-xl">Account Overview</h1>
        <div>
          <p>Name: John Doe</p>
          <p>Email: johndoe@example.com</p>
          <p>Phone: 0800 123 4567</p>
          <p>Address: 123 Main St, City, State, Zip</p>
          <button className="bg-brandGreen text-white px-4 py-2 rounded-md">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
