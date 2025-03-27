import { useEffect, useState } from "react"
import axios from "axios";
import { API_URL } from "../utils/ApiUrl";
import { LogoutButton } from "./LogoutButton";
import { useNavigate } from "react-router-dom";


export function Appbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect( () => {
    axios.get(`${API_URL}/api/v1/user/me`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        setUser(response.data.user)
      })
  }, []);

  return <div className="shadow h-14 flex justify-between">
    <div className="flex flex-col justify-center h-full ml-4">
      PayTm APP
    </div>
    <div className="flex">
      <div className="flex flex-col justify-center h-full mr-4">
        Hello {user.firstName}
      </div>
      <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
        <div className="flex flex-col justify-center h-full text-xl">
          {user?.firstName?.[0].toUpperCase()}
        </div>
      </div>
      <div className="flex flex-col justify-center pt-2">
        <LogoutButton 
          onClick={async () => {
            localStorage.removeItem("token")
            navigate('/signin')
          }}
        />
      </div>
    </div>
  </div>
}