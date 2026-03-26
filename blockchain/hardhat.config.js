require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",

  networks: {
    // Local Hardhat development node (default)
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // Sepolia testnet (optional – uncomment and fill in your keys)
    // sepolia: {
    //   url: `https://sepolia.infura.io/v3/YOUR_INFURA_KEY`,
    //   accounts: [`0x${process.env.PRIVATE_KEY}`],
    // },
  },
};
