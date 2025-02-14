const hre = require('hardhat')
const fs = require('fs')
const path = require('path')
async function main(){
    const subscriptionId = process.env.SUBSCRIPTION_ID;
    const LotteryVRF = await hre.ethers.getContractFactory("LotteryVRF");
    const lotteryVRF = await LotteryVRF.deploy(subscriptionId);

    await lotteryVRF.waitForDeployment();

    const contractAddress = lotteryVRF.target;

    console.log("lottery deployed to:", contractAddress);

    const contractAddressPath = path.join(__dirname, "contract-address.json");
    fs.writeFileSync(
      contractAddressPath,
      JSON.stringify({ LotteryVRF: contractAddress }, null, 2)
    );
  
    console.log(`Contract address saved to ${contractAddressPath}`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });