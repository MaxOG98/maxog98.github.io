import { useState } from "react";

export default function Navbar() {
  const [toggled, setToggled] = useState<boolean>(false);

  return (
    <nav className="flex items-center justify-center bg-notexactlyblack px-8">
      {/* <img src="/logonmm.svg" height={48} width={48} /> */}
      <div className="my-8 flex flex-col items-center">
        <h1 className="text-4xl xl:text-6xl">nina madison</h1>
        <p className="mt-2 font-medium">Composer for Films and Videogames</p>
      </div>
      {/* <div className="flex h-6 w-6 cursor-pointer flex-col items-center justify-center space-y-1">
        <span className="block h-1 w-6 rounded-lg bg-white"></span>
        <span className="block h-1 w-6 rounded-lg bg-white"></span>
        <span className="block h-1 w-6 rounded-lg bg-white"></span>
      </div> */}
    </nav>
  );
}
