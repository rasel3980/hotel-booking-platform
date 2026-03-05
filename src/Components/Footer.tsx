import { FaLocationDot, FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { GrMail } from "react-icons/gr";
import { IoIosTime } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-base shadow-lg shadow-indigo-500/30">
              🏠
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">RoomRover</span>
          </div>
          <p className="mt-5 text-sm text-gray-500 leading-relaxed">
            We are a leading company in the tech industry, providing innovative
            solutions that help businesses thrive. Committed to delivering
            high-quality services and cutting-edge technology to our clients.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-6">
            Contact Us
          </p>
          <div className="flex flex-col gap-4">
            {[
              { icon: <FaLocationDot size={13} />, text: "Dhaka, Bangladesh" },
              { icon: <BiSolidPhoneCall size={13} />, text: "+880 987-533-654" },
              { icon: <GrMail size={13} />, text: "rkrasel@gmail.com" },
              { icon: <IoIosTime size={13} />, text: "08 AM – 09 PM" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 group-hover:border-indigo-400/40 transition-all duration-200">
                  {item.icon}
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-200">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-6">
            Legal
          </p>
          <div className="flex flex-col gap-3 mb-10">
            {["Terms of Use", "Privacy Policy", "Cookie Policy"].map((item, i) => (
              <a
                key={i}
                href="#"
                className="text-sm text-gray-500 hover:text-indigo-400 transition-colors duration-200 w-fit"
              >
                {item}
              </a>
            ))}
          </div>

          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">
            Follow Us
          </p>
          <div className="flex gap-3">
            {[
              { href: "https://twitter.com", icon: <FaXTwitter size={15} /> },
              { href: "https://facebook.com", icon: <FaFacebookF size={15} /> },
              { href: "https://instagram.com", icon: <FaInstagram size={15} /> },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-indigo-500/20 hover:border-indigo-400/40 hover:text-indigo-300 hover:-translate-y-1 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} <span className="text-indigo-500">RoomRover</span>. All rights reserved.
        </p>
        <p className="text-xs text-gray-700">
          Crafted with <span className="text-pink-500">♥</span> in Dhaka
        </p>
      </div>

    </footer>
  );
};

export default Footer;