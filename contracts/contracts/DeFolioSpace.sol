// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "hardhat/console.sol";

contract DeFolioSpace is AutomationCompatibleInterface, ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;
    using Strings for uint256;

    // Chainlink Config
    address private chainlinkTokenAddr = 0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846;
    address private chainlinkOracleAddr = 0x022EEA14A6010167ca026B32576D6686dD7e85d2;
    string private defolioApiBaseUrl = "https://defolio.xyz/api";
    bytes32 private jobId = "7d80a6386ef543a3abb52817f6707e3b";
    uint256 private fee = (1 * LINK_DIVISIBILITY) / 10;


    // DeFolio Variables

    uint256 public totalPosts;

    struct Post {
        uint256 postId;
        uint256 date;
        string ipfsCID;
        string slug;
        bool archived;
        uint256 scheduledToTime;
    }

    mapping(uint256 => Post) public posts;
    mapping(string => uint256) public slugToPostId;
    mapping(bytes32 => string) public requestIdToSlug;

    constructor(address _owner) ConfirmedOwner(_owner) {
        totalPosts = 0;
        
        // Chainlink Config
        setChainlinkToken(chainlinkTokenAddr);
        setChainlinkOracle(chainlinkOracleAddr);
    }

    function publishPost(
        string memory _slug,
        string memory _ipfsCID,
        uint256 _scheduledToTime
    ) external onlyOwner {
        totalPosts++;
        posts[totalPosts] = Post(
            totalPosts,
            block.timestamp,
            _ipfsCID,
            _slug,
            false,
            _scheduledToTime
        );
        slugToPostId[_slug] = totalPosts;
    }

    function updatePost(
        uint256 _postId,
        string memory _ipfsCID
    ) external onlyOwner {
        require(_postId <= totalPosts && _postId > 0, "Invalid post ID");
        require(!posts[_postId].archived, "Cannot update archived post");

        posts[_postId].ipfsCID = _ipfsCID;
    }

    function archivePost(uint256 _postId) external onlyOwner {
        require(_postId <= totalPosts && _postId > 0, "Invalid post ID");

        posts[_postId].archived = true;
    }

    function getPost(
        uint256 _postId
    ) external view returns (uint256, string memory, string memory, bool) {
        require(_postId <= totalPosts && _postId > 0, "Invalid post ID");

        return (
            posts[_postId].date,
            posts[_postId].ipfsCID,
            posts[_postId].slug,
            posts[_postId].archived
        );
    }

    function getPostBySlug(
        string memory _slug
    ) external view returns (uint256, string memory, bool) {
        require(slugToPostId[_slug] > 0, "Slug does not exist");

        uint256 postId = slugToPostId[_slug];
        return (
            posts[postId].date,
            posts[postId].ipfsCID,
            posts[postId].archived
        );
    }

    function _isScheduled(Post storage _post) internal view returns (bool) {
        return _post.scheduledToTime <= block.timestamp && !_post.archived && bytes(_post.ipfsCID).length == 0;
    }

    function checkPostsReadyToBePublished() external view returns (bool) {
        for (uint256 i = 1; i <= totalPosts; i++) {
            if (_isScheduled(posts[i])) {
                return true;
            }
        }
        return false;
    }

    /**
     * Create a Chainlink request to retrieve the latest cid from a post
     * 
     * Note: the API only will return the CID if the current time is greater than the scheduled time
     */
    function fetchPostCid(string memory slug) public returns (bytes32) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillFetchPostCid.selector);

        // Set the URL to perform the GET request on
        req.add('get', string.concat(defolioApiBaseUrl, '/posts/', slug, '/cid'));
        req.add('path', 'cid');

        // Sends the request
        bytes32 requestId = sendChainlinkRequest(req, fee);
        requestIdToSlug[requestId] = slug;
        return requestId;
    }

    /**
     * Receive the response in the form of string
     */
    function fulfillFetchPostCid(bytes32 _requestId, string calldata _cid) public recordChainlinkFulfillment(_requestId) {
        string memory slug = requestIdToSlug[_requestId];
        posts[slugToPostId[slug]].ipfsCID = _cid;
    }

    function checkUpkeep(
        bytes calldata checkData
    ) external override returns (bool upkeepNeeded, bytes memory performData) {}

    function performUpkeep(bytes calldata performData) external override {
        for (uint256 i = 1; i <= totalPosts; i++) {
            if (_isScheduled(posts[i])) {
                fetchPostCid(posts[i].slug);
            }
        }
    }
}
