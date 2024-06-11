import { useState } from "react";

export default function Navbar() {
  const [toggled, setToggled] = useState<boolean>(false);

  return (
    <nav className="flex items-center justify-between bg-slate-800 px-8">
      <img src="/logonmm.svg" height={48} width={48} />
      <div className="my-8 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl xl:text-5xl">
          <span className="text-accent">n</span>ina{" "}
          <span className="text-accent">m</span>adison{" "}
          <span className="text-accent">m</span>usic
        </h1>
        <p className="mt-2">Composer for Films and Videogames</p>
      </div>
      <div className="flex h-6 w-6 cursor-pointer flex-col items-center justify-center space-y-1">
        <span className="block h-1 w-6 rounded-lg bg-white"></span>
        <span className="block h-1 w-6 rounded-lg bg-white"></span>
        <span className="block h-1 w-6 rounded-lg bg-white"></span>
      </div>
    </nav>
  );
}
