
#!/bin/bash
# This script installs Foundry

curl -L https://foundry.paradigm.xyz | bash
source ~/.bashrc
foundryup

echo "Foundry installed successfully!"
echo "You can now use the following commands:"
echo "  - forge: Compile, test, and deploy contracts"
echo "  - cast: Interact with contracts on-chain"
echo "  - anvil: Run a local Ethereum node"
