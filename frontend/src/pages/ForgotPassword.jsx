import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { API_URL } from "../utils/ApiUrl";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`bg-slate-300 h-screen flex justify-center items-center ${showModal ? "backdrop-blur-sm" : ""}`}>
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Reset Password"} />
          <div className="text-sm pb-5 pt-1 text-slate-500">
            Enter your registered email, and we'll send a password reset link.
          </div>
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            type={"email"}
            label={"Registered Email"}
            placeholder={"tejas@gmail.com"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                // const response = await axios.post(`${API_URL}/api/v1/user/password/forgot`, { username: email });
                // console.log("clicked")
                // if(response.data.success) {
                //   setShowModal(true);
                // }
                setShowModal(true);
              }}
              label={"Send Reset Password Mail"}
            />
          </div>
          <BottomWarning label={"Return to"} buttonText={"Sign In"} to={"/signin"} />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold mb-2">Mail Sent!</h2>
            <p className="text-gray-600">A password reset link has been sent to your email.</p>
            <div className="mt-4">
              <Button onClick={() => navigate("/signin")} label={"Go to Sign In"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
