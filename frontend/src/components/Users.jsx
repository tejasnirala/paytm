import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/ApiUrl";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState(""); // Debounced state
  const [currentLoggedInUserId, setCurrentLoggedInUserId] = useState([]);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 500); // Adjust the debounce delay as needed

    return () => clearTimeout(handler);
  }, [filter]);

  // API call using debounced value
  useEffect(() => {
    if (debouncedFilter === "" && filter !== "") return; // Prevent unnecessary API call

    axios.get(`${API_URL}/api/v1/user/bulk?filter=${debouncedFilter}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(response => {
      setUsers(response.data.user);
    });
  }, [debouncedFilter]);

  useEffect(() => {
    axios.get(`${API_URL}/api/v1/user/me`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then(response => setCurrentLoggedInUserId(response.data.user));
  }, []);

  return (
    <div>
      <div className="font-bold text-xl mt-5">Users</div>
      <input
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        placeholder="Search users..."
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
      <div>
        {users
          .filter(user => user._id !== currentLoggedInUserId._id)
          .map(user => <RenderEachUser key={user._id} User={user} />)}
      </div>
    </div>
  );
}

function RenderEachUser({ User }) {
  const navigate = useNavigate();
  const transactionType = User.lastTransactionType || "Sent"; // Mocking transaction type
  const transactionAmount = User.lastTransactionAmount || 0; // Mocking transaction amount


  return (
    <div className="flex justify-between mt-2 bg-gray-100 rounded-lg p-2">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {User.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col">
          <div>{User.firstName} {User.lastName}</div>
          <div className="text-sm text-gray-400">{transactionType}: {transactionAmount}</div>
        </div>
      </div>
      <div className="pt-2">
        <Button
          onClick={() => {
            navigate(`/send?id=${User._id}&name=${User.firstName}_${User.lastName}`);
          }}
          label="Send Money"
        />
      </div>
    </div>
  );
}
