import React from 'react';
import { Link } from 'react-router-dom';

interface SlideProps {
  image: string;
  text: string;
}

const Slide: React.FC<SlideProps> = ({ image, text }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=DM+Sans:wght@400;600&display=swap');

        @keyframes slide-zoom {
          from { transform: scale(1.08); }
          to   { transform: scale(1.0); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .anim-zoom    { animation: slide-zoom 8s ease-out forwards; }
        .anim-fade-1  { animation: fade-up 0.8s ease 0.3s forwards; }
        .anim-fade-2  { animation: fade-up 0.8s ease 0.5s forwards; }
        .anim-fade-3  { animation: fade-up 0.8s ease 0.7s forwards; }
        .anim-fade-4  { animation: fade-up 0.8s ease 0.9s forwards; }

        .slide-title  { font-size: clamp(2rem, 5vw, 3.8rem); font-family: 'Cormorant Garamond', serif; }
        .slide-tag    { font-family: 'DM Sans', sans-serif; }
        .slide-btn    { font-family: 'DM Sans', sans-serif; }

        .slide-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: -1;
        }
        .slide-btn:hover::before { transform: translateX(0); }
        .slide-btn:hover .arrow  { transform: translateX(4px); }
      `}</style>

      <div className="relative w-full h-[38rem] overflow-hidden">

        <div
          className="anim-zoom absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,10,20,0.85)] via-[rgba(5,10,20,0.45)] to-[rgba(5,10,20,0.25)]" />

        <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-amber-400 opacity-40" />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-amber-400 opacity-40" />

        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 px-6 text-center">

          <p className="anim-fade-1 slide-tag opacity-0 text-amber-400 text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">
            ✦ Premium Experience
          </p>

          <h1 className="anim-fade-2 slide-title opacity-0 font-bold text-white leading-tight mb-2">
            {text}
          </h1>

          <div className="anim-fade-3 opacity-0 w-12 h-[2px] bg-gradient-to-r from-amber-400 to-amber-200 my-5 rounded-full" />

          <Link
            to="/rooms"
            className="anim-fade-4 slide-btn opacity-0 relative overflow-hidden inline-flex items-center gap-2.5 px-8 py-3.5 border border-amber-400/60 text-amber-300 text-xs font-semibold tracking-[0.15em] uppercase rounded-sm transition-all duration-300 hover:text-[#0a1428] hover:border-amber-400 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(251,191,36,0.25)]"
          >
            Explore Rooms
            <span className="arrow transition-transform duration-300">→</span>
          </Link>

        </div>
      </div>
    </>
  );
};

export default Slide;