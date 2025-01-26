import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HousePlug, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className="w-full py-6 bg-[#0F3443] text-[#34E89E]"
      style={{ backgroundColor: "#0F3443", color: "#34E89E" }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center px-4 md:px-6">
        <div className="flex flex-col items-center lg:items-start gap-4">
          <Link to="/shop/home" className="flex items-center gap-3">
            <HousePlug className="h-7 w-7 text-white" />
            <span className="text-xl font-bold text-white">Fragrencia</span>
          </Link>
          <p className="text-sm text-white">Perfume for every occasion</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-4 lg:mt-0">
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <nav className="flex flex-col items-center lg:items-start gap-2">
              <Link to="/shop/privacy-policy" className="text-sm text-white hover:scale-105 transition-transform">
                Privacy Policy
              </Link>
              <Link to="/shop/terms" className="text-sm text-white hover:scale-105 transition-transform">
                Terms of Service
              </Link>
              <Link to="/shop/contact" className="text-sm text-white hover:scale-105 transition-transform">
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <h4 className="font-semibold text-white">Follow Us</h4>
            <div className="flex gap-4">
              <Link to="https://www.instagram.com" target="_blank">
                <Instagram className="h-6 w-6 text-white hover:text-[#34E89E]" />
              </Link>
              <Link to="https://www.facebook.com" target="_blank">
                <Facebook className="h-6 w-6 text-white hover:text-[#34E89E]" />
              </Link>
              <Link to="https://www.twitter.com" target="_blank">
                <Twitter className="h-6 w-6 text-white hover:text-[#34E89E]" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <h4 className="font-semibold text-white">Contact Us</h4>
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="flex items-center gap-2 text-sm text-white">
                <Phone className="h-4 w-4 text-white" />
                <span>+1 800 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <Mail className="h-4 w-4 text-white" />
                <span>support@fragrencia.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <MapPin className="h-4 w-4 text-white" />
                <span>123 Perfume Ave, Fragrance City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6 lg:mt-0">
          <p className="text-sm text-white">
            {` ${currentTime}`}
          </p>
          <p className="text-sm text-white mt-2">
            &copy; 2025 Fragrencia | Built by Aditya Aman
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
