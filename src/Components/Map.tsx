import React, { useState } from 'react';
import { Map, Marker } from "pigeon-maps";

const hotelCoordinates: [number, number] = [51.5074, -0.1278];
const hotelAddress = "Landon Top 1 Hotel, 123 King Street, London, UK";

const MapHome: React.FC = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const toggleInfo = (): void => setShowInfo(!showInfo);

  return (
    <section className="bg-gray-950 py-24 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full">
            Find Us
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white tracking-tight">
            Our <span className="text-indigo-400">Location</span>
          </h2>
          <p className="mt-3 text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            {hotelAddress}
          </p>
        </div>
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/40">
          <Map height={420} defaultCenter={hotelCoordinates} defaultZoom={14}>
            <Marker
              width={50}
              anchor={hotelCoordinates}
              onClick={toggleInfo}
            />
          </Map>
          {showInfo && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 border border-indigo-500/30 rounded-xl px-6 py-4 shadow-lg shadow-black/40 text-center min-w-[260px] z-10">
              <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-1">
                Hotel Address
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent mb-3" />
              <p className="text-sm text-gray-300 leading-relaxed">{hotelAddress}</p>
              <button
                onClick={toggleInfo}
                className="mt-3 text-xs text-gray-600 hover:text-gray-400 transition-colors duration-200"
              >
                ✕ Close
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href={`https://www.google.com/maps?q=${hotelCoordinates[0]},${hotelCoordinates[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold tracking-wide shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            Open in Google Maps
          </a>
          <button
            onClick={toggleInfo}
            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-300 text-sm font-semibold tracking-wide hover:-translate-y-0.5 transition-all duration-200"
          >
            View Address
          </button>
        </div>

      </div>
    </section>
  );
};

export default MapHome;