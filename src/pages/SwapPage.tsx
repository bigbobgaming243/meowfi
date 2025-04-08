import { Swap } from "@/sections/Swap";
import { useWallet } from "@/hooks/use-wallet";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

const SwapPage = () => {
  const { address, isConnected, connectWallet, disconnectWallet } = useWallet();

  const handleDisconnect = () => {
    disconnectWallet();
    localStorage.removeItem("connectedWallet");
  };

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };
  return (
    <main className="flex flex-col items-center justify-center w-full bg-white lg:py-0 py-6 min-h-screen">
      <nav className="flex items-center justify-end w-full px-10">
        <Button
          onClick={isConnected ? handleDisconnect : connectWallet}
          className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-4 py-2 flex items-center gap-2 w-[152.42px]"
          variant="default"
        >
          <Wallet className="h-5 w-5" />
          {isConnected ? formatAddress(address || "") : "Connect Wallet"}
        </Button>
      </nav>
      <Swap />
    </main>
  );
};

export default SwapPage;
