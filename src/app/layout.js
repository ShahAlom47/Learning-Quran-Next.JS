import { Geist, Geist_Mono } from "next/font/google";
import "../style/globals.css";
import Navbar from "../components/Navbar";



export const metadata = {
  title: "Learning Quran",
  description: "Online Learning Academy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"  className=" p-4">
      <body
        className={``}
      >
        <Navbar></Navbar>

        {children}
        
      </body>
    </html>
  );
}
