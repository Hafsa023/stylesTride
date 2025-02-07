import Image from "next/image";

import React from "react";
import Img from "@/app/assets/Image.png";

export default function Hero() {
  return (
    <main>
      <div className="text-center bg-gray-100 py-2">
        <h3 className="text-lg">Hello Nike App</h3>
        <span className="text-gray-600">
          Download the app to access everything Nike.
          <span className="text-black underline">Get Your Great</span>
        </span>
      </div>

      <div className="flex justify-center px-10">
        <Image className="w-full h-auto6" src={Img} alt="shoes banner" />
      </div>

      <div className="text-center text-black mt-16">
        <h5 className="font-semibold  text-base lg:text-xl">First Look</h5>
        <br />
      
      </div>
    </main>
  );
}
