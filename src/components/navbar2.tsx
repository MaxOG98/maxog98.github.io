import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const overlayVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.25,
      ease: "circOut",
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    x: -300,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      ease: "easeIn",
      duration: 0.02,
    },
  },
};

const ulVariants = {
  open: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
      ease: "easeOut",
    },
  },
  closed: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      ease: "easeOut",
      duration: 0.1,
    },
  },
};

const liVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.12, ease: "easeIn" },
  },
  closed: {
    opacity: 0,
    x: -25,
    transition: { duration: 0.1, ease: "easeOut" },
  },
};

export default function Navbar() {
  const [toggled, setToggled] = useState<boolean>(false);

  useEffect(() => {
    if (toggled) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [toggled]);

  return (
    <nav>
      <div className="absolute z-20 flex w-full items-center justify-between px-6 md:px-16">
        <a className="my-8 flex flex-col items-center" href="/">
          <h1 className="text-4xl md:text-5xl">nina madison</h1>
          <p className="mt-2 hidden font-medium md:block">
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
            <a href="#About">About</a>
          </li>
          <li className="transition-all ease-in-out hover:underline">
            <a href="#Contact">Contact</a>
          </li>
        </ul>
        <div
          className="z-50 flex h-6 w-6 cursor-pointer flex-col items-center justify-center space-y-1 md:hidden"
          onClick={() => setToggled((prevToggle) => !prevToggle)}
        >
          <motion.span
            animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
            className="block h-1 w-6 rounded-lg bg-white"
          ></motion.span>
          <motion.span
            animate={{ opacity: toggled ? 0 : 1, width: toggled ? 0 : 24 }}
            className="block h-1 w-6 rounded-lg bg-white"
          ></motion.span>

          <motion.span
            animate={{ rotateZ: toggled ? -45 : 0, y: toggled ? -8 : 0 }}
            className="block h-1 w-6 rounded-lg bg-white"
          ></motion.span>
        </div>
        <AnimatePresence>
          {toggled && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-notexactlyblack"
            >
              <motion.ul
                variants={ulVariants}
                className="flex flex-col space-y-5 text-xl font-semibold text-white"
              >
                <motion.li
                  variants={liVariants}
                  onClick={() => {
                    setToggled(false);
                  }}
                >
                  <a href="#MusicPortfolio">Listen</a>
                </motion.li>
                <motion.li
                  variants={liVariants}
                  onClick={() => {
                    setToggled(false);
                  }}
                >
                  <a href="#Credits">Credits</a>
                </motion.li>
                <motion.li
                  variants={liVariants}
                  onClick={() => {
                    setToggled(false);
                  }}
                >
                  <a href="#UpcomingProjects">Projects</a>
                </motion.li>
                <motion.li
                  variants={liVariants}
                  onClick={() => {
                    setToggled(false);
                  }}
                >
                  <a href="#About">About</a>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
