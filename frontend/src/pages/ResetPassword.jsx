import axios from "axios";
import { memo, useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { API_URL } from "../utils/ApiUrl";

export function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [showModal, setShowModal] = useState(false);
  const passwordRef = useRef(""); // Use useState instead of useRef
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null); // State for validation message

  const handlePasswordChange = useCallback((e) => {
    passwordRef.current = e.target.value; // Update ref value without re-rendering
    setPasswordMatch(confirmPassword === e.target.value); // Ensure validation updates
  });

  const handleConfirmPasswordChange = useCallback((e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(value === passwordRef.current); // Compare with ref value
  });

  const handleResetPassword = useCallback(async () => {
    const response = await axios.post(
      `${API_URL}/api/v1/user/password/reset/${token}`,
      { password, confirmPassword }
    );
    if (response.status === 200) {
      setShowModal(true);
    }
  });

  return (
    <div className={`bg-slate-300 h-screen flex justify-center items-center ${showModal ? "backdrop-blur-sm" : ""}`}>
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <div className="pb-8">
            <MemoizedHeading label={"New Password"} />
          </div>
          <InputBox
            onChange={handlePasswordChange}
            type={"password"}
            label={"New Password"}
            placeholder={"********"}
          />
          <InputBox
            onChange={handleConfirmPasswordChange}
            type={"text"}
            label={"Confirm Password"}
            placeholder={"12345678"}
          />
          {confirmPassword && (
            <p className={`text-sm ${passwordMatch ? "text-green-600" : "text-red-600"}`}>
              {passwordMatch ? "Passwords match" : "Passwords do not match"}
            </p>
          )}
          <div className="pt-4">
            <MemoizedButton resetPassword={handleResetPassword} />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold mb-2">Password Reset Successfully!</h2>
            <div className="mt-10 pt-5">
              <Button onClick={() => navigate("/signin")} label={"Go to Sign In"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const MemoizedHeading = memo(function () {
  return <Heading label={"New Password"} />
})

const MemoizedButton = memo(function ({ resetPassword }) {
  return <Button
    onClick={resetPassword}
    label={"Reset Password"}
  />
})