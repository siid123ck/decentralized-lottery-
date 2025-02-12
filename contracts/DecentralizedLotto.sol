// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "./randomConsumer.sol";

contract DecentralizedLottery is AutomationCompatibleInterface {
    address public owner;
    address[] public participants;
    uint256 public lotteryEndTime;
    uint256 public requestId;
    uint256 public duration;
    address public winner;
    address[] public winners;
    RandomNumberConsumer public randomNumberConsumer;

    event LotteryEntered(address indexed participant);
    event WinnerSelected(address indexed winner);

    constructor(address _randomNumberConsumerAddress, uint256 _duration) {
        owner = msg.sender;
        randomNumberConsumer = RandomNumberConsumer(_randomNumberConsumerAddress);
        duration = _duration;
        lotteryEndTime = block.timestamp + _duration;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function enterLottery() public payable {
        require(block.timestamp < lotteryEndTime, "Lottery has ended");
        require(msg.value == 0.1 ether, "Exact amount of 0.1 ETH required");

        participants.push(msg.sender);
        emit LotteryEntered(msg.sender);
    }

    function endLottery() internal {
        require(block.timestamp >= lotteryEndTime, "Lottery still ongoing");
        require(participants.length > 0, "No participants");

        requestId = randomNumberConsumer.requestRandomWords();
    }

    function selectWinner() internal {
        (,bool fulfilled, uint256[] memory randomWords) = randomNumberConsumer.getRequestStatus(requestId);
        require(fulfilled, "Random number not fulfilled yet");

        uint256 winnerIndex = randomWords[0] % participants.length;
        winner = participants[winnerIndex];

        payable(winner).transfer(address(this).balance);
        winners.push(winner);
        emit WinnerSelected(winner);

        // Reset the lottery for the next round
        participants = new address[](0) ;
        lotteryEndTime = block.timestamp + duration;
    }

    // Chainlink Keepers functions
    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = (block.timestamp >= lotteryEndTime && participants.length > 0);
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        if (block.timestamp >= lotteryEndTime && participants.length > 0) {
            endLottery();
            selectWinner();
        }
    }
}
