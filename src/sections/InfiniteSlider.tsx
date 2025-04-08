import { Fragment } from "react";
import { motion } from "motion/react";

const Meowfi = () => {
  return (
    <div className="flex items-end gap-2">
      <img src="/images/small-cat.webp" className="w-[37px] h-8" />
      <p className="font-Rainball text-[24px] text-white h-6">Meowfi</p>
    </div>
  );
};

export default function InfiniteSlider() {
  return (
    <section className="w-full bg-primary text-white overflow-x-hidden py-6">
      <div className="w-full mx-auto">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex flex-none gap-20 pr-20"
            animate={{
              x: "-50%", // Move left by 50% of the container width
            }}
            transition={{
              duration: 10, // Adjust duration for speed
              ease: "linear",
              repeat: Infinity, // Infinite loop
            }}
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <Fragment key={i}>
                {Array.from({ length: 7 }).map((_, j) => (
                  <span key={`${i}-${j}`} className="mx-4">
                    <Meowfi />
                  </span>
                ))}
              </Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
