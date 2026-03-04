import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LuLogOut, LuMenu, LuX } from "react-icons/lu";
import { authContext } from "../AuthProvider/AuthProvider";
import { Typewriter } from "react-simple-typewriter";

const navClass = ({ isActive }: { isActive: boolean }): string =>
  isActive
    ? "text-amber-300 font-semibold tracking-widest text-xs uppercase border-b-2 border-amber-300 pb-[2px]"
    : "text-white/70 hover:text-white font-semibold tracking-widest text-xs uppercase border-b-2 border-transparent pb-[2px] transition-colors duration-200 hover:border-amber-300/50";

const Header: React.FC = () => {
  const auth = useContext(authContext);
  if (!auth) throw new Error("Header must be used within AuthProvider");

  const { handleLogout, user } = auth;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const authLinks = (
    <>
      <NavLink to="/" className={navClass} onClick={closeMenu}>Home</NavLink>
      <NavLink to="/login" className={navClass} onClick={closeMenu}>Login</NavLink>
      <NavLink to="/register" className={navClass} onClick={closeMenu}>Register</NavLink>
    </>
  );

  const userLinks = (
    <>
      <NavLink to="/" className={navClass} onClick={closeMenu}>Home</NavLink>
      <NavLink to="/rooms" className={navClass} onClick={closeMenu}>Rooms</NavLink>
      <NavLink to="/my-booking-room" className={navClass} onClick={closeMenu}>My Bookings</NavLink>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600&display=swap');

        .hdr { font-family: 'DM Sans', sans-serif; }
        .hdr-logo { font-family: 'Cormorant Garamond', serif; }

        .hdr-bar {
          background: ${scrolled
            ? "rgba(8, 20, 40, 0.96)"
            : "linear-gradient(180deg, rgba(8,20,40,0.80) 0%, rgba(8,20,40,0.60) 100%)"};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid ${scrolled ? "rgba(251,191,36,0.12)" : "transparent"};
          box-shadow: ${scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none"};
          transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .hdr-mobile {
          background: rgba(8, 20, 40, 0.98);
          backdrop-filter: blur(24px);
          border-top: 1px solid rgba(251,191,36,0.08);
        }

        .hdr-avatar {
          background: linear-gradient(135deg, #f59e0b 0%, #fcd34d 100%);
          padding: 2px;
          border-radius: 9999px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hdr-avatar:hover {
          transform: scale(1.08);
          box-shadow: 0 0 0 3px rgba(251,191,36,0.25);
        }

        .hdr-logout {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: rgba(220,38,38,0.15);
          border: 1px solid rgba(220,38,38,0.3);
          color: #fca5a5;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .hdr-logout:hover {
          background: rgba(220,38,38,0.3);
          border-color: rgba(220,38,38,0.5);
          color: #fff;
          transform: scale(1.03);
        }

        .hdr-signin {
          padding: 8px 18px;
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          color: #0a1428;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        .hdr-signin:hover {
          background: linear-gradient(135deg, #fbbf24, #fcd34d);
          transform: scale(1.05);
          box-shadow: 0 4px 14px rgba(251,191,36,0.35);
        }

        .hdr-hamburger {
          padding: 6px;
          color: rgba(255,255,255,0.8);
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: transparent;
        }
        .hdr-hamburger:hover {
          color: #fff;
          background: rgba(255,255,255,0.08);
        }

        .hdr-mobile-nav {
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1), padding 0.35s ease;
        }
        .hdr-mobile-nav.open { max-height: 280px; padding: 20px 0 24px; }
        .hdr-mobile-nav.closed { max-height: 0; padding: 0; }

        .logo-divider {
          width: 4px;
          height: 4px;
          background: #f59e0b;
          border-radius: 50%;
          display: inline-block;
          margin: 0 2px 3px;
          vertical-align: middle;
        }
      `}</style>

      <header className="hdr sticky top-0 z-50 w-full hdr-bar">
        <div className="w-11/12 mx-auto px-1 py-3 flex items-center justify-between">
          <NavLink to="/" className="hdr-logo text-white text-2xl md:text-3xl font-bold flex items-center leading-none" style={{ minWidth: '185px' }}>
            <span className="text-amber-400">Room</span>
            <span className="logo-divider mx-1" />
            <span className="text-white" style={{ display: 'inline-block', minWidth: '90px' }}>
              <Typewriter
                words={["Rover"]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={3000}
              />
            </span>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-8">
            {user ? userLinks : authLinks}
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <NavLink to="/profile" className="hdr-avatar block">
                  <img
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover block"
                    src={user.photoURL ?? "https://via.placeholder.com/150"}
                    alt="profile"
                  />
                </NavLink>
                <button onClick={handleLogout} className="hdr-logout" title="Logout">
                  <LuLogOut size={13} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <NavLink to="/login" className="hdr-signin hidden lg:block">
                Sign In
              </NavLink>
            )}
            <button
              className="hdr-hamburger lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <LuX size={22} /> : <LuMenu size={22} />}
            </button>
          </div>
        </div>
        <div className={`hdr-mobile hdr-mobile-nav ${menuOpen ? "open" : "closed"}`}>
          <nav className="flex flex-col items-center gap-6">
            {user ? userLinks : authLinks}
            {!user && (
              <NavLink to="/login" className="hdr-signin mt-1" onClick={closeMenu}>
                Sign In
              </NavLink>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;