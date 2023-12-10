// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDeFolioScheduler {
  function schedulePost(
    string memory _postSlug,
    uint256 _postId,
    uint256 _scheduledToTime
  ) external;
}
