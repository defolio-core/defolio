// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeFolioSpace.sol";

contract DeFolioSpaceFactory {
    address public defaultScheduler;
    address[] public deployedContracts;

    event ContractDeployed(address indexed newContractAddress, address indexed ownerAddress);

    constructor(address _defaultScheduler) {
        defaultScheduler = _defaultScheduler;
    }

    function deployContract(address owner) public {
        address newContract = address(new DeFolioSpace(owner, defaultScheduler));
        deployedContracts.push(newContract);
        emit ContractDeployed(newContract, msg.sender);
    }

    function getDeployedContracts() public view returns (address[] memory) {
        return deployedContracts;
    }
}
