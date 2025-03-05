import Link from "next/link";

const layout = ({ children }) => {
    return (
      <div className=" grid grid-cols-12 min-h-screen w-full ">
        <div className=" col-span-2 bg-gray-300 flex flex-col gap-3 p-4">

            <Link href={'/dashboard/moderator/allUserM'} className=" w-full px-4 py-2 bg-slate-400 hover:scale-95 text-xl font-semibold rounded-sm transition-all duration-300">All User</Link>
            <Link href={'/dashboard/moderator/allStudentsM'} className=" w-full px-4 py-2 bg-slate-400 hover:scale-95 text-xl font-semibold rounded-sm transition-all duration-300">All Students</Link>
            <Link href={'/dashboard/moderator'} className=" w-full px-4 py-2 bg-slate-400 hover:scale-95 text-xl font-semibold rounded-sm transition-all duration-300">All Teacher</Link>
            <Link href={'/dashboard/moderator/viewUser/LQ20256100'} className=" w-full px-4 py-2 bg-slate-400 hover:scale-95 text-xl font-semibold rounded-sm transition-all duration-300">View</Link>



        </div>
        <div className=" col-span-10 bg-gray-200"> {children}</div>
      </div>
    );
  };
  
  export default layout;
  