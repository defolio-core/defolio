import { ethers } from 'hardhat';
import { expect } from 'chai';
import { DeFolioSpaceFactory } from '../typechain-types';

describe('DeFolioSpaceFactory Contract', function () {
  let DeFolioSpaceFactory: DeFolioSpaceFactory;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const DeFolioSpaceFactoryFactory = await ethers.getContractFactory('DeFolioSpaceFactory');
    DeFolioSpaceFactory = (await DeFolioSpaceFactoryFactory.deploy()) as DeFolioSpaceFactory;
    await DeFolioSpaceFactory.waitForDeployment();
  });

  it('Should deploy a new DeFolioSpace contract', async function () {
    const txn = await DeFolioSpaceFactory.deployContract(owner.address);
    const deployedContracts = await DeFolioSpaceFactory.getDeployedContracts();
    
    expect(deployedContracts.length).to.equal(1);
    expect(await ethers.provider.getCode(deployedContracts[0])).to.not.equal('0x');

    await expect(txn).to.emit(DeFolioSpaceFactory, 'ContractDeployed').withArgs(deployedContracts[0], owner.address);
  });

  it('Should return all deployed contract addresses', async function () {
    await DeFolioSpaceFactory.deployContract(owner.address);
    await DeFolioSpaceFactory.deployContract(owner.address);
    const deployedContracts = await DeFolioSpaceFactory.getDeployedContracts();

    expect(deployedContracts.length).to.equal(2);
  });

  it('Should allow anyone to deploy contracts', async function () {
    await expect(DeFolioSpaceFactory.connect(addr1).deployContract(owner.address)).to.not.be.reverted;
    await expect(DeFolioSpaceFactory.connect(addr2).deployContract(owner.address)).to.not.be.reverted;
  });
});
