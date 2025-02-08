import { useState } from "react"

function Accountdetails() {
   const [fullName] = useState("Ngene Arinze")
   const [email] = useState("johndoe@example.com")
  return (
    <div className="border h-[200px]">
       {/* <p>Name: John Doe</p>
          <p>Email: johndoe@example.com</p>
          <p>Phone: 0800 123 4567</p>
          <p>Address: 123 Main St, City, State, Zip</p>
          <button className="bg-brandGreen text-white px-4 py-2 rounded-md">Edit Profile</button> */}
          <h1 className="text-nowrap border-b py-3 px-3">ACCOUNT DETAILS</h1>
          <div className="pt-4 pl-2 md:pl-5">
            <p>{fullName}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
    </div>
  )
}

export default Accountdetails
