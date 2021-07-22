import { useRef, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { LoginContext } from '../../contexts/UserContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import registerImg from '../../images/register.svg';
import registerHeader from '../../images/register_header.svg';
import unkownUser from '../../images/unkownUser.png';
import Model from '../ReuseableComponents/ProfileUrlModel';
import { NavLink} from 'react-router-dom';

export const Register = () => {

  // useHistory
  const history = useHistory();

  // useContext
  const LoginObject = useContext(LoginContext);

  // useRef
  const form = useRef(null);
  const ProfileUrl = useRef(null);

  // useState
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmation, setRegisterConfirmation] = useState("");
  const [profileImg, setprofileImg] = useState(unkownUser);

  // Model Header Text
  const modelHeader = "Custom Profile Photo";

  // Successfully registered 
  const notifySuccess = async (userObject) => {
    await LoginObject.getUserObjects();
    await toast.success('Registered successfully.');
    history.push('/history');
  };

  // Passwords don't match
  const notifyError = () => {
    toast.error("Passwords don't match!");
    form.current[4].className += ' invalid';
    form.current[5].className += ' invalid';
    form.current[4].value = '';
    form.current[5].value = '';
  };

  // Username already exist
  const notifyError2 = (err) => {
    toast.error(err);
    form.current[2].className += ' invalid';
    form.current[2].value = '';
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
      await axios({
        method: "POST",
        data: {
          profilePicture: profileImg,
          username: registerUsername.toUpperCase(),
          email: registerEmail,
          password: registerPassword,
        },
        withCredentials: true,
        url: "https://crystalstocks-backend.herokuapp.com/auth/register"
        // url: "http://localhost:4000/auth/register"
      }).then((res, error) => {
        if(error) {
          console.log(error);
        }
        res.data === 'Username already exists.' ? notifyError2(res.data) : notifySuccess(res.data);
      });
    }
  };


  return (
    <div className="Register">
        <div className="container">
          <div className="row center box_row">

          {/* Left Box Content */}  
          <div className="col s12 m12 l6 hide-on-med-and-down Register_leftBox" > 

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
          <div className="col s12 m12 l6 card Register_rightBox" >

            {/* Notifications */}
            <Toaster />
          
            <form className="col s12" ref={form} onSubmit={RegisterUser}>
              
            {/* Register Header */}
            <div className="title registerHeader center"> 
              <img className="responsive-img" src={registerHeader} alt=""/>
              <span className=" teal-text"> Register</span>
            </div>

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
              modelHeader={modelHeader}
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
            <p className="toLogin">Already have an account? 
              <NavLink className="teal-text" to="/login"> Login </NavLink> 
              here
            </p>
          </form>
          </div>
        </div>
      </div>
    </div>
  )
}
