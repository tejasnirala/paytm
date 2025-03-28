import { memo, useCallback, useEffect, useRef, useState } from "react"
import { Heading } from "../components/Heading";
import { API_URL } from "../utils/ApiUrl";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function OtpLoginInput ({length=5}) {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inputRefs = useRef([])

  useEffect(()=>{
    if(inputRefs.current[0]){
      inputRefs.current[0].focus()
    }
  }, [])

  const handleInputChange = useCallback((index, value) => {
    if(isNaN(value)) return;

    const newOtp = [...otp];

    // Allow only one input
    const updatedValue = value.trim(); // to remove the space (" ")
    newOtp[index] = updatedValue.slice(-1); // to fetch only last digit

    setOtp(newOtp);

    // Move to next empty input if current field is filled
    if(value && index < length-1 && inputRefs.current[index+1]) {
      inputRefs.current[newOtp.indexOf("")]?.focus()
    }
  })
  
  const handleKeyDown = useCallback((index, value) => {
    // Move to previous input if current field is empty
    if(inputRefs.current[index-1] && !otp[index] && value === "Backspace") {
      inputRefs.current[index-1].focus();
    }
  })

  const handleOnClick = useCallback((index) => {
    inputRefs.current[index].setSelectionRange(1,1)

    if(index > 0 && otp.indexOf("") < index) {
      inputRefs.current[otp.indexOf("")]?.focus();
    }
  })

  const handleOnSubmit = useCallback( async () => {
    const combinedOtp = otp.join("");
    const response = await axios.post(`${API_URL}/api/v1/user/verify-otp`, {
      username,
      otp: combinedOtp
    });

    if(response.status === 200) {
      navigate("/signin");
    }
  });

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-80 h-max py-2 px-4">
        <div className="flex justify-center mb-8">
          <MemoizedHeading/>
        </div>
        <div className="flex justify-center">
          <div className="pb-4">
            { otp.map((value, index) => {
              return <input
                key={index}
                type="text"
                value={value}
                ref={(input) => (inputRefs.current[index] = input)}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e)=>handleKeyDown(index, e.key)}
                onClick={()=>handleOnClick(index)}
                className="w-10 h-10 m-0.5 text-center text-2xl font-bold border border-slate-400 rounded-lg"
              />
            })}
          </div>
        </div>
        <div className="pt-4 px-6">
          <Button label="Verify OTP" onClick={handleOnSubmit} />
        </div>
      </div>
    </div>
  )
}

const MemoizedHeading = memo(function () {
  return <Heading label={"Enter OTP"} />
})