import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
const Landing = () => {
  const [toggle, setToggle] = useState(true);
  const toggleForm = () => {
    setToggle(!toggle);
  };
  return (
    <div className="relative bg-[#03103a] w-screen h-screen flex justify-around items-center ">
      <div className="absolute top-4 left-4 w-20 h-auto flex items-center gap-5">
        <img className=" " src="images/cryptocurrency.png" alt="Company Logo" />
        <p className="text-4xl text-white">CryptoBox</p>
      </div>
      {toggle ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <Signup toggleForm={toggleForm} />
      )}
      <div className="h-3/4 hidden md:flex">
        <img
          className="w-full h-full object-contain"
          src="images/Hero.png"
          alt="Hero"
        />
      </div>
    </div>
  );
};

export default Landing;
