const layout = ({ children }) => {
  return (
    <div className=" grid grid-cols-12 min-h-screen w-full ">
      <div className=" col-span-2 bg-gray-300"></div>
      <div className=" col-span-10 bg-green-200"> {children}</div>
    </div>
  );
};

export default layout;
