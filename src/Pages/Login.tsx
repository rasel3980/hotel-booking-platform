import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginAnimationData from '../assets/LoginAnimation.json';
import Lottie from 'lottie-react';
import axios from 'axios';

const Login: React.FC = () => {
  const auth = useContext(authContext);
  if (!auth) throw new Error('Login must be used within AuthProvider');

  const { handleSignIn, handleGoogleLogin } = auth;

  const [errorMessage, setErrorMessage]   = useState<string>('');
  const [success, setSuccess]             = useState<boolean>(false);
  const [showPassword, setShowPassword]   = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLoginForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;
    const email    = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    setErrorMessage('');
    setSuccess(false);

    handleSignIn(email, password)
      .then(() => {
        axios.post('https://hotel-booking-server-one-xi.vercel.app/jwt', { email }, { withCredentials: true });
        setSuccess(true);
        navigate('/');
        form.reset();
      })
      .catch((error: Error) => {
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  const handleGoogleLoginClick = async (): Promise<void> => {
    try {
      const result = await handleGoogleLogin();
      const email  = result.user.email;
      await axios.post('https://hotel-booking-server-one-xi.vercel.app/jwt', { email }, { withCredentials: true });
      navigate('/');
    } catch {
      setErrorMessage('Google login failed!');
    }
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
              Welcome Back
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Sign in to your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Account
              </span>
            </h1>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-sm">
              Access your bookings, manage your stays, and explore exclusive deals.
            </p>
          </div>
          <Lottie animationData={loginAnimationData} style={{ width: '320px', height: 'auto' }} />
        </div>
        <div
          className="w-full rounded-3xl border border-white/10 backdrop-blur-xl p-8 flex flex-col gap-6 shadow-2xl shadow-black/40"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div className="lg:hidden text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full">
              Welcome Back
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white">Login</h2>
          </div>

          <div className="hidden lg:block">
            <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400">Login</p>
            <h2 className="mt-1 text-2xl font-bold text-white">Sign in to continue</h2>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          <button
            type="button"
            onClick={handleGoogleLoginClick}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 text-sm font-semibold transition-all duration-200"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-600">or continue with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <form onSubmit={handleLoginForm} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Password
                </label>
                <NavLink
                  to="/forget-password"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                >
                  Forgot password?
                </NavLink>
              </div>
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
            </div>
            {errorMessage && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl">
                {errorMessage}
              </p>
            )}
            {success && (
              <p className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl">
                ✓ Login successful! Redirecting...
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold tracking-wide shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200 mt-2"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-sm text-gray-500">
            New here?{' '}
            <NavLink
              to="/register"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors duration-200"
            >
              Create an account
            </NavLink>
          </p>

        </div>
      </div>
    </section>
  );
};

export default Login;