"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";

const Drawer = dynamic(() => import("react-modern-drawer"), { ssr: false }); // Disable SSR
import "react-modern-drawer/dist/index.css";
import Logo from "./Logo";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import useUser from "../hooks/useUser";
import { signOut } from "next-auth/react";
import Image from "next/image";

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
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const { user } = useUser();
  const userPhoto = user?.photoUrl;

  const toggleDrawer = () => setIsOpen(!isOpen);
  const toggleUserMenuDrawer = () => setIsOpenUserMenu(!isOpenUserMenu);

  // console.log(user);

  return (
    <nav className="bg-black bg-opacity-70 text-white shadow-md">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-gray-700">
        <div className="text-sm">
          <span className="mr-4">📞 +880 1320 755180</span>
          <span className=" lg:block md:block hidden">
            📧 info@learningquranonlineacademy.com
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/register" className="hover:underline">
            <FaFacebook></FaFacebook>
          </Link>
          <Link href="/register" className="hover:underline">
            <FaWhatsapp></FaWhatsapp>
          </Link>

          {user ? (
            <button onClick={() => signOut()}>Logout</button>
          ) : (
            <>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-6 py-3 relative">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">
            <Logo className={`w-24`}></Logo>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-orange-400"
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <button
              onClick={toggleUserMenuDrawer}
              className=" rounded-full h-12 w-12 border"
            >
              <img src={userPhoto}  alt=" user Photo"></img>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex  items-center gap-4 ">
          {user && (
            <button
              onClick={toggleUserMenuDrawer}
              className=" rounded-full h-12 w-12 border"
            >
              <img src={userPhoto} alt=" user Photo"></img>
            </button>
          )}
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
            <Link
              key={link.name}
              href={link.href}
              onClick={toggleDrawer}
              className="hover:text-orange-400"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </Drawer>

      {/* uSER menu drawer  */}
      <Drawer
        open={isOpenUserMenu}
        onClose={toggleUserMenuDrawer}
        direction="right"
    
        className="flex flex-col max-h-screen overflow-y-auto"
      >
        <div className=" bg-black bg-opacity-70 flex flex-col space-y-4 text-lg h-full py-6 px-3">
          <h1 className=" text-xl  font-bold border-b-2 ">{user?.name}</h1>

          <Link
            key={"useProfile"}
            href={"/dashboard/admin"}
            onClick={toggleUserMenuDrawer}
            className="hover:text-orange-400"
          >
            My Profile
          </Link>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
