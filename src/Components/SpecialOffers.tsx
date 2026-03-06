import { useEffect, useState } from 'react';
import offerBanner from '../assets/images/special-offer.jpg';

const SpecialOffers = () => {
  const [showModal, setShowModal]= useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
      setTimeout(() => setVisible(true), 10);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => setShowModal(false), 300);
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        background: "rgba(0,0,0,0.75)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      onClick={handleCloseModal}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/60"
        style={{
          background: "rgba(15,15,40,0.96)",
          transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
          transition: "transform 0.3s ease, opacity 0.3s ease",
          opacity: visible ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={offerBanner}
            alt="Special Offer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent" />
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white backdrop-blur-sm transition-colors duration-200"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-5">
            <span className="text-xs font-semibold tracking-widest uppercase text-indigo-300 bg-gray-950/80 border border-indigo-500/30 px-3 py-1 rounded-full backdrop-blur-sm">
              Limited Time Offer
            </span>
          </div>
        </div>
        <div className="p-7 flex flex-col gap-5">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Special Offers &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Promotions
              </span>
            </h3>
            <p className="mt-2 text-sm text-gray-300 leading-relaxed">
              Don't miss out on our exclusive offers! Book your stay now and save big on your next adventure.
            </p>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          <div className="flex gap-3">
            <button
              onClick={handleCloseModal}
              className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white text-sm font-semibold transition-all duration-200"
            >
              Maybe Later
            </button>
            <a
              href="/rooms"
              className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold text-center shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-200"
            >
              Explore Rooms
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;