import Logo from "./Logo";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaSkype,
  FaWhatsapp,
  FaVoicemail,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className=" flex justify-center items-center mb-10">
        <Logo className="mx-auto w-28" />
      </div>
      <div className="max-w mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
        {/* Quick Contact */}
        <div className=" ">
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-orange-500 w-fit text-wrap">
            QUICK CONTACT
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaWhatsapp /> +880 1320 755180
            </li>
            <li className="flex items-center gap-2 text-xs">
              <FaVoicemail /> info@learningquranonlineacademy.com
            </li>
            <li className="flex items-center gap-2">
              <FaSkype /> Skype
            </li>
            <li className="flex items-center gap-2">
              <FaPhone /> Contact
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-orange-500 w-fit">
            USEFUL LINKS
          </h3>
          <ul className="space-y-2">
            <li>About us</li>
            <li>Pricing</li>
            <li>Privacy Policy</li>
            <li>Books</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-orange-500 w-fit">
            COURSES
          </h3>
          <ul className="space-y-2">
            <li>ARABIC FOR BEGINNERS (NOORANI QAIDA)</li>
            <li>Learn Tajweed online</li>
            <li>Reading the Holy Quran</li>
            <li>Juz 30</li>
            <li>TARJUMA (TRANSLATION) QURAN</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-orange-500 w-fit">
            SOCIAL LINKS
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaFacebook /> Facebook
            </li>
            <li className="flex items-center gap-2">
              <FaLinkedin /> LinkedIn
            </li>
            <li className="flex items-center gap-2">
              <FaInstagram /> Instagram
            </li>
            <li className="flex items-center gap-2">
              <FaYoutube /> Youtube
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p className="text-sm mt-2">© learningquranonlineacademy.com</p>
      </div>
    </footer>
  );
};

export default Footer;
