import dotenv from 'dotenv';
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-abi-exporter';

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  abiExporter: [
    {
      path: '../webapp/src/abi',
      flat: true,
    },
    {
      path: '../api/src/abi',
      flat: true,
    }
  ],
  networks: {
    local: {
      url: process.env.LOCAL_URL,
      accounts: [process.env.LOCAL_PRIVATE_KEY as string],
    },
    testnet: {
      url: process.env.TESTNET_URL,
      accounts: [process.env.TESTNET_PRIVATE_KEY as string],
    },
    mainnet: {
      url: process.env.MAINNET_URL,
      accounts: [process.env.MAINNET_PRIVATE_KEY as string],
    },
  },
};

export default config;
