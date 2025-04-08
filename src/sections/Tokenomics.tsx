import TokInfo from "@/components/tokenomics-info";

const TokenomicsData = [
  {
    id: 0,
    title: "🔸 50% - Community & Rewards",
    options: [
      "• Earn $MEOW through meme battles, staking, and viral engagement.",
      "• Rewards for top contributors and DAO participants.",
    ],
    bg: "brown",
  },
  {
    id: 1,
    title: "🔹 30% - Liquidity & Exchange Listings",
    options: [
      "• Ensuring smooth trading on DEXs and CEXs.",
      "• Locked liquidity for price stability.",
    ],
    bg: "white",
  },
  {
    id: 2,
    title: "🔹 20% - Development & Ecosystem Growth",
    options: [
      "• Funding new features, platform upgrades, and partnerships.",
      "• Expanding MeowFi's meme-to-earn ecosystem.",
    ],
    bg: "brown",
  },
];

const Tokenomics = () => {
  return (
    <section className="w-full flex items-center justify-center pt-4 pb-[77px] px-4 bg-[#561e05]">
      <div className="max-w-screen-2xl flex flex-col items-center justify-center">
        <h2 className="tokenomics-text font-Rainball font-normal md:tracking-[18px] tracking-[12px] text-[#030202] xl:text-[200px] lg:text-[150px] md:text-[120px] min-[401px]:text-[60px] max-[400px]:text-[40px] mb-4">
          Tokenomics
        </h2>
        <div className="flex items-center lg:flex-row flex-col xl:gap-[70px] lg:gap-[45px] gap-5">
          <img
            src="/images/chart.png"
            className="xl:w-[532px] md:w-[300px] w-[250px]"
          />
          <div className="flex flex-col items- justify-stretch gap-4 flex-1">
            {TokenomicsData.map((item) => (
              <TokInfo title={item.title} options={item.options} bg={item.bg} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
