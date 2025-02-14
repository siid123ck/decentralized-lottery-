// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/vrf/mocks/VRFCoordinatorV2Mock.sol";

contract VRFCoordinatorMock is VRFCoordinatorV2Mock {
    constructor(uint96 _baseFee, uint96 _gasPriceLink) 
        VRFCoordinatorV2Mock(_baseFee, _gasPriceLink) {}
}
