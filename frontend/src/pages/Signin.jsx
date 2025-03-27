import axios from "axios";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { API_URL } from "../utils/ApiUrl";
import { ForgotPasswordWarning } from "../components/ForgotPasswordWarning";
import { PasswordInputBox } from "../components/PaaswordInputBox";

export function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSignin = useCallback(async () => {
    const response = await axios.post(`${API_URL}/api/v1/user/signin`, {
      username: emailRef.current,
      password: passwordRef.current,
    });
    localStorage.setItem("token", `Bearer ${response.data.token}`);
    navigate('/dashboard')
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.get(`${API_URL}/api/v1/user/me`, {
        headers: {
          Authorization: token, // Send token for validation
        },
      })
        .then(response => {
          if (response.status === 200) {
            navigate("/dashboard"); // ✅ Redirect to dashboard if valid
          } else {
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false); // Stop loading if token is invalid
        });
    } else {
      setLoading(false); // Stop loading if no token exists
    }
  }, [navigate]);

  if (loading) return null; // Prevent UI flickering

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign In"} />
        <SubHeading label={"Enter your credentials to access your account."} />

        <InputBox onChange={(e) => (emailRef.current = e.target.value)} type={"email"} label={"Email"} placeholder={"tejas@gmail.com"} />
        <PasswordInputContainer onChange={(e) => (passwordRef.current = e.target.value)} label={"Password"} />

        <div className="pt-4">
          <Button onClick={handleSignin} label={"Sign In"} />
        </div>

        <ForgotPasswordWarning buttonText={'Forgot password?'} to={'/password/forgot'} />
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
      </div>
    </div>
  </div>
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