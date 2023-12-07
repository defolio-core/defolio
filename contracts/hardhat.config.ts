import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-abi-exporter';

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  abiExporter: {
    path: '../webapp/src/abi',
    flat: true,
  },
};

export default config;
