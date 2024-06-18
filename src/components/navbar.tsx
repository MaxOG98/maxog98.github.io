import { useState } from "react";

export default function Navbar() {
  const [toggled, setToggled] = useState<boolean>(false);

  return (
    <nav className="absolute flex w-full items-center justify-between px-16">
      {/* <img src="/logonmm.svg" height={48} width={48} /> */}
      <a className="my-8 flex flex-col items-center" href="/">
        <h1>nina madison</h1>
        <p className="mt-2 font-medium">Composer for Film, TV and Videogames</p>
      </a>
      <ul className="hidden space-x-4 text-xl font-semibold text-white md:flex">
        <li className="transition-all ease-in-out hover:underline">
          <a href="#Credits">Credits</a>
        </li>
        <li className="transition-all ease-in-out hover:underline">
          <a href="#UpcomingProjects">Projects</a>
        </li>
        <li className="transition-all ease-in-out hover:underline">
          <a href="#MusicPortfolio">Listen</a>
        </li>
        <li className="transition-all ease-in-out hover:underline">
          <a href="#About">About</a>
        </li>
      </ul>
      {/* <div className="flex h-6 w-6 cursor-pointer flex-col items-center justify-center space-y-1">
        <span className="block h-1 w-6 rounded-lg bg-white"></span>
        <span className="block h-1 w-6 rounded-lg bg-white"></span>
        <span className="block h-1 w-6 rounded-lg bg-white"></span>
      </div> */}
    </nav>
  );
}
