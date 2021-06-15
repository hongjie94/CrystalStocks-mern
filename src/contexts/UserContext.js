import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const LoginContext = createContext({});
export const UpdateContext = createContext({});

export default function Context(props) {
    
  const [UserObject, setUserObject] = useState(null);
  const [Auth, setAuth] = useState(false);

  // Get User Objects
  useEffect(() => {
    axios.get("http://localhost:4000/auth/getuser", { 
      withCredentials: true }
      ).then((res) => {
        console.log(res.data);
      if (res.data) {
        setUserObject(res.data);
        setAuth(true);
      }
    });
  }, []);

  // Update User Objects
  const UpdateUserObject = (obj) => {
    setUserObject(obj);
    setAuth(true);
  }

  return (
      <LoginContext.Provider value={{UserObject, Auth, UpdateUserObject}}>
              {props.children}
      </LoginContext.Provider>
  )
}