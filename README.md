# MeowFi

MeowFi is a memecoin landing page featuring a DEX swap interface that allows users to swap **$MEOW** tokens to **Sepolia ETH**. Built with cutting-edge web3 technologies, MeowFi provides a seamless and fun trading experience for crypto enthusiasts.

## 🚀 Features
- **Memecoin Landing Page** – A sleek and playful UI designed to attract the MeowFi community.
- **DEX Swap Interface** – Users can easily swap $MEOW tokens for Sepolia ETH.
- **Web3 Integration** – Connect your wallet to interact with the MeowFi smart contract.
- **Fast & Responsive** – Built with React, Tailwind, and ShadCN for a smooth user experience.
- **Secure Smart Contracts** – Developed using Solidity and tested with Foundry.

## 🛠 Tech Stack
- **Frontend:** React, Tailwind CSS, ShadCN
- **Blockchain:** Solidity, Foundry
- **Wallet Integration:** Ethers.js
- **Smart Contract Deployment:** Sepolia Testnet

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ShyneADL/meowfi.git
   cd meowfi
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```sh
   VITE_ALCHEMY_API_KEY=your_api_key
   VITE_CONTRACT_ADDRESS=your_contract_address
   VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## 🔗 Smart Contract Deployment (Foundry)
1. Install Foundry:
   ```sh
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```
2. Compile the contract:
   ```sh
   forge build
   ```
3. Run tests:
   ```sh
   forge test
   ```
4. Deploy to Sepolia:
   ```sh
   forge script script/Deploy.s.sol:Deploy --rpc-url https://sepolia.infura.io/v3/YOUR_INFURA_KEY --private-key YOUR_PRIVATE_KEY --broadcast
   ```

## 📜 License
This project is licensed under the MIT License.

---

Enjoy swapping with **MeowFi**! 🐱💰

