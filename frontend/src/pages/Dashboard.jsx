import { useEffect, useState } from 'react';
import { Appbar } from '../components/Appbar';
import { Balance } from '../components/Balance';
import { Users } from '../components/Users';
import axios from 'axios';
import { API_URL } from '../utils/ApiUrl';

export function Dashboard() {

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/api/v1/account/balance`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        setBalance(response.data.balance)
      })
  }, [balance])

  const rupeeBalance = Math.floor((balance/100)).toLocaleString("en-IN");
  const paiseBalance = (balance%100).toString();
  const finalBalance = rupeeBalance + "." + paiseBalance;


  return <div>
    <Appbar />
    <div className='m-8'>
      <Balance value={finalBalance} />
      <Users />
    </div>
  </div>
}