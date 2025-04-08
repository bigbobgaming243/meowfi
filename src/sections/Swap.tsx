import { SwapCard } from "@/components/swap-card";
import { MEMECOIN_TOKEN } from "@/services/wallet";
import { AddTokenButton } from "@/components/add-token-button";

export function Swap() {
  return (
    <main id="swap" className="w-full bg-white z-[10000]">
      <div className="flex-1 flex items-center justify-center bg-white pt-24 pb-16 px-4 ">
        <div className="grid max-w-screen-xl grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-3">
                Sepolia Testnet
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Swap ETH for{" "}
                <span className="text-primary-500">
                  {MEMECOIN_TOKEN.symbol}
                </span>{" "}
                Tokens
              </h1>
              <p className="text-lg text-muted-foreground">
                Experience seamless token swapping with our intuitive interface.
                Connect your wallet and start trading on Sepolia testnet today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8">
              <a
                href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 px-6 
                          bg-secondary/50 hover:bg-secondary/70 
                          rounded-xl font-medium transition-colors"
              >
                Get Sepolia ETH
              </a>

              <a
                href="https://metamask.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 px-6 
                          bg-secondary/50 hover:bg-secondary/70 
                          rounded-xl font-medium transition-colors"
              >
                Get MetaMask
              </a>

              <AddTokenButton />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-500 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Connect your wallet</h3>
                  <p className="text-muted-foreground text-sm">
                    Click the "Connect Wallet" button to connect your MetaMask
                    wallet to the Sepolia testnet.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-500 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Enter amount</h3>
                  <p className="text-muted-foreground text-sm">
                    Input the amount of ETH you want to swap. The equivalent{" "}
                    {MEMECOIN_TOKEN.symbol} tokens will be calculated
                    automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-500 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Confirm swap</h3>
                  <p className="text-muted-foreground text-sm">
                    Review your transaction details and click "Swap" to confirm.
                    Your wallet will ask you to approve the transaction.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex lg:justify-end justify-center">
            <div className="w-full max-w-md transform hover:translate-y-[-5px] transition-transform duration-300">
              <SwapCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
