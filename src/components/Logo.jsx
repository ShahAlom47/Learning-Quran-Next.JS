import React from "react";
import img from "../../public/image/academyLogo.png"
import Image from "next/image";

const Logo = ({className}) => {
;
  return (
    <>

    <Image className={className} src={img} alt=" logo"></Image>
    </>
  );
};

export default Logo;
