import React, { useContext, useState } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import RegisterAnimation from '../assets/Animation - 1734957972918.json'
import Lottie from 'lottie-react';
import axios from 'axios';

const Register = () => {
    const {handleRegister} = useContext(authContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const Name = event.target.name.value;
    const photo = event.target.url.value;
    // console.log(Name,email, password,photo);
    setErrorMessage("");
    setSuccess(false);
    if (password.length < 6) {
      setErrorMessage("password should be 6 character or longer");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setErrorMessage("password must contain at least one lowercase letter");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMessage("password must contain at least one Uppercase letter");
      return;
    }

    handleRegister(email, password)
    .then((result) => {
      const user = { email: email };
      axios.post("https://hotel-booking-server-one-xi.vercel.app/jwt", user, { withCredentials: true })
        .then((data) => {
        })
        .catch((error) => {
          console.error("JWT token generation failed:", error);
        });

      setSuccess(true);
      navigate('/');
      event.target.reset(); 
    })
    .catch((error) => {
      setErrorMessage(error.message); 
      setSuccess(false); 
    });
};

    return (
        <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div>
        <h1 className="text-3xl font-bold ml-10">SignUp now!</h1>
        <Lottie animationData={RegisterAnimation}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo-URL</span>
              </label>
              <input
                type="url"
                name="url"
                placeholder="Photo-URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="Email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative ">
              <label className="label">
                <span className="label-text">password</span>
              </label>
              <input
                type={showpassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <button
                onClick={() => setShowpassword(!showpassword)}
                className="btn absolute right-3 top-12 btn-xs"
              >
                {showpassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}{" "}
              </button>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <p className="ml-4 mb-4 mr-4">
            Already have an account? Please{" "}
            <button className="btn btn-sm bg-blue-600 text-white">
              <NavLink to="/login">Login</NavLink>
              
            </button>
          </p>
          {errorMessage && (
            <p className="text-red-600 ml-4 mb-3">{errorMessage}</p>
          )}
          {success && (
            <p className="text-green-600 mb-3 ml-20 text-lg">
              Register Successfully
            </p>
          )}
        </div>
      </div>
    </div>
    );
};

export default Register;