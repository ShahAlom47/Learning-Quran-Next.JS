"use client";

import Link from "next/link";
import { useState } from "react";
// import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { Menu } from "lucide-react";
import NavProfile from "./NavProfile";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    // <nav className="flex items-center justify-between px-6 py-3 border-b-2 bg-black bg-opacity-60">
    //   {/* Logo */}
    //   <div>
    //     <Link href="/" className="text-white text-lg font-bold">MySite</Link>
    //   </div>

    //   {/* Desktop Menu */}
    //   <div className="hidden md:flex gap-6 text-white">
    //     <Link href="/" className="hover:underline">Home</Link>
    //     <Link href="/books" className="hover:underline">Books</Link>
    //     <Link href="/file_upload" className="hover:underline">File Upload</Link>
    //     <Link href="/register" className="hover:underline">Register</Link>
    //     <Link href="/login" className="hover:underline">Login</Link>
    //     <NavProfile />
    //   </div>

    //   {/* Mobile Menu Button */}
    //   <Sheet open={open} onOpenChange={setOpen}>
    //     <SheetTrigger asChild>
    //       <Button variant="ghost" size="icon" className="md:hidden text-white">
    //         <Menu size={24} />
    //       </Button>
    //     </SheetTrigger>
    //     <SheetContent side="left" className="bg-black text-white">
    //       <div className="flex flex-col gap-4 text-lg mt-6">
    //         <Link href="/" onClick={() => setOpen(false)}>Home</Link>
    //         <Link href="/books" onClick={() => setOpen(false)}>Books</Link>
    //         <Link href="/file_upload" onClick={() => setOpen(false)}>File Upload</Link>
    //         <Link href="/register" onClick={() => setOpen(false)}>Register</Link>
    //         <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
    //         <NavProfile />
    //       </div>
    //     </SheetContent>
    //   </Sheet>
    // </nav>
    <div>
       <Button> shadow ui</Button>
    </div>
  );
};

export default Navbar;
