import { useState } from 'react';
import Axios from 'axios'

export const Register = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmation, setRegisterConfirmation] = useState("");

  const Register = () => {
    if (registerPassword === registerConfirmation) {
      Axios({
        method: "POST",
        data: {
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
        },
        withCredentials: true,
        url: "http://localhost:4000/auth/register",
      }).then((res) => console.log(res));
    }
  };
  return (
    <div className="Register">
        <div className="container">
          <div className="row">
            {registerUsername}
            {registerEmail}
            {registerPassword}
            {registerConfirmation}
            <form className="col s12" onSubmit={Register}>

              {/* Username */}
              <div className="row">
                <div className="input-field col s12">
                <input 
                  id="user_name" 
                  type="text" 
                  className="validate" 
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  required 
                />
                <label for="user_name">Username *</label>
                </div>
              </div>

              {/* Email */}
              <div className="row">
                <div className="input-field col s12">
                  <input 
                  id="email" 
                  type="email" 
                  className="validate" 
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required /
                  >
                  <label for="email">Email *</label>
                </div>
              </div>

              {/* Password */}
              <div className="row">
                <div className="input-field col s12">
                  <input 
                    id="password" 
                    type="password" 
                    className="validate" 
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                  <label for="password">Password *</label>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="row">
                <div className="input-field col s12">
                  <input 
                    id="confirmation" 
                    type="password" 
                    className="validate" 
                    onChange={(e) => setRegisterConfirmation(e.target.value)}
                    required 
                  />
                  <label for="confirmation">Confirm Password *</label>
                </div>
              </div>

              {/* Summit button */}
              <button className="btn waves-effect waves-light" type="submit" name="action">Regesiter</button>
            
            </form>
          </div>
        </div>
    </div>
  )
}
