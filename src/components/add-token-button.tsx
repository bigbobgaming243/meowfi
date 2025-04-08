
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { MEMECOIN_TOKEN } from "@/services/wallet";

export function AddTokenButton() {
  const handleAddToken = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed");
      return;
    }
    
    try {
      // Request to add the token to MetaMask
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: MEMECOIN_TOKEN.address,
            symbol: MEMECOIN_TOKEN.symbol,
            decimals: MEMECOIN_TOKEN.decimals,
            image: window.location.origin + '/images/small-cat.webp',
          },
        },
      });

      if (wasAdded) {
        toast.success(`${MEMECOIN_TOKEN.symbol} was added to your wallet`);
      } else {
        toast.info("Token was not added");
      }
    } catch (error) {
      console.error("Error adding token to wallet:", error);
      toast.error("Failed to add token to wallet");
    }
  };

  return (
    <Button 
      onClick={handleAddToken}
      className="inline-flex items-center justify-center h-12 px-6 
                bg-secondary/50 hover:bg-secondary/70 
                rounded-xl font-medium transition-colors"
    >
      <PlusCircle className="mr-2 h-5 w-5" />
      Add MEOW to Wallet
    </Button>
  );
}
