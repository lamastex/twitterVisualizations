import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className=" flex flex-col items-center justify-center w-full mt-5 space-y-16 md:mt-16 md:space-y-28 xl:mt-10 2xl:mt-5">
      <div className="flex flex-row space-x-5 pt-10 ">
        <div>
          <Link to="/" className="a">
            <button className="bg-gray-800 shadow hover:bg-gray-900 text-white font-bold py-5 md:px-8 px-4 rounded">
              Graph
            </button>
          </Link>
        </div>

        <div>
          <Link to="/Tree" className="a">
            <button className="bg-gray-800 shadow hover:bg-gray-900 text-white font-bold py-5 md:px-8 px-4 rounded">
              Tree
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
