// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import './interfaces/IDeFolioSpace.sol';
import './interfaces/IDeFolioScheduler.sol';

contract DeFolioSpace is IDeFolioSpace, ConfirmedOwner {

    uint256 public totalPosts;
    address public scheduler;

    struct Post {
        uint256 postId;
        uint256 date;
        string ipfsCID;
        string slug;
        bool archived;
    }

    mapping(uint256 => Post) public posts;
    mapping(string => uint256) public slugToPostId;
    mapping(bytes32 => string) public requestIdToSlug;

    modifier onlyOwnerOrScheduler() {
        require(
            msg.sender == owner() || msg.sender == scheduler,
            "Not owner or scheduler"
        );
        _;
    }

    constructor(address _owner, address _scheduler) ConfirmedOwner(_owner) {
        totalPosts = 0;
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
            false
        );
        slugToPostId[_slug] = totalPosts;
        if (_scheduledToTime != 0 && scheduler != address(0)) {
            IDeFolioScheduler schedulerContract = IDeFolioScheduler(scheduler);
            schedulerContract.schedulePost(_slug, totalPosts, _scheduledToTime);
        }
    }

    function updatePost(
        uint256 _postId,
        string memory _ipfsCID
    ) external onlyOwnerOrScheduler {
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

    function setScheduler(address _scheduler) external onlyOwner {
        scheduler = _scheduler;
    }
}
