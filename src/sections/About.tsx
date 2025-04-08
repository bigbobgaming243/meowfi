const About = () => {
  return (
    <section
      id="about"
      className="relative flex lg:flex-row flex-col lg:items-start items-center lg:justify-between lg:px-20 px-0 pt-[30px] lg:min-h-[100vh] min-h-[100vh] overflow-x-hidden w-full"
    >
      <div className="relative lg:h-[190px] z-[300] lg:mx-0 mx-auto">
        <h2
          className="font-Rainball font-normal about leading-[85.22px] tracking-[-1%]"
          style={{
            fontSize: "clamp(51.13px, 6.66vw, 93.74px)",
          }}
        >
          About Us
        </h2>
        <img
          src="/images/arrow.webp"
          className="lg:flex hidden relative bottom-0 xl:left-20 left-0"
          style={{
            width: "clamp(110px, 21.48vw, 275px)",
            height: "clamp(45.2px, 8.83vw, 113px)",
          }}
        />
      </div>
      <div className="about-box md:mb-0 mb-32 z-[50]">
        <p className="font-Veritas font-medium leading-[27px] text-[13.5px] md:text-[18px] xl:text-[23px] text-White  md:w-full w-[90%]">
          As a project, Memecat’s mission is simple: to free memes from the
          clutches of Web2 algorithms and give them back to the community.{" "}
        </p>
        <p className="font-Veritas text-[13.5px] md:text-[18px] xl:text-[23px] font-medium leading-[27px] text-White md:w-full w-[90%]">
          Unlike Web2 platforms, where memes vanish or are stolen, Memecat
          offers true ownership with mintable, tradeable NFTs, and rewards
          creators through $MEOW, our native memecoin. Every like, share, and
          laugh adds value to the decentralized meme economy.{" "}
        </p>
        <p className="font-Veritas text-[13.5px] md:text-[18px] xl:text-[23px] font-medium leading-[27px] text-White md:w-full w-[90%]">
          From Meow Battles to community governance, Memecat transforms memes
          into assets, ensuring they stay immortal on the blockchain.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full max-h-[553px] ">
        <img
          src="/images/left-cat.webp"
          className="absolute left-0 bottom-0 z-[0]"
          style={{ width: "clamp(120px, 23.36vw, 389px)", height: "auto" }}
        />
        <img
          src="/images/left-hill.webp"
          className="absolute left-0 bottom-0 z-[2]"
          style={{ width: "clamp(280px, 63.6vw, 1058px)", height: "auto" }}
        />
        <img
          src="/images/right-cat.webp"
          className="absolute right-[20%] translate-x-[-20%] bottom-0 z-[3]"
          style={{ width: "clamp(110px, 18.75vw, 289px)", height: "auto" }}
        />
        <img
          src="/images/right-hill.webp"
          className="absolute right-0 bottom-0 z-[1]"
          style={{ width: "clamp(320px, 63.3vw, 1053px)", height: "auto" }}
        />
      </div>
    </section>
  );
};

export default About;
