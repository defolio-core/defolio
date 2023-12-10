import { ethers } from 'hardhat';
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from 'chai';
import { DeFolioSpace } from '../typechain-types';
import { fakeCID } from './utils';

describe('DeFolioSpace Contract', function () {
  let DeFolioSpace: DeFolioSpace;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const DeFolioSpaceFactory = await ethers.getContractFactory('DeFolioSpace');
    DeFolioSpace = (await DeFolioSpaceFactory.deploy(owner.address)) as DeFolioSpace;
    await DeFolioSpace.waitForDeployment();
  });

  it('Should allow owner to publish a post', async function () {
    const ipfsCID = fakeCID();
    const slug = "your-slug"; // Define a slug here for testing
    await DeFolioSpace.connect(owner).publishPost(slug, ipfsCID, 0);
    const post = await DeFolioSpace.posts(1);

    expect(post.date).to.not.equal(0);
    expect(post.ipfsCID).to.equal(ipfsCID);
    expect(post.archived).to.equal(false);
  });

  it('Should allow owner to update a post', async function () {
    const initialCID = fakeCID();
    const updatedCID = fakeCID();
    const slug = "your-slug"; // Define a slug here for testing
    await DeFolioSpace.connect(owner).publishPost(slug, initialCID, 0);
    await DeFolioSpace.connect(owner).updatePost(1, updatedCID);
    const post = await DeFolioSpace.posts(1);

    expect(post.ipfsCID).to.equal(updatedCID);
  });

  it('Should allow owner to archive a post', async function () {
    const ipfsCID = fakeCID();
    const slug = "your-slug"; // Define a slug here for testing
    await DeFolioSpace.connect(owner).publishPost(slug, ipfsCID, 0);
    await DeFolioSpace.connect(owner).archivePost(1);
    const post = await DeFolioSpace.posts(1);

    expect(post.archived).to.equal(true);
  });

  it('Should not allow non-owner to perform actions', async function () {
    const ipfsCID = fakeCID();
    const slug = "your-slug"; // Define a slug here for testing
    await expect(DeFolioSpace.connect(addr1).publishPost(slug, ipfsCID, 0)).to.be.reverted;
    await expect(DeFolioSpace.connect(addr1).updatePost(1, ipfsCID)).to.be.reverted;
    await expect(DeFolioSpace.connect(addr1).archivePost(1)).to.be.reverted;
  });

  it('Should retrieve a post by slug', async function () {
    const cid = fakeCID();
    const slug = "your-slug"; // Define a slug here for testing
    await DeFolioSpace.connect(owner).publishPost(slug, cid, 0);
  
    const [date, ipfsCID, archived] = await DeFolioSpace.getPostBySlug(slug);
  
    expect(date).to.not.equal(0);
    expect(ipfsCID).to.equal(ipfsCID);
    expect(archived).to.equal(false);
  });
  
  it('Should revert when retrieving a non-existent post by slug', async function () {
    const nonExistentSlug = "non-existent-slug"; // Define a non-existent slug here for testing
  
    await expect(DeFolioSpace.getPostBySlug(nonExistentSlug)).to.be.revertedWith("Slug does not exist");
  });

  it('Should create an scheduled post when scheduledToTime is different than 0', async function () {  
    const ipfsCID = "";
    const slug = "your-slug"; // Define a slug here for testing
    const scheduledToTime = Math.floor(Date.now() / 1000) + 3600;
    await DeFolioSpace.connect(owner).publishPost(slug, ipfsCID, scheduledToTime);
    const post = await DeFolioSpace.posts(1);

    expect(post.ipfsCID).to.equal(ipfsCID);
    expect(post.archived).to.equal(false);
    expect(post.scheduledToTime).to.equal(scheduledToTime);

    expect(await DeFolioSpace.isSomePostReadyToBePublished()).to.be.false;
    await time.increaseTo(scheduledToTime + 1);
    expect(await DeFolioSpace.isSomePostReadyToBePublished()).to.be.true;
  });

});
