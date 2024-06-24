import { useState } from "react";

export default function Mathi() {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleMouseEnter = () => {
    setTimeout(() => {
      setIsHidden(false);

      setTimeout(() => {
        setIsHidden(true);
      }, 10000);
    }, 2000);
  };

  return (
    <div className="relative flex h-12 flex-col">
      <div className="flex h-12 items-center justify-center text-xs text-white">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => {
            setIsHidden(true);
          }}
          className="flex h-8 cursor-pointer items-center justify-center"
        >
          <p className="block cursor-pointer">@2024 by Massimiliano Oggioni</p>
        </div>
        {/* <span
          className="mr-1 block cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => {
            setIsHidden(true);
          }}
        >
          @ 2024
        </span>{" "}
        by Massimiliano Oggioni */}
      </div>
      {!isHidden && (
        <div
          className="absolute right-1/2 items-center justify-center p-1"
          id="mathi"
        >
          <div className="relative right-24 flex items-center justify-center">
            <img src="/src/images/MathiOwl.png" className="h-10 w-10" />
            <p className="ml-2 text-xs text-white">Mathi</p>
          </div>
        </div>
      )}
    </div>
  );
}
