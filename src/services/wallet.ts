import { ethers, JsonRpcProvider, BrowserProvider, Eip1193Provider } from "ethers";
import { toast } from "sonner";
import { MEMECOIN_CONTRACT_ADDRESS, getMemecoinContract, getTokenBalance } from "@/lib/contractHelper";
import { MEMECOIN_ABI } from "@/lib/contractHelper";

export type WalletState = {
  address: string | null;
  balance: string | null;
  chainId: number | null;
  isConnecting: boolean;
  provider: BrowserProvider | null;
  isConnected: boolean;
};

const SEPOLIA_CHAIN_ID = 11155111;
const SEPOLIA_RPC_URL = "https://sepolia.drpc.org";

// Memecoin token contract details
export const MEMECOIN_TOKEN = {
  address: MEMECOIN_CONTRACT_ADDRESS,
  symbol: "MEOW",
  decimals: 18,
  name: "Meowfi"
};

export class WalletService {
  private static instance: WalletService;
  private _state: WalletState = {
    address: null,
    balance: null,
    chainId: null,
    isConnecting: false,
    provider: null,
    isConnected: false,
  };
  private listeners: Set<() => void> = new Set();

  private constructor() {
    // Check if previously connected
    this.checkConnection();
  }

  static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  private async checkConnection() {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        
        if (accounts && accounts.length > 0) {
          this.connectWallet();
        }
      }
    } catch (error) {
      console.error("Failed to check wallet connection:", error);
    }
  }

  get state(): WalletState {
    return { ...this._state };
  }

  private setState(newState: Partial<WalletState>) {
    this._state = { ...this._state, ...newState };
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  async connectWallet() {
    if (!window.ethereum) {
      toast.error("MetaMask not found! Please install MetaMask.");
      return;
    }

    try {
      this.setState({ isConnecting: true });

      // Request accounts
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];

      // Get chain ID
      const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
      const chainId = parseInt(chainIdHex, 16);

      if (chainId !== SEPOLIA_CHAIN_ID) {
        await this.switchToSepolia();
      }

      // Create provider
      const provider = new BrowserProvider(window.ethereum as Eip1193Provider);

      // Get balance
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.formatEther(balance);

      this.setState({
        address,
        balance: formattedBalance,
        chainId,
        provider,
        isConnected: true,
        isConnecting: false,
      });

      // Add listeners for account and chain changes
      window.ethereum.on("accountsChanged", this.handleAccountsChanged.bind(this));
      window.ethereum.on("chainChanged", this.handleChainChanged.bind(this));

      toast.success("Wallet connected successfully!");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
      this.setState({ isConnecting: false });
    }
  }

  async disconnectWallet() {
    if (!this._state.isConnected) return;

    try {
      // Remove event listeners
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", this.handleAccountsChanged.bind(this));
        window.ethereum.removeListener("chainChanged", this.handleChainChanged.bind(this));
      }

      this.setState({
        address: null,
        balance: null,
        chainId: null,
        provider: null,
        isConnected: false,
      });

      toast.success("Wallet disconnected");
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      toast.error("Failed to disconnect wallet");
    }
  }

  private async handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      // User disconnected their wallet
      this.disconnectWallet();
      toast.info("Wallet disconnected");
    } else {
      // Account changed, update state
      const address = accounts[0];
      
      if (this._state.provider) {
        const balance = await this._state.provider.getBalance(address);
        this.setState({
          address,
          balance: ethers.formatEther(balance),
        });
        toast.info("Account changed");
      }
    }
  }

  private async handleChainChanged(chainIdHex: string) {
    const chainId = parseInt(chainIdHex, 16);
    
    this.setState({ chainId });
    
    if (chainId !== SEPOLIA_CHAIN_ID) {
      toast.warning("Please switch to Sepolia network");
    } else {
      // Refresh balance on chain change
      this.refreshBalance();
    }
  }

  async refreshBalance() {
    if (!this._state.address || !this._state.provider) return;
    
    try {
      const balance = await this._state.provider.getBalance(this._state.address);
      this.setState({ balance: ethers.formatEther(balance) });
    } catch (error) {
      console.error("Failed to refresh balance:", error);
    }
  }

  async switchToSepolia() {
    if (!window.ethereum) return;
    
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + SEPOLIA_CHAIN_ID.toString(16) }],
      });
      
      toast.success("Switched to Sepolia network");
    } catch (error: any) {
      // If the chain hasn't been added to MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x" + SEPOLIA_CHAIN_ID.toString(16),
                chainName: "Sepolia Test Network",
                nativeCurrency: {
                  name: "Sepolia ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: [SEPOLIA_RPC_URL],
                blockExplorerUrls: ["https://sepolia.etherscan.io/"],
              },
            ],
          });
          toast.success("Sepolia network added");
        } catch (addError) {
          console.error("Failed to add Sepolia network:", addError);
          toast.error("Failed to add Sepolia network");
        }
      } else {
        console.error("Failed to switch to Sepolia network:", error);
        toast.error("Failed to switch to Sepolia network");
      }
    }
  }

  async swapETHForTokens(
    ethAmount: string,
    slippageTolerance: number = 0.5
  ): Promise<boolean> {
    if (!this._state.address || !this._state.provider) {
      toast.error("Please connect your wallet first");
      return false;
    }
  
    try {
      toast.loading("Preparing swap...", { id: "swap-prep" });
  
      const provider = this._state.provider;
      const signer = await provider.getSigner();
      
      // Convert ETH amount to wei
      const ethInWei = ethers.parseEther(ethAmount);
  
      // Connect to the contract
      const contract = new ethers.Contract(
        MEMECOIN_CONTRACT_ADDRESS,
        MEMECOIN_ABI,
        signer
      );
  
      toast.loading("Sending transaction...", { id: "swap-prep" });
  
      // Call the swap function on the contract (assuming the contract has swapETHForTokens)
      const tx = await contract.swapETHForTokens({
        value: ethInWei, // Sending ETH along with the function call
      });
  
      toast.loading(`Transaction sent! Waiting for confirmation...`, { id: "swap-prep" });
  
      // Wait for transaction confirmation
      const receipt = await tx.wait();
  
      if (receipt && receipt.status === 1) {
        toast.success(`Swap completed! Tokens received`, { id: "swap-prep" });
  
        // Refresh the balance
        await this.refreshBalance();
        return true;
      } else {
        toast.error("Transaction failed", { id: "swap-prep" });
        return false;
      }
    } catch (error) {
      console.error("Swap failed:", error);
      toast.error("Swap failed. Please try again.", { id: "swap-prep" });
      return false;
    }
  }

  async getTokenBalance(tokenAddress: string): Promise<string> {
    if (!this._state.address || !this._state.provider) {
      return "0";
    }

    try {
      return await getTokenBalance(tokenAddress, this._state.address, this._state.provider);
    } catch (error) {
      console.error("Failed to get token balance:", error);
      return "0";
    }
  }
}

export const getWalletService = (): WalletService => {
  return WalletService.getInstance();
};

// Declare ethereum on window object
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, listener: (...args: any[]) => void) => void;
      removeListener: (event: string, listener: (...args: any[]) => void) => void;
    };
  }
}
