import axios from "axios";
import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign Up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox onChange={(e) => {
          setFirstName(e.target.value);
        }} type={"text"} label={"First Name"} placeholder={"John"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} type={"text"} label={"Last Name"} placeholder={"Doe"} />
        <InputBox onChange={(e) => {
          setUsername(e.target.value);
        }} type={"email"} label={"Email"} placeholder={"tejas@gmail.com"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value);
        }} type={"text"} label={"Password"} placeholder={"12345678"} />
        <div className="pt-4">
          <Button 
            label={"Sign Up"} 
            onClick={async () => {
              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                password,
                firstName,
                lastName,
              });

              localStorage.setItem("token", `Bearer ${response.data.token}`);
              navigate("/dashboard")
            }}
          />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"} />
      </div>
    </div>
  </div>
}