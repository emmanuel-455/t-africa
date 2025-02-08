import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accountdetails from "../../components/Accountdetails";
import AddressBook from "../../components/AddressBook";
import StoreCredit from "../../components/StoreCredit";
import Orders from "../../components/Orders";
import Inbox from "../../components/Inbox";
import PendingReview from "../../components/PendingReview";
import Voucher from "../../components/Voucher";
import SavedItems from "../../components/SavedItems";
import FollowedSellers from "../../components/FollowedSellers";
import { isUserLoggedInAtom } from "../../redux/Store";
import { useSetAtom } from "jotai";
import { FiMenu } from "react-icons/fi";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setIsUserLoggedIn = useSetAtom(isUserLoggedInAtom);

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) setActiveTab(tab);
  }, [location.search]);

  const handleSelectAddress = (index) => {
    setSelectedAddressIndex(index);
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    navigate("/signin");
  };

  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu size={24} />
      </button>
      
      {/* Sidebar */}
      <div 
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-white p-4 z-50 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-1/4`}
      >
        <ul>
          {[
            "account", "orders", "inbox", "pendingReview", "voucher", "savedItems", "followedSellers"
          ].map((tab) => (
            <li
              key={tab}
              className={`py-3 px-5 cursor-pointer ${
                activeTab === tab ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setIsSidebarOpen(false);
              }}
            >
              {tab.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </li>
          ))}
        </ul>
        <p onClick={handleLogout} className="py-3 px-5 cursor-pointer text-red-500">
          Logout
        </p>
      </div>

      {/* Dynamic Content */}
      <div className="flex-1 bg-white p-6">
        <h1 className="text-xl mb-5">Account Overview</h1>

        {activeTab === "account" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Accountdetails />
            <AddressBook
              savedAddresses={savedAddresses}
              onSelectAddress={handleSelectAddress}
              selectedAddressIndex={selectedAddressIndex}
            />
            <StoreCredit />
          </div>
        )}

        {activeTab === "orders" && <Orders />}
        {activeTab === "inbox" && <Inbox />}
        {activeTab === "pendingReview" && <PendingReview />}
        {activeTab === "voucher" && <Voucher />}
        {activeTab === "savedItems" && <SavedItems />}
        {activeTab === "followedSellers" && <FollowedSellers />}
      </div>
    </div>
  );
};

export default Profile;
