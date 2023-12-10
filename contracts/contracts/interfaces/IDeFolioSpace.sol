// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDeFolioSpace {
  function publishPost(
    string memory _slug,
    string memory _ipfsCID,
    uint256 _scheduledToTime
  ) external;

  function updatePost(
    uint256 _postId,
    string memory _ipfsCID
  ) external;

  function getPost(
    uint256 _postId
  ) external view returns (uint256, string memory, string memory, bool);

  function getPostBySlug(
    string memory _slug
  ) external view returns (uint256, string memory, bool);

  function archivePost(uint256 _postId) external;

  function setScheduler(address _scheduler) external;
}
