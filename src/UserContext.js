import { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const LoginContext = createContext({});
export default function Context(props) {
    
    const [UserObject, setUserObject] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:4000/auth/getuser", { 
            withCredentials: true }, {credentials: 'include'}).then((res) => {
                console.log(res.data)
            if (res.data) {
                setUserObject(res.data);
            }
        });
    }, []);

    return (
        <LoginContext.Provider value={UserObject}>
            {props.children}
        </LoginContext.Provider>
    )
}