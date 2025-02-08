import PropTypes from "prop-types";
import { FaPlusCircle } from "react-icons/fa";

const AddNewShippingAddress = ({ onAddNewAddress }) => {
  return (
    <button
      onClick={onAddNewAddress} // Trigger the function to show the form
      className="tflex items-center"
    >
      <FaPlusCircle className="w-6 h-6 inline-block mr-2" /> Add New Shipping Address
    </button>
  );
};

AddNewShippingAddress.propTypes = {
  onAddNewAddress: PropTypes.func.isRequired,
};

export default AddNewShippingAddress;
