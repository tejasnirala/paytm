/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users() {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState("")
  const [currentLoggedInUserId, setCurrentLoggedInUserId] = useState([])
  
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
      headers: {
        Authorization: localStorage.getItem("token")
      },
    })
    .then(response => {
      setUsers(response.data.user)
    })
  }, [filter])


  useEffect( () => {
    axios.get("http://localhost:3000/api/v1/user/me", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => setCurrentLoggedInUserId(response.data.user))
  }, []);
  
  
  return <div>
    <div className="font-bold text-xl mt-5">
      Users
    </div>
      <input 
        onChange={(e) => {setFilter(e.target.value)}} 
        type={"text"} 
        placeholder={"Search users..."} 
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    <div>
      {users
        .filter(user => user._id !== currentLoggedInUserId._id) // Remove current user
        .map(user => <RenderEachUser key={user._id} User={user} />)
      }
    </div>
  </div>
}

function RenderEachUser({User}) {
  const navigate = useNavigate();

  return <div className="flex justify-between mt-2">
  <div className="flex items-center">
    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
      <div className="flex flex-col justify-center h-full text-xl">
      {User.firstName[0].toUpperCase()}
      </div>
    </div>
    <div>{User.firstName} {User.lastName}</div>
  </div>
  <div>
    <Button
      onClick={() => {
        navigate(`/send?id=${User._id}&name=${User.firstName}_${User.lastName}`);
      }}
      label={"Send Money"} 
    />
  </div>
</div>
}