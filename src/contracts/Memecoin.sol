// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Meowfi Token
 * @dev Free-trading Meowfi Token with ETH-to-MEOW swap functionality
 */
contract Meowfi is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    uint256 public constant INITIAL_CONTRACT_BALANCE = 1_000_000 * 10**18; // 1 million tokens for the contract
    uint256 public tokensPerEth = 1000 * 10**18; // 1 ETH = 1000 MEOW (adjustable)
    
    event TokensPurchased(address indexed buyer, uint256 ethAmount, uint256 tokenAmount);
    event TokensPerEthUpdated(uint256 newRate);

    constructor() ERC20("Meowfi", "MEOW") Ownable(msg.sender) {
        _mint(msg.sender, TOTAL_SUPPLY); // Mint all tokens to the owner
        _transfer(msg.sender, address(this), INITIAL_CONTRACT_BALANCE); // Fund the contract with 1 million MEOW
    }

    // Allow users to swap ETH for MEOW tokens
    function swapETHForTokens() external payable {
        require(msg.value > 0, "Send ETH to buy MEOW");

        uint256 tokenAmount = msg.value * tokensPerEth / 1 ether; // Calculate token amount
        require(balanceOf(address(this)) >= tokenAmount, "Not enough MEOW in contract");

        _transfer(address(this), msg.sender, tokenAmount); // Transfer MEOW tokens
        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }

    // Owner can update the ETH-to-MEOW conversion rate
    function setTokensPerEth(uint256 newRate) external onlyOwner {
        require(newRate > 0, "Rate must be greater than zero");
        tokensPerEth = newRate;
        emit TokensPerEthUpdated(newRate);
    }

    // Allow the contract to receive ETH
    receive() external payable {}

    // Owner can withdraw ETH from the contract
    function withdrawETH(address payable to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot send to zero address");
        require(amount <= address(this).balance, "Insufficient contract balance");
        to.transfer(amount);
    }

    // Owner can withdraw MEOW tokens from the contract
    function withdrawTokens(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot send to zero address");
        require(balanceOf(address(this)) >= amount, "Insufficient contract balance");
        _transfer(address(this), to, amount);
    }
}