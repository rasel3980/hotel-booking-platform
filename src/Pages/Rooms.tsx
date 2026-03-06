import React, { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { authContext } from "../AuthProvider/AuthProvider";
import Loader from "./Loader";
import RoomsCard from "./RoomsCard";
import { Room } from "../Types/room";

type SortOrder = "" | "asc" | "dsc";

const sortOptions: { label: string; value: SortOrder; icon: string }[] = [
  { label: "Default",      value: "",    icon: "✦" },
  { label: "Low to High",  value: "asc", icon: "↑" },
  { label: "High to Low",  value: "dsc", icon: "↓" },
];

const Rooms: React.FC = () => {
  const auth = useContext(authContext);
  if (!auth) throw new Error("Rooms must be used within AuthProvider");
  const { loader } = auth;

  const [rooms, setRooms]   = useState<Room[]>([]);
  const [sort, setSort]     = useState<SortOrder>("");
  const [error, setError]   = useState<string | null>(null);
  const [open, setOpen]     = useState(false);
  const dropdownRef         = useRef<HTMLDivElement>(null);

  const activeOption = sortOptions.find((o) => o.value === sort)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const fetchRooms = async (): Promise<void> => {
      setError(null);
      try {
        const response = await axios.get<Room[]>(
          "https://hotel-booking-server-one-xi.vercel.app/room-data",
          { params: { sort } }
        );
        setRooms(response.data);
      } catch {
        setError("Failed to fetch rooms. Please try again later.");
      }
    };
    fetchRooms();
  }, [sort]);

  return (
    <section
      className="min-h-screen py-24 px-4 w-full relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0f0f2e 50%, #0a1628 100%)" }}
    >
      <Helmet><title>Rooms | Hotel Booking</title></Helmet>
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-20">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-8 bg-indigo-500" />
              <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400">
                Our Rooms
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Find Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300">
                Dream Room
              </span>
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-gray-400 text-sm leading-relaxed">
              Explore our handpicked collection of luxurious rooms. Whether you're looking for a cozy suite or a premium penthouse — your perfect stay is just a click away.
            </p>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 backdrop-blur-sm text-sm"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-gray-400">
                  <span className="text-white font-semibold">{rooms.length}</span> rooms available
                </span>
              </div>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-xl border border-white/10 backdrop-blur-md text-sm text-gray-300 hover:border-indigo-500/40 hover:text-white transition-all duration-200 min-w-[170px] justify-between"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400 font-bold">{activeOption.icon}</span>
                    <span>{activeOption.label}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {open && (
                  <div
                    className="absolute right-0 mt-2 w-full rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden z-50 shadow-2xl shadow-black/50"
                    style={{ background: "rgba(15,15,40,0.90)" }}
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => { setSort(option.value); setOpen(false); }}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition-all duration-150 ${
                          sort === option.value
                            ? "text-indigo-300 bg-indigo-500/15"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className={`font-bold ${sort === option.value ? "text-indigo-400" : "text-gray-600"}`}>
                          {option.icon}
                        </span>
                        {option.label}
                        {sort === option.value && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/20 to-transparent" />
          </div>
        </div>
        {loader && <Loader />}
        {error && (
          <div
            className="flex flex-col items-center justify-center py-24 gap-4 rounded-2xl border border-red-500/20 backdrop-blur-sm"
            style={{ background: "rgba(239,68,68,0.05)" }}
          >
            <span className="text-4xl">⚠️</span>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        {!loader && !error && rooms.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-24 gap-4 rounded-2xl border border-white/10 backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <span className="text-4xl">🛏️</span>
            <p className="text-gray-500 text-sm">No rooms available at the moment.</p>
          </div>
        )}
        {!loader && !error && rooms.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomsCard key={room._id} room={room} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Rooms;