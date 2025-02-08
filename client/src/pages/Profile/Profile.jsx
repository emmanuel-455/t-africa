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
import Address from "../../components/Address";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setIsUserLoggedIn = useSetAtom(isUserLoggedInAtom);

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    // Extract tab from query params and set activeTab
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
    <div className="flex w-full text-xs font-medium md:font-normal md:text-base gap-2 md:gap-4 flex-row">
      {/* Sidebar */}
      <div className="flex rounded-md flex-col md:w-[30%] bg-white">
        <ul>
          <li
            className={`py-3 md:px-5 px-2 cursor-pointer ${activeTab === "account" ? "bg-gray-300" : "hover:bg-gray-200"}`}
            onClick={() => setActiveTab("account")}
          >
            My Account
          </li>
          <li
            className={`py-3 md:px-5 px-2 cursor-pointer ${activeTab === "orders" ? "bg-gray-300" : "hover:bg-gray-200"}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </li>
          <li
            className={`py-3 md:px-5 px-2 cursor-pointer ${activeTab === "inbox" ? "bg-gray-300" : "hover:bg-gray-200"}`}
            onClick={() => setActiveTab("inbox")}
          >
            Inbox
          </li>
          <li
            className={`py-3 md:px-5 px-2 cursor-pointer ${activeTab === "pendingReview" ? "bg-gray-300" : "hover:bg-gray-200"}`}
            onClick={() => setActiveTab("pendingReview")}
          >
            Pending Review
          </li>
          <li
            className={`py-3 md:px-5 px-2 cursor-pointer ${activeTab === "voucher" ? "bg-gray-300" : "hover:bg-gray-200"}`}
            onClick={() => setActiveTab("voucher")}
          >
            Voucher
          </li>
          <li
            className={`py-3 md:px-5 px-2 cursor-pointer ${activeTab === "savedItems" ? "bg-gray-300" : "hover:bg-gray-200"}`}
            onClick={() => setActiveTab("savedItems")}
          >
            Saved Items
          </li>
          <li
            className={`py-3 md:px-5 px-2 cursor-pointer ${activeTab === "followedSellers" ? "bg-gray-300" : "hover:bg-gray-200"}`}
            onClick={() => setActiveTab("followedSellers")}
          >
            Followed Sellers
          </li>
        </ul>
        <p onClick={handleLogout} className="py-3 px-5 cursor-pointer text-red-500">
          Logout
        </p>
      </div>

      {/* Dynamic Content */}
      <div className="flex-1 bg-white px-2 md:px-6 py-3">
        <h1 className="text-xl mb-5">Account Overview</h1>

        {activeTab === "account" && (
          <div className="gap-3 grid md:grid-cols-2">
            <div className="w-full">
              <Accountdetails />
            </div>
            <div className="w-full">
            <Address />
            </div>
            <div>
              <StoreCredit />
            </div>
          </div>
        )}

        <div>
        {activeTab === "orders" && <Orders />}
        {activeTab === "inbox" && <Inbox />}
        {activeTab === "pendingReview" && <PendingReview />}
        {activeTab === "voucher" && <Voucher />}
        {activeTab === "savedItems" && <SavedItems />}
        {activeTab === "followedSellers" && <FollowedSellers />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
