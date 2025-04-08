import React from "react";

interface TokInfoProps {
  icon?: string;
  title: string;
  options: string[];
  bg: string;
}

const TokInfo: React.FC<TokInfoProps> = ({
  icon = "blue",
  title,
  options,
  bg,
}) => {
  return (
    <div
      className={`relative pt-[23px] pb-[11px] px-4 rounded-[15px] border border-White overflow-x-hidden md:w-auto w-full ${
        bg === "brown" ? "t-brown-bg" : "t-white-bg"
      }`}
    >
      <div className="flex items-center gap-2">
        <p
          className={`${
            bg === "brown" ? "text-white" : "text-black"
          } text-[22px] font-Veritas`}
        >
          {title}
        </p>
      </div>

      <ul className="w-[90%]">
        {options.map((opt) => (
          <li
            className={`${
              bg === "brown" ? "text-white" : "text-black"
            } md:text-[22px] text-[18px] font-Veritas`}
          >
            {opt}
          </li>
        ))}
      </ul>
      <div className="absolute right-0 top-0 w-[20%] h-full token-options-box" />
    </div>
  );
};

export default TokInfo;
