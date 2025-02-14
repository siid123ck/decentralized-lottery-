const { ethers } = require("hardhat");

async function main() {
  const BASE_FEE = ethers.parseEther("0.25"); // Cost per request
  const GAS_PRICE_LINK = 1e9; // LINK per gas

  console.log("Deploying VRFCoordinatorV2Mock...");
  const VRFCoordinatorV2Mock = await ethers.getContractFactory("VRFCoordinatorV2Mock");
  const vrfCoordinatorV2Mock = await VRFCoordinatorV2Mock.deploy(BASE_FEE, GAS_PRICE_LINK);
  await vrfCoordinatorV2Mock.waitForDeployment();

  console.log("Mock VRF Coordinator deployed to:", vrfCoordinatorV2Mock.target);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
