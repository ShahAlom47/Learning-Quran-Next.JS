import Link from "next/link";
import { getUserCollection } from "../lib/database/db_collections";


const Navbar = async() => {
 
   
 
    return (
        <div className=" flex   gap-4  py-3   border-b-2 border-black mb-4  ">

            <Link href={'/'} className=" hover:underline" >Home </Link>
            <Link href={'/books'} className=" hover:underline" >Books </Link>

            
        </div>
    );
};

export default Navbar;