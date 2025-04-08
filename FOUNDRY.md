
# Foundry Integration for Memecoin Project

This project uses [Foundry](https://book.getfoundry.sh/) for smart contract development, testing, and deployment.

## Getting Started with Foundry

### Installation

Run the install script:

```bash
chmod +x scripts/install-foundry.sh
./scripts/install-foundry.sh
```

Alternatively, install manually:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Initialize Foundry for the Project

```bash
forge install
```

This will install the required dependencies, including OpenZeppelin contracts.

### Compile Contracts

```bash
forge build
```

### Run Tests

```bash
forge test
```

For verbose output:

```bash
forge test -vvv
```

### Deploy Contract to Sepolia

Create a `.env` file with your private key and RPC URL:

```
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=your_sepolia_rpc_url
ETHERSCAN_API_KEY=your_etherscan_api_key
```

Then run:

```bash
source .env
forge script src/script/DeployMemecoin.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify
```

## Contract Structure

- `Memecoin.sol`: Main token contract with tax features and anti-bot protection
- `Memecoin.t.sol`: Test file for the Memecoin contract
- `DeployMemecoin.s.sol`: Deployment script

## Environment Setup

The foundry.toml file contains configuration for:
- Source directory: `src/contracts`
- Test directory: `src/test`
- Script directory: `src/script`
- Libraries: OpenZeppelin contracts (installed via forge)

## After Deployment

After deploying the contract, update the contract address in:
```
src/lib/contractHelper.ts
```

Replace the placeholder address with your actual deployed contract address.
