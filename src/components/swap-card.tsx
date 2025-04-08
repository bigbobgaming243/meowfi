import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Settings, ArrowDown, RefreshCw, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TokenSelect, Token } from "@/components/token-select";
import { useWallet } from "@/hooks/use-wallet";
import { formatCurrency } from "@/lib/formatters";
import { MEMECOIN_TOKEN } from "@/services/wallet";
import { toast } from "sonner";

const SLIPPAGE_OPTIONS = [0.1, 0.5, 1.0, 5.0];

export function SwapCard() {
  const { 
    isConnected, 
    connectWallet, 
    balance, 
    swapETHForTokens, 
    refreshBalance,
    getTokenBalance
  } = useWallet();
  
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [slippage, setSlippage] = useState<number>(0.5);
  const [customSlippage, setCustomSlippage] = useState<string>("");
  const [showSlippageSettings, setShowSlippageSettings] = useState<boolean>(false);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  
  const [fromToken, setFromToken] = useState<Token>({
    symbol: "ETH",
    name: "Ethereum",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  });
  
  const [toToken, setToToken] = useState<Token>({
    symbol: MEMECOIN_TOKEN.symbol,
    name: MEMECOIN_TOKEN.name,
    address: MEMECOIN_TOKEN.address,
    logo: '/images/small-cat.webp', 
  });
  
  const tokens: Token[] = [
    {
      symbol: "ETH",
      name: "Ethereum",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
    {
      symbol: MEMECOIN_TOKEN.symbol,
      name: MEMECOIN_TOKEN.name,
      address: MEMECOIN_TOKEN.address,
      logo: '/images/small-cat.webp',
    }
  ];
  
  useEffect(() => {
    if (isConnected) {
      const updateTokenBalance = async () => {
        const balance = await getTokenBalance(MEMECOIN_TOKEN.address);
        setTokenBalance(balance);
      };
      
      updateTokenBalance();
    }
  }, [isConnected, getTokenBalance]);
  
  useEffect(() => {
    if (isConnected && balance) {
      setFromToken(prev => ({
        ...prev,
        balance: formatCurrency(balance || "0", 6)
      }));
      
      setToToken(prev => ({
        ...prev,
        balance: tokenBalance
      }));
    }
  }, [isConnected, balance, tokenBalance]);

  useEffect(() => {
    if (fromAmount) {
      const rate = 1000;
      const calculatedToAmount = parseFloat(fromAmount) * rate;
      setToAmount(isNaN(calculatedToAmount) ? "" : calculatedToAmount.toString());
    } else {
      setToAmount("");
    }
  }, [fromAmount]);

  const handleMaxClick = useCallback(() => {
    if (balance) {
      const maxAmount = Math.max(parseFloat(balance) - 0.01, 0);
      setFromAmount(maxAmount.toString());
    }
  }, [balance]);

  const handleSwap = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }

    console.log("Attempting swap with amount:", fromAmount, "slippage:", slippage);

    
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (parseFloat(fromAmount) > parseFloat(balance || "0")) {
      toast.error("Insufficient balance");
      return;
    }
    
    try {
      setIsSwapping(true);
      const success = await swapETHForTokens(fromAmount, slippage);
      
      if (success) {
        setFromAmount("");
        setToAmount("");
        
        refreshBalance();
        const newTokenBalance = await getTokenBalance(MEMECOIN_TOKEN.address);
        setTokenBalance(newTokenBalance);
      }
    } catch (error) {
      console.error("Swap error:", error);
      toast.error("Swap failed. Please try again.");
    } finally {
      setIsSwapping(false);
    }
  };

  const switchTokens = () => {
    toast.info("Only ETH to MEME swaps are supported in this demo");
  };

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);
    }
  };

  const handleCustomSlippageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCustomSlippage(value);
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > 0 && numValue <= 100) {
        setSlippage(numValue);
      }
    }
  };

  const displayToAmount = toAmount ? formatCurrency(toAmount, 2) : "0.00";
  
  return (
    <div className="glass-card w-full max-w-md p-5 glass-effect glass-shine">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">Swap</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setShowSlippageSettings(!showSlippageSettings)}
        >
          <Settings size={18} />
        </Button>
      </div>
      
      {showSlippageSettings && (
        <div className="mb-5 p-3 bg-secondary/30 rounded-xl border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Slippage Tolerance</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={14} className="text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">
                      Your transaction will revert if the price changes unfavorably by more than this percentage.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-sm font-semibold text-primary-500">{slippage}%</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {SLIPPAGE_OPTIONS.map((value) => (
              <Button
                key={value}
                variant={slippage === value ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSlippage(value);
                  setCustomSlippage("");
                }}
                className={`h-8 px-3 rounded-lg ${
                  slippage === value 
                    ? "bg-primary-500 text-primary-500-foreground" 
                    : "bg-secondary/30 hover:bg-secondary/50"
                }`}
              >
                {value}%
              </Button>
            ))}
            <div className="relative min-w-[80px]">
              <Input
                className="h-8 px-3 pr-6 rounded-lg bg-secondary/30"
                value={customSlippage}
                onChange={handleCustomSlippageChange}
                placeholder="Custom"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                %
              </span>
            </div>
          </div>
          
          <Slider
            defaultValue={[slippage]}
            max={10}
            step={0.1}
            value={[slippage]}
            onValueChange={([value]) => {
              setSlippage(value);
              setCustomSlippage(value.toString());
            }}
          />
        </div>
      )}
      
      <div className="rounded-xl mb-2 bg-secondary/30 p-4 border border-border/50">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-muted-foreground">From</span>
          {isConnected && (
            <div className="flex items-center gap-1 text-sm">
              <span className="text-muted-foreground">Balance: </span>
              <button 
                className="text-primary-500 font-medium hover:underline"
                onClick={handleMaxClick}
              >
                {formatCurrency(balance || "0")} {fromToken.symbol}
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <Input
            className="token-input bg-transparent"
            placeholder="0.0"
            value={fromAmount}
            onChange={handleFromAmountChange}
          />
          
          <TokenSelect
            tokens={tokens}
            selectedToken={fromToken}
            onSelectToken={setFromToken}
            disabled={true}
          />
        </div>
      </div>
      
      <div className="flex justify-center -my-3 relative z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-background border-2 shadow-md hover:bg-secondary/80 text-muted-foreground"
          onClick={switchTokens}
        >
          <ArrowDown size={18} />
        </Button>
      </div>
      
      <div className="rounded-xl mt-2 mb-5 bg-secondary/30 p-4 border border-border/50">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-muted-foreground">To</span>
          {isConnected && (
            <div className="flex items-center gap-1 text-sm">
              <span className="text-muted-foreground">Balance: </span>
              <span className="font-medium">
                {formatCurrency(tokenBalance)} {toToken.symbol}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="token-input text-3xl flex justify-end items-center">
            {displayToAmount}
          </div>
          
          <TokenSelect
            tokens={tokens.filter(t => t.symbol !== fromToken.symbol)}
            selectedToken={toToken}
            onSelectToken={setToToken}
            disabled={true}
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center p-2 mb-5 rounded-lg bg-background/30">
        <span className="text-sm text-muted-foreground">Price</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">1 ETH = 1,000 {MEMECOIN_TOKEN.symbol}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full hover:bg-secondary/50"
            onClick={() => toast.info("Price refreshed")}
          >
            <RefreshCw size={12} />
          </Button>
        </div>
      </div>
      
      <Button
        className="w-full h-14 text-base font-semibold rounded-xl transition-all
                  bg-primary-500 hover:bg-primary-500/90 text-white shadow-lg
                  hover:shadow-primary-500/20 hover:shadow-lg"
        disabled={isSwapping || (!isConnected && !window.ethereum)}
        onClick={handleSwap}
      >
        {!window.ethereum
          ? "MetaMask not installed"
          : !isConnected
            ? "Connect Wallet"
            : isSwapping
              ? "Swapping..."
              : !fromAmount || parseFloat(fromAmount) <= 0
                ? "Enter amount"
                : parseFloat(fromAmount) > parseFloat(balance || "0")
                  ? "Insufficient balance"
                  : "Swap"}
      </Button>
    </div>
  );
}
