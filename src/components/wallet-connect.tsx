
import React from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { shortenAddress, formatCurrency } from "@/lib/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, ExternalLink, LogOut, Wallet } from "lucide-react";
import { toast } from "sonner";

export function WalletConnect() {
  const { isConnected, isConnecting, address, balance, connectWallet, disconnectWallet } = useWallet();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard");
    }
  };

  const openEtherscan = () => {
    if (address) {
      window.open(`https://sepolia.etherscan.io/address/${address}`, "_blank");
    }
  };

  if (!isConnected) {
    return (
      <Button
        className="font-medium bg-primary-500 rounded-full transition-all"
        disabled={isConnecting}
        onClick={connectWallet}
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full flex items-center gap-2 h-10 px-4 
                     bg-secondary/50 border-secondary hover:bg-secondary/80 
                     transition-all shadow-sm hover:shadow"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="font-medium">{shortenAddress(address)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 p-2 backdrop-blur-xl bg-white/70 dark:bg-black/70 
                    border border-white/20 shadow-lg"
      >
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Connected Wallet</span>
          <span className="font-mono text-sm truncate">{address}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/40" />
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Balance</span>
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{formatCurrency(balance || "0")} ETH</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/40" />
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer hover:bg-secondary/50"
          onClick={copyAddress}
        >
          <Copy className="w-4 h-4" />
          <span>Copy Address</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer hover:bg-secondary/50"
          onClick={openEtherscan}
        >
          <ExternalLink className="w-4 h-4" />
          <span>View on Etherscan</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/40" />
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer text-red-500 hover:bg-secondary/50"
          onClick={disconnectWallet}
        >
          <LogOut className="w-4 h-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
