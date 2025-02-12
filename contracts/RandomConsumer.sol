// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts@1.3.0/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts@1.3.0/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract LotteryVRF is VRFConsumerBaseV2Plus {
    uint256 private constant WINNER_PENDING = 42;
    address public lastWinner;
    uint256 public lastRandomNumber;


    uint256 public s_subscriptionId;
    address public vrfCoordinator = 0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B;

    bytes32 public s_keyHash =
        0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;

    uint32 public callbackGasLimit = 200000;
    uint16 public requestConfirmations = 3;
    uint32 public numWords = 1;

    address[] public participants;
    mapping(uint256 => address) private s_requests;
    mapping(address => uint256) private s_results;

    event LotteryEntered(address indexed player);
    event WinnerRequested(uint256 indexed requestId);
    event WinnerSelected(uint256 indexed requestId, address indexed winner, uint256 prize);

 

    uint256 public entryFee = 0.01 ether;

    constructor(uint256 subscriptionId) VRFConsumerBaseV2Plus(vrfCoordinator) {
        s_subscriptionId = subscriptionId;
    }

    function enterLottery() public payable {
        require(msg.value == entryFee, "Incorrect entry fee");
        participants.push(msg.sender);
        emit LotteryEntered(msg.sender);
    }

    function requestRandomWinner() public  returns (uint256 requestId) {
        require(participants.length > 0, "No participants");

        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );

        s_requests[requestId] = msg.sender;
        emit WinnerRequested(requestId);
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] calldata randomWords
    ) internal override {
        require(participants.length > 0, "No participants");
        
        lastRandomNumber = randomWords[0];
        uint256 winnerIndex = randomWords[0] % participants.length;
        lastWinner = participants[winnerIndex];

        uint256 prize = address(this).balance;
        delete participants;

        payable(lastWinner).transfer(prize);
        emit WinnerSelected(requestId, lastWinner, prize);
    }

    function getParticipants() public view returns (address[] memory) {
        return participants;
    }

    function getWinner() public view returns (address) {
    return lastWinner;
    }

    function getRandomNumber() public view returns (uint256) {
    return lastRandomNumber;
    }

    receive() external payable {}
}
