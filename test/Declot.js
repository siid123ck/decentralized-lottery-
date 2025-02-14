const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
// const subscriptionId = process.env.SUBSCRIPTION_ID


describe("LotteryVRF", function () {
  async function deployLotteryVRFFixture() {
    const [owner, player1, player2] = await ethers.getSigners();
 
    // Deploy VRFCoordinatorV2Mock
    const VRFCoordinatorV2Mock = await ethers.getContractFactory("VRFCoordinatorV2Mock");
    const vrfMock = await VRFCoordinatorV2Mock.deploy(0, 0); 
    await vrfMock.waitForDeployment();
    const tx = await vrfMock.createSubscription();
    const receipt = await tx.wait();
    const subscriptionId = receipt.logs[0].args.subId;

    await vrfMock.fundSubscription(subscriptionId, ethers.parseEther("10")); 
    const LotteryVRF = await ethers.getContractFactory("LotteryVRF");
    const lotteryVRF = await LotteryVRF.deploy(subscriptionId);

    await vrfMock.addConsumer(subscriptionId, lotteryVRF.target);


    return { lotteryVRF, vrfMock, subscriptionId, owner, player1, player2 };
  }

  describe("Deployment", function () {
    it("Should set the correct subscription ID", async function () {
      const { lotteryVRF, subscriptionId } = await loadFixture(deployLotteryVRFFixture);

      expect(await lotteryVRF.s_subscriptionId()).to.equal(subscriptionId);
    });

    it("Should set the correct entry fee", async function () {
      const { lotteryVRF } = await loadFixture(deployLotteryVRFFixture);
      expect(await lotteryVRF.entryFee()).to.equal(ethers.parseEther("0.01"));
    });
  });

  describe("Enter Lottery", function () {
    it("Should allow players to enter the lottery", async function () {
      const { lotteryVRF, player1 } = await loadFixture(deployLotteryVRFFixture);

      // Player1 enters the lottery
      await expect(
        lotteryVRF.connect(player1).enterLottery({ value: ethers.parseEther("0.01") })
      )
        .to.emit(lotteryVRF, "LotteryEntered")
        .withArgs(player1.address);

      // Check participants
      const participants = await lotteryVRF.getParticipants();
      expect(participants).to.include(player1.address);
    });

    it("Should revert if the entry fee is incorrect", async function () {
      const { lotteryVRF, player1 } = await loadFixture(deployLotteryVRFFixture);

      // Player1 tries to enter with incorrect fee
      await expect(
        lotteryVRF.connect(player1).enterLottery({ value: ethers.parseEther("0.005") })
      ).to.be.revertedWith("Incorrect entry fee");
    });
  });

  describe("Request Random Winner", function () {
    it("Should allow the owner to request a random winner", async function () {
      const { lotteryVRF, owner, player1, player2 } = await loadFixture(deployLotteryVRFFixture);

      // Players enter the lottery
      await lotteryVRF.connect(player1).enterLottery({ value: ethers.parseEther("0.01") });
      await lotteryVRF.connect(player2).enterLottery({ value: ethers.parseEther("0.01") });

      // Owner requests a random winner
      await expect(lotteryVRF.connect(owner).requestRandomWinner())
        .to.emit(lotteryVRF, "WinnerRequested")
    });

    it("Should revert if there are no participants", async function () {
      const { lotteryVRF, owner } = await loadFixture(deployLotteryVRFFixture);

      // Owner tries to request a winner with no participants
      await expect(lotteryVRF.connect(owner).requestRandomWinner()).to.be.revertedWith(
        "No participants"
      );
    });
  });

  describe("Fulfill Random Words", function () {
    it("Should select a winner and transfer the prize", async function () {
      const { lotteryVRF, vrfMock, owner, player1, player2 } = await loadFixture(deployLotteryVRFFixture);

      // Players enter the lottery
      await lotteryVRF.connect(player1).enterLottery({ value: ethers.parseEther("0.01") });
      await lotteryVRF.connect(player2).enterLottery({ value: ethers.parseEther("0.01") });

      // Owner requests a random winner
      const tx = await lotteryVRF.connect(owner).requestRandomWinner();
      const receipt = await tx.wait();
      const requestId = receipt.logs[0].args.requestId;

            // Mock VRF fulfillment
     await expect(vrfMock.fulfillRandomWords(requestId, lotteryVRF.target))
        .to.emit(lotteryVRF, "WinnerSelected");   

      // Check winner and prize distribution
      const winner = await lotteryVRF.getWinner();
      expect(winner).to.be.oneOf([player1.address, player2.address]);

      const winnerBalance = await ethers.provider.getBalance(winner);
      expect(winnerBalance).to.be.gt(ethers.parseEther("10000")); // Winner's balance increases
    });

    it("Should revert if there are no participants when fulfilling random words", async function () {
      const { lotteryVRF, vrfMock, owner } = await loadFixture(deployLotteryVRFFixture);

      // Owner requests a random winner (no participants)
      const tx = await lotteryVRF.connect(owner).requestRandomWinner();
      const receipt = await tx.wait();
      const requestId = receipt.logs[0].args.requestId;

      await expect(vrfMock.fulfillRandomWords(requestId, lotteryVRF.target)).to.be.revertedWith(
        "No participants"
      );
    });
  });

  describe("Getters", function () {
    it("Should return the list of participants", async function () {
      const { lotteryVRF, player1, player2 } = await loadFixture(deployLotteryVRFFixture);

      // Players enter the lottery
      await lotteryVRF.connect(player1).enterLottery({ value: ethers.parseEther("0.01") });
      await lotteryVRF.connect(player2).enterLottery({ value: ethers.parseEther("0.01") });

      // Check participants
      const participants = await lotteryVRF.getParticipants();
      expect(participants).to.have.lengthOf(2);
      expect(participants).to.include(player1.address);
      expect(participants).to.include(player2.address);
    });

    it("Should return the last winner", async function () {
      const { lotteryVRF, owner, player1, player2 } = await loadFixture(deployLotteryVRFFixture);

      // Players enter the lottery
      await lotteryVRF.connect(player1).enterLottery({ value: ethers.parseEther("0.01") });
      await lotteryVRF.connect(player2).enterLottery({ value: ethers.parseEther("0.01") });

      // Owner requests a random winner
      const tx = await lotteryVRF.connect(owner).requestRandomWinner();
      const receipt = await tx.wait();
      const requestId = receipt.logs[0].args.requestId;

      const randomWords = [42]; // Mock random number
      await lotteryVRF.connect(owner).fulfillRandomWords(requestId, randomWords);

      // Check last winner
      const winner = await lotteryVRF.getWinner();
      expect(winner).to.be.oneOf([player1.address, player2.address]);
    });

    it("Should return the last random number", async function () {
      const { lotteryVRF, owner, player1, player2 } = await loadFixture(deployLotteryVRFFixture);

      // Players enter the lottery
      await lotteryVRF.connect(player1).enterLottery({ value: ethers.parseEther("0.01") });
      await lotteryVRF.connect(player2).enterLottery({ value: ethers.parseEther("0.01") });

      // Owner requests a random winner
      const tx = await lotteryVRF.connect(owner).requestRandomWinner();
      const receipt = await tx.wait();
      const requestId = receipt.logs[0].args.requestId;

      const randomWords = [42]; // Mock random number
      await lotteryVRF.connect(owner).fulfillRandomWords(requestId, randomWords);

      // Check last random number
      const randomNumber = await lotteryVRF.getRandomNumber();
      expect(randomNumber).to.equal(42);
    });
  });
});