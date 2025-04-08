import { useState, useEffect, useCallback } from "react";
import { getWalletService, WalletState } from "@/services/wallet";

export function useWallet() {
  const walletService = getWalletService();
  const [walletState, setWalletState] = useState<WalletState>(walletService.state);
  
  useEffect(() => {
    // Subscribe to wallet state changes
    const unsubscribe = walletService.subscribe(() => {
      setWalletState({ ...walletService.state });
    });
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  const connectWallet = useCallback(() => {
    return walletService.connectWallet();
  }, []);
  
  const disconnectWallet = useCallback(() => {
    walletService.disconnectWallet(); // Disconnect the wallet
    localStorage.removeItem("connectedWallet"); // Clear from localStorage
    
    setWalletState((prevState) => ({
      ...prevState,
      address: null,
      isConnected: false,
      balance: "0", // Reset balance
      chainId: null, // Reset chain ID
      isConnecting: false, // Ensure not in a connecting state
      provider: null, // Remove provider reference
    }));
  }, []);
  
  
  const switchToSepolia = useCallback(() => {
    return walletService.switchToSepolia();
  }, []);
  
  const swapETHForTokens = useCallback((amount: string, slippage?: number) => {
    return walletService.swapETHForTokens(amount, slippage);
  }, []);
  
  const refreshBalance = useCallback(() => {
    return walletService.refreshBalance();
  }, []);
  
  const getTokenBalance = useCallback((tokenAddress: string) => {
    return walletService.getTokenBalance(tokenAddress);
  }, []);
  
  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    switchToSepolia,
    swapETHForTokens,
    refreshBalance,
    getTokenBalance,
  };
}
