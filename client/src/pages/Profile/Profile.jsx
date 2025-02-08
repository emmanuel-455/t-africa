import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accountdetails from "../../components/Accountdetails";
import Address from "../../components/Address";
import StoreCredit from "../../components/StoreCredit";
import Orders from "../../components/Orders";
import Inbox from "../../components/Inbox";
import PendingReview from "../../components/PendingReview";
import Voucher from "../../components/Voucher";
import SavedItems from "../../components/SavedItems";
import FollowedSellers from "../../components/FollowedSellers";
import { isUserLoggedInAtom } from "../../redux/Store";
import { useSetAtom } from "jotai";
import { Menu, X } from "lucide-react";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setIsUserLoggedIn = useSetAtom(isUserLoggedInAtom);

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="md:hidden flex justify-between items-center p-4 bg-white">
        <h1 className="text-lg font-semibold">Profile</h1>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white w-64 p-4 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:relative md:translate-x-0 md:w-1/4`}
      >
        <ul>
          {["account", "orders", "inbox", "pendingReview", "voucher", "savedItems", "followedSellers"].map((tab) => (
            <li
              key={tab}
              className={`py-3 px-5 cursor-pointer ${
                activeTab === tab ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setMenuOpen(false);
              }}
            >
              {tab.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </li>
          ))}
        </ul>
        <p onClick={() => { handleLogout(); setMenuOpen(false); }} className="py-3 px-5 cursor-pointer text-red-500">
          Logout
        </p>
      </div>

      {/* Dynamic Content */}
      <div className="flex-1 bg-white p-3">
        <h1 className="text-xl font-medium mb-5">Account Overview</h1>

        {activeTab === "account" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Accountdetails />
            <Address
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
