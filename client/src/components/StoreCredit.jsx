import { useState } from "react";

function StoreCredit() {
   const [storeCredit] = useState(0);
  return (
    <div className="border h-[190px]">
         <h1 className="text-nowrap border-b py-3 px-3">T-AFRICA STORE CREDIT</h1>
          <div className="pt-4 pl-5">
            T-Africa store credit balance: $ {storeCredit}
          </div>
    </div>
  )
}

export default StoreCredit
