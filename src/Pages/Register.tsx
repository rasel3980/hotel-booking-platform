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
  const [success, setSuccess]           = useState<boolean>(false);
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
      setErrorMessage('Password should be 6 characters or longer'); return;
    }
    if (!/[a-z]/.test(password)) {
      setErrorMessage('Password must contain at least one lowercase letter'); return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMessage('Password must contain at least one uppercase letter'); return;
    }
    handleRegister(email, password, name, photo)
      .then(() => {
        axios
          .post('https://hotel-booking-server-one-xi.vercel.app/jwt', { email }, { withCredentials: true })
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
    <section
      className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0f0f2e 50%, #0a1628 100%)" }}
    >
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="hidden lg:flex flex-col items-center gap-6">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full">
              Get Started
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Create your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Account
              </span>
            </h1>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-sm">
              Join us today and start exploring our luxurious rooms and exclusive deals.
            </p>
          </div>
          <Lottie animationData={RegisterAnimation} style={{ width: '320px', height: 'auto' }} />
        </div>
        <div
          className="w-full rounded-3xl border border-white/10 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-2xl shadow-black/40"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div className="lg:hidden text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full">
              Get Started
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white">Register</h2>
          </div>

          <div className="hidden lg:block">
            <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400">Register</p>
            <h2 className="mt-1 text-2xl font-bold text-white">Create an account</h2>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/50 transition-all duration-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="url"
                  placeholder="https://..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/50 transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/50 transition-all duration-200"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/50 transition-all duration-200 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Min 6 characters, with uppercase & lowercase letters
              </p>
            </div>
            {errorMessage && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl">
                ✕ {errorMessage}
              </p>
            )}
            {success && (
              <p className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl">
                ✓ Registered successfully! Redirecting...
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold tracking-wide shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200 mt-2"
            >
              Create Account
            </button>
          </form>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <NavLink
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors duration-200"
            >
              Sign in
            </NavLink>
          </p>

        </div>
      </div>
    </section>
  );
};

export default Register;