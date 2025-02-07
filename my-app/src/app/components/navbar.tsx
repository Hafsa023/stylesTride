"use client";
import React, { useState } from "react";
import Image from "next/image";
import Nike from "@/app/assets/nike.png";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-slate-400 border-b shadow-sm">
        <nav className="flex justify-center px-4 md:px-8 py-2">
          <h1 className="flex items-center justify-center font-bold sm:flex md:hidden lg:hidden">Welcome to StyleStride..!!</h1>
          <ul className="flex items-center space-x-3 text-black text-lg font-bold sm:hidden md:flex">
            <li>
              <Link href="#">Find a Store</Link>
            </li>
            <li>
              <span className="h-[14px] w-[1px] bg-black" />
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <span className="h-[14px] w-[1px] bg-black" />
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b shadow-sm">
        <div className="flex justify-between items-center px-4 md:px-8 py-2">
          <Link href="/">
            <Image src={Nike} alt="Logo" className="w-[60px]" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-6 items-center font-medium">
            <Link href="/" className="block text-black py-1 hover:underline text-xl">
              Home
            </Link>
            <div className="text-black hover:underline text-xl">New & Featured</div>
            <div className="text-black hover:underline text-xl">Men</div>
            <a href="#" className="text-black hover:underline text-xl">
              Women
            </a>
            <div className="text-black hover:underline text-xl">Kids</div>
            <div className="text-black hover:underline text-xl">SNKRS</div>
          </nav>

          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-3 py-1">
              <CiSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm flex-grow pl-2"
              />
            </div>
            
            {/* User Button (Logged In / Sign In) */}
            {user ? (
              <div className="text-black hover:text-blue-600 transition duration-300 xs:hidden sm:hidden md:flex">
                <UserButton />
              </div>
            ) : (
              <Link href="/sign-in"></Link>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-black text-lg"
            onClick={handleToggle}
          >
            <GiHamburgerMenu />
          </button>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {open && (
          <div className="md:hidden flex flex-col items-center bg-gradient-to-r from-yellow-500 to-purple-600 border-t shadow-lg p-4 space-y-4 rounded-lg transition-all duration-500 ease-out transform opacity-100 z-50 max-w-xs mx-auto">
            <Link href="/" className="text-black py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
              Home
            </Link>

            <Link href="/contact" className="text-black py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
            Contact
            </Link>

            <Link href="/cart" className="text-black py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
              Cart
            </Link>

            <div className="w-full h-[1px] bg-gray-300" />

            {/* Authentication or User Button */}
            <div className="flex items-center justify-center space-x-4 w-full">
              {user ? (
                <div className="w-full text-center hover:text-blue-600 transition duration-300">
                  <UserButton />
                </div>
              ) : (
                <Link href="/sign-in" className="w-full text-center py-3 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile View Search Bar (Hidden on Desktop) */}
      <div className="md:hidden flex items-center space-x-4 p-4">
        <div className="flex items-center bg-slate-100 rounded-full px-3 py-1 w-full">
          <CiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm flex-grow pl-2"
          />
        </div>
      </div>
    </div>
  );
}
