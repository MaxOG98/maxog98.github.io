import { useState } from "react";

export default function Navbar() {
  const [toggled, setToggled] = useState<boolean>(false);

  return (
    <nav>
      <div className="absolute z-20 flex w-full items-center justify-between px-6 md:px-16">
        {/* <img src="/logonmm.svg" height={48} width={48} /> */}
        <a className="my-8 flex flex-col items-center" href="/">
          <h1 className="text-4xl lg:text-5xl">nina madison</h1>
          <p className="mt-2 font-medium">
            Composer for Film, TV and Videogames
          </p>
        </a>
        <ul className="hidden space-x-5 text-xl font-semibold text-white md:flex">
          <li className="transition-all ease-in-out hover:underline">
            <a href="#MusicPortfolio">Listen</a>
          </li>
          <li className="transition-all ease-in-out hover:underline">
            <a href="#Credits">Credits</a>
          </li>
          <li className="transition-all ease-in-out hover:underline">
            <a href="#UpcomingProjects">Projects</a>
          </li>
          <li className="transition-all ease-in-out hover:underline">
            <a href="#About">About</a>
          </li>
        </ul>
        <div
          className="z-50 flex h-6 w-6 cursor-pointer flex-col items-center justify-center space-y-1 md:hidden"
          onClick={() => setToggled((prevToggle) => !prevToggle)}
        >
          <span className="block h-1 w-6 rounded-lg bg-white"></span>
          <span className="block h-1 w-6 rounded-lg bg-white"></span>
          <span className="block h-1 w-6 rounded-lg bg-white"></span>
        </div>
        {toggled && (
          <div className="fixed bottom-0 left-0 z-40 flex h-screen w-full items-center justify-center bg-notexactlyblack">
            <ul className="flex flex-col gap-16 text-xl font-semibold text-white">
              <li className="transition-all ease-in-out hover:underline">
                <a href="#MusicPortfolio">Listen</a>
              </li>
              <li className="transition-all ease-in-out hover:underline">
                <a href="#Credits">Credits</a>
              </li>
              <li className="transition-all ease-in-out hover:underline">
                <a href="#UpcomingProjects">Projects</a>
              </li>
              <li className="transition-all ease-in-out hover:underline">
                <a href="#About">About</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
