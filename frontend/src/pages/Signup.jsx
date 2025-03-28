import axios from "axios";
import { useRef, useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { PasswordInputBox } from "../components/PaaswordInputBox";
import { SubHeading } from "../components/SubHeading";
import { API_URL } from "../utils/ApiUrl";

export function Signup() {
  const navigate = useNavigate();

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const handleSignup = useCallback(async () => {
    const response = await axios.post(`${API_URL}/api/v1/user/signup`, {
      username: usernameRef.current,
      password: passwordRef.current,
      firstName: firstNameRef.current,
      lastName: lastNameRef.current,
    });
    if(response.status === 200) navigate("/verify-otp", { state: { username: usernameRef.current } });
  }, []);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign Up" />
          <SubHeading label="Enter your information to create an account" />

          <InputBox onChange={(e) => (firstNameRef.current = e.target.value)} type="text" label="First Name" placeholder="John" />
          <InputBox onChange={(e) => (lastNameRef.current = e.target.value)} type="text" label="Last Name" placeholder="Doe" />
          <InputBox onChange={(e) => (usernameRef.current = e.target.value)} type="email" label="Email" placeholder="tejas@gmail.com" />

          <PasswordInputContainer onChange={(e) => (passwordRef.current = e.target.value)} />

          <div className="pt-4">
            <Button label="Sign Up" onClick={handleSignup} />
          </div>

          <BottomWarning label="Already have an account?" buttonText="Sign In" to="/signin" />
        </div>
      </div>
    </div>
  );
}

const PasswordInputContainer = memo(({ onChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  return <PasswordInputBox
    label={"Password"}
    onChange={onChange}
    isVisible={isVisible}
    toggleVisibility={() => setIsVisible((prev) => !prev)}
  />
});