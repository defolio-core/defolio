// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "./interfaces/IDeFolioSpace.sol";

contract DeFolioScheduler is
    AutomationCompatibleInterface,
    ChainlinkClient
{
    using Chainlink for Chainlink.Request;
    using Strings for uint256;


    struct PostSchedule {
      address spaceAddress;
      string postSlug;
      uint256 postId;
      uint256 scheduledToTime;
      bool published;
      uint attempts;
    }

    uint256 public totalPostSchedules;
    mapping(uint256 => PostSchedule) public postSchedules;

    // Chainlink Config
    address private chainlinkTokenAddr = 0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846;
    address private chainlinkOracleAddr = 0x022EEA14A6010167ca026B32576D6686dD7e85d2;
    string private defolioApiBaseUrl;
    bytes32 private jobId = "7d80a6386ef543a3abb52817f6707e3b";
    uint256 private fee = (1 * LINK_DIVISIBILITY) / 10;

    // Map Chainlink Request ID to PostSchedule id
    mapping(bytes32 => uint256) public requestIdToPostScheduleId;

    constructor(string memory _defolioApiBaseUrl) {
        defolioApiBaseUrl = _defolioApiBaseUrl;
        // Chainlink Config
        setChainlinkToken(chainlinkTokenAddr);
        setChainlinkOracle(chainlinkOracleAddr);
    }

    function schedulePost(
      string memory _postSlug,
      uint256 _postId,
      uint256 _scheduledToTime
    ) external {
      totalPostSchedules++;
      postSchedules[totalPostSchedules] = PostSchedule(
          msg.sender, // The space contract that is calling (We should check if the interface is implemented)
          _postSlug,
          _postId,
          _scheduledToTime,
          false,
          0
      );
    }

    function _isReadyToBePublished(PostSchedule memory _postSchedule) internal view returns (bool) {
      bool onReleaseTime = _postSchedule.scheduledToTime <= block.timestamp;
      bool maxAttemptsReached = _postSchedule.attempts >= 3;
      bool notPublished = !_postSchedule.published;
      return onReleaseTime && notPublished && !maxAttemptsReached;
    }


    function checkPostsReadyToBePublished() public view returns (bool) {
        for (uint256 i = 1; i <= totalPostSchedules; i++) {
            PostSchedule memory postSchedule = postSchedules[i];
            if (_isReadyToBePublished(postSchedule)) {
                return true;
            }
        }
        return false;
    }

    // Chainlink API Fetch Functions

    /**
     * Create a Chainlink request to retrieve the latest cid from a post
     * 
     * Note: the API only will return the CID if the current time is greater than the scheduled time
     */
    function fetchPostCid(uint256 postScheduleId) public returns (bytes32) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillFetchPostCid.selector);

        PostSchedule memory postSchedule = postSchedules[postScheduleId];
        // Set the URL to perform the GET request on
        string memory spaceAddress = Strings.toHexString(uint256(uint160(postSchedule.spaceAddress)));
        req.add('get', string.concat(defolioApiBaseUrl, '/chainlink/', spaceAddress, '/', postSchedule.postSlug));
        req.add('path', 'cid');

        // Sends the request
        bytes32 requestId = sendChainlinkRequest(req, fee);
        requestIdToPostScheduleId[requestId] = postScheduleId;
        return requestId;
    }

    /**
     * Receive the response in the form of string and update post cid on DeFolioSpace contract
     */
    function fulfillFetchPostCid(bytes32 _requestId, string calldata _cid) public recordChainlinkFulfillment(_requestId) {
        PostSchedule memory postSchedule = postSchedules[requestIdToPostScheduleId[_requestId]];
        IDeFolioSpace space = IDeFolioSpace(postSchedule.spaceAddress);
        space.updatePost(postSchedule.postId, _cid);
    }


    // Chainlink Upkeep Functions

    function checkUpkeep(
        bytes calldata checkData
    ) external view override returns (bool upkeepNeeded, bytes memory performData) {
        return (checkPostsReadyToBePublished(), checkData);
    }

    function performUpkeep(bytes calldata performData) external override {
        for (uint256 i = 1; i <= totalPostSchedules; i++) {
            if (_isReadyToBePublished(postSchedules[i])) {
                fetchPostCid(i);
                postSchedules[i].attempts++;
            }
        }
    }
}
