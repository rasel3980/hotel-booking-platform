import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginAnimationData from '../assets/LoginAnimation.json';
import Lottie from 'lottie-react';
import axios from 'axios';

const Login = () => {
  const { handleSignIN, handleGoogleLogin, user } = useContext(authContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLoginForm = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    setErrorMessage('');
    setSuccess(false);

    handleSignIN(email, password)
      .then((result) => {
        const user = {email:email}
        axios.post("https://hotel-booking-server-one-xi.vercel.app/jwt", user, {withCredentials:true})
        .then(data=>{
        })
        setSuccess(true);
        navigate('/');
        event.target.reset();
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  const handleLogin = async () => {
    try {
      const result = await handleGoogleLogin(); 
  
      const user = { email: result.email };
      axios.post("https://hotel-booking-server-one-xi.vercel.app/jwt", user, { withCredentials: true })
        .then((data) => {
        });
  
      navigate('/'); 
    } catch (error) {
      setErrorMessage('Google login failed!');
    }
  };

  return (
    <>
      <div className="hero bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold ml-8">Login now!</h1>
            <Lottie style={{ width: '400px', height: 'auto' }} animationData={loginAnimationData} />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl pb-5">
            <form onSubmit={handleLoginForm} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="Email" name="email" placeholder="Email" className="input input-bordered" required />
              </div>
              <div className="form-control relative ">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <button onClick={() => setShowPassword(!showPassword)} className="btn absolute right-3 top-12 btn-xs">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <label className="label">
                  <NavLink to="/forget-password" className="label-text-alt link link-hover">
                    Forgot password?
                  </NavLink>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>

            <p className="ml-5 mb-5 mr-3">
              New to this website? Please{' '}
              <button className="btn btn-sm bg-blue-600 text-white">
                <NavLink to="/register">Register</NavLink>
              </button>
            </p>
            <div className="flex justify-center items-center">
              <button onClick={handleLogin} className="flex items-center justify-center">
                <FcGoogle size={40} />
                Login with Google
              </button>
            </div>

            {errorMessage && <p className="text-red-600 text-lg">{errorMessage}</p>}
            {success && <p className="text-green-600 text-lg ml-20">Login Successfully</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
