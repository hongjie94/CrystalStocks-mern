import Axios from 'axios'
import { useState } from 'react';
export const Login = () => {

  const googleLogin = ()=>{
    window.open("http://localhost:4000/auth/google", "_self");
  };

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  
  const login = () => {
    Axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:4000/auth/login",
      data: {
        username: loginUsername,
        password: loginPassword,
      }
    }).then((res) => console.log(res));
  };

  return (
    <div>
      Login with  <button onClick={googleLogin}>Google</button>
    </div>
  )
};
