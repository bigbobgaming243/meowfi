
import { ethers } from "ethers";

// This ABI includes only the functions we need for the swap functionality
export const MEMECOIN_ABI = [
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event TokensPurchased(address indexed buyer, uint256 ethAmount, uint256 tokenAmount)",
  "event TokensPerEthUpdated(uint256 newRate)",

  // Read functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address owner) view returns (uint256)",
  "function tokensPerEth() view returns (uint256)",

  // Write functions
  "function transfer(address to, uint256 value) returns (bool)",
  "function swapETHForTokens() payable",
  "function setTokensPerEth(uint256 newRate)",
  "function withdrawETH(address to, uint256 amount)",
  "function withdrawTokens(address to, uint256 amount)",

  // Fallback for receiving ETH
  "receive() external payable"
];


// IMPORTANT: Replace this with your actual deployed contract address on Sepolia
export const MEMECOIN_CONTRACT_ADDRESS = "0xA451b908c7AD183aBD55F8AD48C055Da8cb4264d"; 

export function getMemecoinContract(provider: ethers.Provider, signer?: ethers.Signer) {
  const contract = new ethers.Contract(MEMECOIN_CONTRACT_ADDRESS, MEMECOIN_ABI, provider);
  
  if (signer) {
    return contract.connect(signer);
  }
  
  return contract;
}

// Helper function to get token balance 
export async function getTokenBalance(
  tokenAddress: string, 
  accountAddress: string, 
  provider: ethers.Provider
): Promise<string> {
  try {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ["function balanceOf(address) view returns (uint256)", "function decimals() view returns (uint8)"],
      provider
    );
    
    const [balance, decimals] = await Promise.all([
      tokenContract.balanceOf(accountAddress),
      tokenContract.decimals(),
    ]);
    
    return ethers.formatUnits(balance, decimals);
  } catch (error) {
    console.error("Error getting token balance:", error);
    return "0";
  }
}
