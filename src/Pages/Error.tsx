
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0f0f2e 50%, #0a1628 100%)" }}
    >
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center flex flex-col items-center gap-6 max-w-lg">
        <div className="relative select-none">
          <span
            className="text-[10rem] sm:text-[14rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #4338ca 100%)" }}
          >
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-32 bg-indigo-600/20 rounded-full blur-3xl" />
          </div>
        </div>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full mx-auto">
            Page Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Oops! You're lost.
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-2 flex-wrap justify-center">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 text-sm font-semibold transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            Go Back
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Take Me Home
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Error;