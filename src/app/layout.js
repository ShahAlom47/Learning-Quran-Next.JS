import { Geist, Geist_Mono } from "next/font/google";
import "../style/globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Learning Quran",
  description: "Online Learning Academy",
};

const geist = Geist({ subsets: ["latin"] }); // Google Font ব্যবহার করা

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="p-4">
      <body className={geist.className}>
       
          <Navbar />
          {children}
      </body>
    </html>
  );
}
