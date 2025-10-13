import { expect } from "chai";
import { ethers } from "hardhat";
import { ModernRetroCyberToken } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("ModernRetroCyberToken", function () {
  let token: ModernRetroCyberToken;
  let owner: HardhatEthersSigner;
  let player1: HardhatEthersSigner;
  let player2: HardhatEthersSigner;
  let otherAccount: HardhatEthersSigner;
  
  const INITIAL_SUPPLY = ethers.parseEther("100000000"); // 100M tokens
  const MAX_SUPPLY = ethers.parseEther("1000000000"); // 1B tokens
  
  beforeEach(async function () {
    [owner, player1, player2, otherAccount] = await ethers.getSigners();
    
    const TokenFactory = await ethers.getContractFactory("ModernRetroCyberToken");
    token = await TokenFactory.deploy() as ModernRetroCyberToken;
    await token.waitForDeployment();
  });
  
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });
    
    it("Should assign initial supply to owner", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(INITIAL_SUPPLY);
    });
    
    it("Should set correct token details", async function () {
      expect(await token.name()).to.equal("ModernRetroCyberToken");
      expect(await token.symbol()).to.equal("MRC");
      expect(await token.decimals()).to.equal(18);
      expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY);
    });
  });
  
  describe("Gaming Mechanics", function () {
    beforeEach(async function () {
      // Activate game for player1
      await token.connect(player1).setGameStatus(true);
    });
    
    it("Should allow players to activate/deactivate mining", async function () {
      expect(await token.isGameActive(player1.address)).to.be.true;
      
      await token.connect(player1).setGameStatus(false);
      expect(await token.isGameActive(player1.address)).to.be.false;
    });
    
    it("Should prevent mining when game is not active", async function () {
      await token.connect(player2).setGameStatus(false);
      
      await expect(
        token.connect(player2).mineTokens(1)
      ).to.be.revertedWithCustomError(token, "GameNotActive");
    });
    
    it("Should allow mining when game is active", async function () {
      const initialBalance = await token.balanceOf(player1.address);
      
      await token.connect(player1).mineTokens(1);
      
      const newBalance = await token.balanceOf(player1.address);
      expect(newBalance).to.be.gt(initialBalance);
    });
    
    it("Should calculate mining rewards correctly based on level", async function () {
      // Level 1 mining
      const baseAmount = ethers.parseEther("1");
      const expectedReward = await token.calculateMiningReward(player1.address, baseAmount);
      
      const initialBalance = await token.balanceOf(player1.address);
      await token.connect(player1).mineTokens(baseAmount);
      const newBalance = await token.balanceOf(player1.address);
      
      expect(newBalance - initialBalance).to.equal(expectedReward);
    });
    
    it("Should respect mining cooldown", async function () {
      await token.connect(player1).mineTokens(1);
      
      // Should fail immediately due to cooldown
      await expect(
        token.connect(player1).mineTokens(1)
      ).to.be.revertedWithCustomError(token, "MiningCooldownActive");
    });
    
    it("Should level up players based on total mined", async function () {
      const initialStats = await token.getPlayerStats(player1.address);
      expect(initialStats.level).to.equal(1n);
      
      // Mine enough tokens to level up (1000 tokens = level 2)
      const mineAmount = ethers.parseEther("1000");
      await token.connect(player1).mineTokens(mineAmount);
      
      const newStats = await token.getPlayerStats(player1.address);
      expect(newStats.level).to.be.gt(initialStats.level);
    });
    
    it("Should emit TokensMined event", async function () {
      await expect(
        token.connect(player1).mineTokens(1)
      )
        .to.emit(token, "TokensMined")
        .withArgs(player1.address, await token.calculateMiningReward(player1.address, 1), 1);
    });
    
    it("Should emit LevelUp event when player levels up", async function () {
      const mineAmount = ethers.parseEther("1000");
      
      await expect(
        token.connect(player1).mineTokens(mineAmount)
      ).to.emit(token, "LevelUp");
    });
  });
  
  describe("Player Statistics", function () {
    beforeEach(async function () {
      await token.connect(player1).setGameStatus(true);
    });
    
    it("Should return correct player stats", async function () {
      const stats = await token.getPlayerStats(player1.address);
      
      expect(stats.level).to.equal(1n);
      expect(stats.mined).to.equal(0n);
      expect(stats.active).to.be.true;
    });
    
    it("Should update total mined after mining", async function () {
      const mineAmount = ethers.parseEther("100");
      await token.connect(player1).mineTokens(mineAmount);
      
      const stats = await token.getPlayerStats(player1.address);
      expect(stats.mined).to.be.gt(0n);
    });
  });
  
  describe("Owner Functions", function () {
    it("Should allow owner to update mining rate", async function () {
      const newRate = ethers.parseEther("2");
      
      await expect(
        token.connect(owner).updateMiningRate(newRate)
      ).to.emit(token, "MiningRateUpdated").withArgs(newRate);
      
      expect(await token.baseMiningRate()).to.equal(newRate);
    });
    
    it("Should prevent non-owner from updating mining rate", async function () {
      const newRate = ethers.parseEther("2");
      
      await expect(
        token.connect(player1).updateMiningRate(newRate)
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });
    
    it("Should allow owner to pause/unpause contract", async function () {
      await token.connect(owner).pause();
      expect(await token.paused()).to.be.true;
      
      await token.connect(owner).unpause();
      expect(await token.paused()).to.be.false;
    });
    
    it("Should prevent mining when paused", async function () {
      await token.connect(player1).setGameStatus(true);
      await token.connect(owner).pause();
      
      await expect(
        token.connect(player1).mineTokens(1)
      ).to.be.reverted;
    });
  });
  
  describe("Security Features", function () {
    it("Should prevent mining with zero amount", async function () {
      await token.connect(player1).setGameStatus(true);
      
      await expect(
        token.connect(player1).mineTokens(0)
      ).to.be.revertedWithCustomError(token, "InvalidAmount");
    });
    
    it("Should prevent exceeding max supply", async function () {
      // This test would require mining a very large amount
      // For practical purposes, we'll test the emergency mint function
      const excessiveAmount = MAX_SUPPLY;
      
      await expect(
        token.connect(owner).emergencyMint(owner.address, excessiveAmount)
      ).to.be.revertedWithCustomError(token, "MaxSupplyExceeded");
    });
    
    it("Should prevent invalid addresses in stats queries", async function () {
      await expect(
        token.getPlayerStats(ethers.ZeroAddress)
      ).to.be.revertedWithCustomError(token, "InvalidAddress");
    });
  });
  
  describe("ERC20 Functionality", function () {
    it("Should allow token transfers", async function () {
      const transferAmount = ethers.parseEther("1000");
      
      await token.connect(owner).transfer(player1.address, transferAmount);
      expect(await token.balanceOf(player1.address)).to.equal(transferAmount);
    });
    
    it("Should allow token burning", async function () {
      const burnAmount = ethers.parseEther("1000");
      const initialSupply = await token.totalSupply();
      
      await token.connect(owner).burn(burnAmount);
      
      expect(await token.totalSupply()).to.equal(initialSupply - burnAmount);
    });
  });
});
