import { useRef, useState, useEffect } from 'react';
import registerImg from '../../images/register.svg';
import Axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import unkownUser from '../../images/unkownUser.png';
import Model from '../Model';
import M from 'materialize-css';

export const Register = () => {

  // useRef
  const form = useRef(null);
  const ProfileUrl = useRef(null);

  // useState
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmation, setRegisterConfirmation] = useState("");
  const [profileImg, setprofileImg] = useState(unkownUser);

  // Initialize all of the Materialize Components
  useEffect(() => {
    M.AutoInit();
  }, []);

  // Registered
  const notifySuccess = () => {
    toast.success('Registered successfully.')
    window.location.href = 'http://localhost:3000/holdings';
  };

  // Passwords don't match
  const notifyError = () => {
    toast.error("Passwords don't match!");
    form.current[2].className += ' invalid';
    form.current[3].className += ' invalid';
    form.current[2].value = '';
    form.current[3].value = '';
  };

  // Username already exist
  const notifyError2 = (err) => {
    toast.error(err);
    form.current[0].className += ' invalid';
    form.current[0].value = '';
    setRegisterUsername('');
  };

  // Get Url for Profile image
  const getProfileUrl = () => {
    setprofileImg(ProfileUrl.current.value);
    ProfileUrl.current.value='';
  }
  
  // Register new user
  const RegisterUser = async (e) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmation) {
      return notifyError();
    } else {
      await Axios({
        method: "POST",
        data: {
          profilePicture: profileImg,
          username: registerUsername.toUpperCase(),
          email: registerEmail,
          password: registerPassword,
        },
        withCredentials: true,
        url: "http://localhost:4000/auth/register",
      }).then((res, error) => {
        res.data === 'ok' ? notifySuccess() :  notifyError2(res.data);
        if(error) {
          console.log(error)
        }
      });
    }
  };

  return (
    <div className="Register">
        <div className="container">
          <div className="row center box_row">

          {/* Right Box Content */}  
          <div className="col s12 m12 l6 Register_rightBox" > 

            {/* Header */}  
            <div className="title center card teal lighten-1"> 
              <span className="registerHeader truncate white-text"> Let’s Get Started</span>
            </div>

            {/* Quote */}  
            <div className="register_quote">
              <p>"An investment in knowledge pays the best interest." </p>
              <p>— <b>Benjamin Franklin</b> </p>
            </div>

              {/* Image */}  
            <img 
              className="svg responsive-img"  
              src={registerImg} 
              alt="registerImg"
            />
          </div>

          {/* Left Box Content */}  
          <div className="col s12 m12 l6 card Register_leftBox" >

            {/* Notifications */}
            <Toaster />

            <form className="col s12" ref={form} onSubmit={RegisterUser}>

            {/* Custom icon */}
            <div className="row custom-icon">
              <div className="col s3">
                <a className="modal-trigger" href="#showModal"><img 
                  className="unkownUser circle responsive-img" 
                  alt="Not found "
                  src={profileImg}
                />
                </a>
              </div>
              <div className="col s9">
                <p className="profile-name truncate">{registerUsername}</p>
                <p className="profile-email truncate"> {registerEmail} </p>
              </div>
            </div>

            {/* Modal Structure */}
            <Model 
              ProfileUrl={ProfileUrl} 
              getProfileUrl={getProfileUrl} 
            />
            
            {/* Input-field Username */}
            <div className="row">
              <div className="input-field col s12">
                <input 
                  id="user_name" 
                  type="text" 
                  className="validate"
                  autoComplete="username"
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  required 
                />
              <label htmlFor="user_name">Username *</label>
              </div>
            </div>

            {/* Input-field Email */}
            <div className="row">
              <div className="input-field col s12">
                <input 
                id="email" 
                type="email" 
                className="validate" 
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
                />
                <label htmlFor="email">Email *</label>
              </div>
            </div>

            {/* Input-field Password */}
            <div className="row">
              <div className="input-field col s12">
                <input 
                  id="password" 
                  type="password" 
                  autoComplete="new-password"
                  className="validate" 
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
                <label htmlFor="password">Password *</label>
              </div>
            </div>

            {/* Input-field Confirm Password */}
            <div className="row">
              <div className="input-field col s12">
                <input 
                  id="confirmation" 
                  type="password" 
                  className="validate" 
                  autoComplete="new-password"
                  onChange={(e) => setRegisterConfirmation(e.target.value)}
                  required 
                />
                <label htmlFor="confirmation">Confirm Password *</label>
              </div>

            {/* Summit button */}
            <button className="registerBtn btn waves-effect waves-light col s12" type="submit" name="action">Regesiter</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  )
}
