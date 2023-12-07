// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Strings.sol";

contract DeFolioSpace {
    using Strings for uint256;

    address public owner;
    uint256 public totalPosts;

    struct Post {
        uint256 postId;
        uint256 date;
        string ipfsCID;
        string slug;
        bool archived;
    }

    mapping(uint256 => Post) public posts;
    mapping(string => uint256) public slugToPostId;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor(address _owner) {
        owner = _owner;
        totalPosts = 0;
    }

    function publishPost(string memory _slug, string memory _ipfsCID) external onlyOwner {
        totalPosts++;
        posts[totalPosts] = Post(totalPosts, block.timestamp, _ipfsCID, _slug, false);
        slugToPostId[_slug] = totalPosts;
    }

    function updatePost(uint256 _postId, string memory _ipfsCID) external onlyOwner {
        require(_postId <= totalPosts && _postId > 0, "Invalid post ID");
        require(!posts[_postId].archived, "Cannot update archived post");

        posts[_postId].ipfsCID = _ipfsCID;
    }

    function archivePost(uint256 _postId) external onlyOwner {
        require(_postId <= totalPosts && _postId > 0, "Invalid post ID");

        posts[_postId].archived = true;
    }

    function getPost(uint256 _postId) external view returns (uint256, string memory, string memory, bool) {
        require(_postId <= totalPosts && _postId > 0, "Invalid post ID");

        return (
            posts[_postId].date,
            posts[_postId].ipfsCID,
            posts[_postId].slug,
            posts[_postId].archived
        );
    }

    function getPostBySlug(string memory _slug) external view returns (uint256, string memory, bool) {
        require(slugToPostId[_slug] > 0, "Slug does not exist");

        uint256 postId = slugToPostId[_slug];
        return (
            posts[postId].date,
            posts[postId].ipfsCID,
            posts[postId].archived
        );
    }
}
