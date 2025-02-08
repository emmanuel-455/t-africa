import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";
//import AddNewShippingAddress from "./AddNewShippingAddress";

const AddressBook = ({ savedAddresses, onEdit, onDelete }) => {
   console.log(savedAddresses)
  return (
    <div className="h-[200px] w-[100%] border border-gray-300">
      <h2 className="border-b border-gray-300 py-3 px-3">ADDRESS BOOK</h2>
      {savedAddresses.length > 0 ? (
        <ul className="space-y-2 flex flex-col">
          {savedAddresses.map((address, index) => (
            <div key={index} className="">
              <div className="flex justify-between items-start flex-row">
                <li className="rounded-md mb-3 p-4 w-full md:w-auto flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>Name:</strong> {address.fullName}
                      <p>
                        <strong>Phone:</strong> {address.phone}
                      </p>
                      <p>
                        <strong>Address:</strong> {address.address}, {address.city}, {address.state}, {address.zip}, {address.country}
                      </p>
                    </div>
                  </div>
                </li>
                <div className="flex justify-end space-x-2 mt-1 md:mt-0">
                  <button
                    onClick={() => onEdit(index)}
                    className=" text-black px-3 py-1 rounded-md "
                  >
                    <FaEdit className="inline-block w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className=" text-black px-3 py-1 rounded-md "
                  >
                    <FaTrash className="inline-block w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p className="mb-3">No saved addresses yet.</p>
      )}
      
    </div>
  );
};

// Add PropTypes validation for the AddressBook component
AddressBook.propTypes = {
  savedAddresses: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddNewAddress: PropTypes.func.isRequired, // Function to add new address
};

export default AddressBook;
