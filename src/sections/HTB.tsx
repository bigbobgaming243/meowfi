const htbDetails = [
  {
    id: 0,
    title: "Get a Wallet",
    desc: "Set up a crypto wallet like metamask or trust wallet and add funds (ETH or BNB).",
    image: "/images/wood-1.webp",
  },
  {
    id: 1,
    title: "Go to a DEX",
    desc: 'Visit Uniswap or PancakeSwap, connect your wallet, and paste the official <span class="font-bold">$MEOW</span> contract address.',
    image: "/images/wood-3.webp",
  },
  {
    id: 2,
    title: "Swap & Confirm",
    desc: 'Enter the amount, complete the swap, and enjoy your <span class="font-bold">$MEOW</span> token',
    image: "/images/wood-1.webp",
  },
];

const HTB = () => {
  return (
    <section
      id="how-to-buy"
      className="relative mt-[-25px] flex flex-col items-start htb-bg lg:pb-32 pb-10 xl:px-[73px] lg:px-10 px-5 pt-[39px] flex-1 w-full z-50 overflex-x-hidden"
    >
      <h3 className="font-Rainball text-[57px] leading-[130%] tracking-[-1%] text-White rotate-[-6.55deg] mt-4 2xl:mt-8">
        How to Buy $meow
      </h3>
      <div className=" w-full">
        <div className="relative flex flex-wrap items-row gap-2 items-end justify-center w-full">
          {htbDetails.map((item) => (
            <div
              className="relative z-20"
              style={{
                width: "clamp(252px, 28.125vw, 432px)",
                height: "clamp(479px, 53.515vw, 822px)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="flex-1 object-contain"
              />
              <div
                className="absolute top-[40%] -translate-y-[40%] left-1/2 -translate-x-1/2 flex flex-col items-center text-center"
                style={{
                  width: "clamp(213px, 23.75vw, 365px)",
                  gap: "clamp(12px, 1.5vw, 20px)",
                }}
              >
                <h4
                  className="font-Inter font-bold text-[#030202]"
                  style={{
                    fontSize: "clamp(20px, 2.19vw, 34px)",
                    lineHeight: "clamp(22px, 2.43vw, 38px)",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  className="font-Inter font-normal text-black"
                  style={{
                    fontSize: "clamp(15px, 1.8vw, 26px)",
                    lineHeight: "clamp(17px, 2vw, 29px)",
                  }}
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                />
              </div>
            </div>
          ))}
        </div>
        <img
          src="/images/htb-bottom.png"
          alt="htb-bottom"
          className="flex lg:visible invisible relative bottom-[20%] -translate-y-[20%] left-1/2 -translate-x-1/2 w-[981px] h-[135px] z-[1] object-contain"
        />
      </div>
    </section>
  );
};

export default HTB;
