import { InstagramIcon, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#F4F2EF] shadow p-4 sm:p-6 xl:p-8 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:flex sm:items-center sm:justify-between">
        <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
          &copy; 2024 - 2025{" "}
          <span className="font-bold text-sarkara-sign-1">
            XYZ Coffee Bali & Tokisaki{" "}
          </span>
          . All rights reserved.
        </p>
        <div className="flex justify-center items-center space-x-2">
          <Link
            href="https://www.instagram.com/sarkaracoffee.bali/"
            className="inline-flex justify-center p-2 rounded-lg cursor-pointer text-sarkara-sign-1 hover:text-white hover:bg-sarkara-sign-1"
          >
            <InstagramIcon />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="https://www.instagram.com/sarkaracoffee.bali/"
            className="inline-flex justify-center p-2 rounded-lg cursor-pointer text-sarkara-sign-1 hover:text-white hover:bg-sarkara-sign-1"
          >
            <MapPin />
            <span className="sr-only">Google Maps</span>
          </Link>
          <Link
            href="https://www.instagram.com/sarkaracoffee.bali/"
            className="inline-flex justify-center p-2 rounded-lg cursor-pointer text-sarkara-sign-1 hover:text-white hover:bg-sarkara-sign-1"
          >
            <Mail />
            <span className="sr-only">Email</span>
          </Link>
          <Link
            href="https://www.instagram.com/sarkaracoffee.bali/"
            className="inline-flex justify-center p-2 rounded-lg cursor-pointer text-sarkara-sign-1 hover:text-white hover:bg-sarkara-sign-1"
          >
            <Phone />
            <span className="sr-only">Whatsapp</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
