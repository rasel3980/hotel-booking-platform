import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginAnimationData from '../assets/Animation - 1734957972918.json'
import Lottie from 'lottie-react';

const Login = () => {
    const {handleSignIN,handleGoogleLogin,user} = useContext(authContext);
    const [errorMessage,setErrorMessage]=useState('')
    const[success,setSuccess]= useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const Navigate = useNavigate();
    const navigate = useNavigate();

    const handleLoginForm = (event)=>{
        event.preventDefault();
        const Email = event.target.email.value;
        const Password = event.target.password.value;
        // console.log(Email,Password);
        setErrorMessage('')
        setSuccess(false)

        handleSignIN(Email,Password)
        .then(result=>{
            // console.log(result.user);
            setSuccess(true)
            Navigate("/")
            event.target.reset()
        })
        .catch(error=>{
            // console.log("ERROR",error);
            setErrorMessage(error.message)
            setSuccess(false)
        })
       
    }

    const handleLogin=()=>{
      handleGoogleLogin()
      .then(result=>{
        navigate("/")
      })
      .catch(error=>{
        console.log("ERROR",error);
      })
    }
    return (
        <>
        <div className="hero bg-base-200 ">
  <div className="hero-content flex-col lg:flex-row-reverse">
  <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold ml-8">Login now!</h1>
          <Lottie animationData={loginAnimationData}></Lottie>
        </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl pb-5">
      <form onSubmit={handleLoginForm} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control relative ">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type={showPassword?'text':'password'} 
          name='password' 
          placeholder="password" 
          className="input input-bordered" required />
          <button onClick={()=>setShowPassword(!showPassword)} 
          className='btn absolute right-3 top-12 btn-xs'>
             {
                showPassword?<FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
             } </button>
          <label className="label">
            <NavLink to="/forget password" className="label-text-alt link link-hover">Forgot password?</NavLink>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      
      <p className='ml-5 mb-5 mr-3'>New to this website? Please <button className='btn btn-sm bg-blue-600 text-white'><NavLink to="/register">Register</NavLink></button></p>
      <div className='flex justify-center items-center'>
      <button onClick={handleLogin} className='flex items-center justify-center'> <FcGoogle size={40} ></FcGoogle>Login with Google</button>
      
      </div>
      {
        errorMessage && <p className='text-red-600 text-lg'>{errorMessage}</p>
      }
      {
        success && <p className='text-green-600 text-lg ml-20'>Login Successfully</p>
      }
    </div>
    
  </div>
  
</div>

</>
    );
};

export default Login;