"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic"; 


const Drawer = dynamic(() => import("react-modern-drawer"), { ssr: false }); // Disable SSR
import "react-modern-drawer/dist/index.css";
import Logo from "./Logo";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { data } from "autoprefixer";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Courses", href: "/courses" },
  { name: "Pricing", href: "/pricing" },
  { name: "Apply Now", href: "/apply" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
 const session = useSession()
  const toggleDrawer = () => setIsOpen(!isOpen);

  console.log(data);

  return (
    <nav className="bg-black bg-opacity-70 text-white shadow-md">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-gray-700">
        <div className="text-sm">
          <span className="mr-4">📞 +880 1320 755180</span>
          <span className=" lg:block md:block hidden">📧 info@learningquranonlineacademy.com</span>
        </div>
        <div className="flex items-center space-x-4">

         
          <Link href="/register" className="hover:underline"><FaFacebook></FaFacebook></Link>
          <Link href="/register" className="hover:underline"><FaWhatsapp></FaWhatsapp></Link>
          <Link href="/register" className="hover:underline">Register</Link>
          <Link href="/login" className="hover:underline">Login</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/"> 
          <Logo className={`w-24`}></Logo>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-orange-400">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleDrawer}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className=""
      >
        <div className=" bg-black bg-opacity-70 flex flex-col space-y-4 text-lg min-h-screen py-6 px-3">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={toggleDrawer} className="hover:text-orange-400">
              {link.name}
            </Link>
          ))}
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
