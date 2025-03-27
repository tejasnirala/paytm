import { Heading } from "../components/Heading";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../utils/ApiUrl";

export function SendMoney() {
  const [serchParams] = useSearchParams();
  const id = serchParams.get("id");
  const name = serchParams.get("name");
  const firstName = name.split("_")[0];
  const lastName = name.split("_")[1];

  const [amount, setAmount] = useState(0)
  const navigate = useNavigate();

  async function handlePaymentTransfer () {
    const response = await axios.post(
      `${API_URL}/api/v1/account/transfer`,
      { amount, to: id },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    console.log(response.data.message)
    navigate("/dashboard")
  }

  return <div className="bg-gray-100 h-screen flex justify-center">
    <div className="h-full flex flex-col justify-center">
      <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg flex flex-col justify-center">
        {/* ---------------- FIRST SECTION --------------- */}
        <div className="flex justify-center space-y-1.5 p-6">
          {/* --------------   SEND MONEY   ------------------- */}
          <Heading label={"Send Money"} />
        </div>
        {/* ---------------- SECOND SECTION --------------- */}
        <div className="p-6">
          {/* --------------- SECTION 2.1 ------------------- */}
          <div>
            {/* --------------   FRIEND'S NAME   ------------------- */}
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{firstName[0].toUpperCase()}</span>
              </div>
              <div className="text-2xl font-semibold">{firstName} {lastName}</div>
            </div>
          </div>
          {/* --------------- SECTION 2.2 ------------------- */}
          <div className="space-y-4">
            {/* --------------   ENTER AMOUNT   ------------------- */}
            <div className="space-y-2">
              <label className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed">Amount (in Rs)</label>
              <input
                onChange={(e) => { 
                  setAmount(e.target.value);
                }}
                type={"number"}
                placeholder={"Enter amount"}
                className="w-full px-2 py-1 border rounded border-slate-200"
                autoFocus
              />
            </div>
            {/* --------------   INITIATE TRANSFER   ------------------- */}
            <div>
              <button 
                onClick={handlePaymentTransfer}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
