import '@nomicfoundation/hardhat-toolbox';
import "@nomicfoundation/hardhat-ethers";
import { task } from 'hardhat/config';

task("deploy", "Deploy the DeFolioScheduler contract")
  .addParam("apiurl", "The DeFolio API base URL", "https://defolio.xyz/api")
  .setAction(async (args) => {
      const scheduler = await ethers.deployContract("DeFolioScheduler", [args.apiurl]);

      await scheduler.waitForDeployment();

      console.log(
        `DeFolioScheduler deployed to ${scheduler.target}`
      );

      const contract = await ethers.deployContract("DeFolioSpaceFactory", [scheduler.target]);

      await contract.waitForDeployment();
  
      console.log(
        `DeFolioSpaceFactory deployed to ${contract.target}`
      );
    });
