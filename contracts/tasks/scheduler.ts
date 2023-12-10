import '@nomicfoundation/hardhat-toolbox';
import "@nomicfoundation/hardhat-ethers";
import { task } from 'hardhat/config';
import { createHash } from 'crypto';


function stringToBytes32(str: string) {
  const encodedString = new TextEncoder().encode(str);
  const hash = createHash('sha256').update(encodedString).digest('hex');
  return `0x${hash.slice(0, 64)}`; // Truncate to bytes32 length
}

task("scheduler:get", "Check Chainlink Upkeep")
  .addParam("scheduler", "The Scheduler contract address")
  .addParam("id", "The Post Schedule ID")
  .setAction(async (args) => {
      const scheduler = await ethers.getContractAt("DeFolioScheduler", args.scheduler);

      await scheduler.waitForDeployment();

      console.log(
        await scheduler.postSchedules(parseInt(args.id)),
      );
    });


task("scheduler:checkupkeep", "Check Chainlink Upkeep")
  .addParam("scheduler", "The Scheduler contract address")
  .setAction(async (args) => {
      const scheduler = await ethers.getContractAt("DeFolioScheduler", args.scheduler);

      await scheduler.waitForDeployment();

      console.log(
        await scheduler.checkUpkeep(stringToBytes32('')),
      );
    });

task("scheduler:performupkeep", "Check Chainlink Upkeep")
  .addParam("scheduler", "The Scheduler contract address")
  .setAction(async (args) => {
      const scheduler = await ethers.getContractAt("DeFolioScheduler", args.scheduler);

      await scheduler.waitForDeployment();

      try {
        console.log(
          await scheduler.performUpkeep(stringToBytes32('')),
        );
      } catch (error) {
        console.log(error)
      }
    });

