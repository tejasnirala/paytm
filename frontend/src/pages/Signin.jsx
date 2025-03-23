import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: token, // Send token for validation
        },
      })
      .then(response => {
        if(response.status===200) {
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
        <InputBox onChange={(e) => {
          setEmail(e.target.value);
        }} type={"email"} label={"Email"} placeholder={"tejas@gmail.com"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value);
        }} type={"text"} label={"Password"} placeholder={"12345678"} />
        <div className="pt-4">
          <Button 
            onClick={async () => {
              const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`, {
                username: email,
                password: password,
              });

              const token = response.data.token;

              localStorage.setItem("token", `Bearer ${token}`);
              navigate('/dashboard')
            }}
            label={"Sign In"}
          />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
      </div>
    </div>
  </div>
}