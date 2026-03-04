import React, { useContext, useState } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import RegisterAnimation from '../assets/Animation - 1734957972918.json';
import Lottie from 'lottie-react';
import axios from 'axios';

const Register: React.FC = () => {
  const auth = useContext(authContext);
  if (!auth) throw new Error('Register must be used within AuthProvider');

  const { handleRegister } = auth;

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;

    const email    = (form.elements.namedItem('email')    as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const name     = (form.elements.namedItem('name')     as HTMLInputElement).value;
    const photo    = (form.elements.namedItem('url')      as HTMLInputElement).value;

    setErrorMessage('');
    setSuccess(false);

    if (password.length < 6) {
      setErrorMessage('Password should be 6 characters or longer');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setErrorMessage('Password must contain at least one lowercase letter');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMessage('Password must contain at least one uppercase letter');
      return;
    }

    handleRegister(email, password)
      .then(() => {
        axios
          .post(
            'https://hotel-booking-server-one-xi.vercel.app/jwt',
            { email },
            { withCredentials: true }
          )
          .catch((error) => console.error('JWT token generation failed:', error));

        setSuccess(true);
        navigate('/');
        form.reset();
      })
      .catch((error: Error) => {
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div>
          <h1 className="text-3xl font-bold ml-10">SignUp now!</h1>
          <Lottie animationData={RegisterAnimation} />
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
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn absolute right-3 top-12 btn-xs"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>

          <p className="ml-4 mb-4 mr-4">
            Already have an account? Please{' '}
            <button className="btn btn-sm bg-blue-600 text-white">
              <NavLink to="/login">Login</NavLink>
            </button>
          </p>

          {errorMessage && <p className="text-red-600 ml-4 mb-3">{errorMessage}</p>}
          {success && <p className="text-green-600 mb-3 ml-20 text-lg">Register Successfully</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;