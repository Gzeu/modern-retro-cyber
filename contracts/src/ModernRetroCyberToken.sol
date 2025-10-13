// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title ModernRetroCyberToken (MRC)
 * @dev Advanced gaming token with built-in mechanics for Web3 gaming
 * @author Modern Retro Cyber Team
 */
contract ModernRetroCyberToken is ERC20, ERC20Permit, ERC20Burnable, Ownable, ReentrancyGuard, Pausable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 ether; // 1 billion tokens
    uint256 public constant INITIAL_SUPPLY = 100_000_000 ether; // 100 million tokens
    
    // Gaming mechanics
    mapping(address => uint256) public playerLevel;
    mapping(address => uint256) public totalMined;
    mapping(address => uint256) public lastMiningTime;
    mapping(address => bool) public isGameActive;
    
    // Mining rewards configuration
    uint256 public baseMiningRate = 1 ether; // 1 MRC per mine
    uint256 public levelMultiplier = 150; // 1.5x per level (150/100)
    uint256 public miningCooldown = 1 seconds;
    
    // Events
    event TokensMined(address indexed miner, uint256 amount, uint256 newLevel);
    event LevelUp(address indexed player, uint256 newLevel);
    event GameStatusChanged(address indexed player, bool isActive);
    event MiningRateUpdated(uint256 newRate);
    
    error MiningCooldownActive();
    error GameNotActive();
    error MaxSupplyExceeded();
    error InvalidAmount();
    error InvalidAddress();
    
    modifier onlyValidAddress(address _addr) {
        if (_addr == address(0)) revert InvalidAddress();
        _;
    }
    
    modifier onlyActiveGame(address _player) {
        if (!isGameActive[_player]) revert GameNotActive();
        _;
    }
    
    modifier respectsCooldown(address _player) {
        if (block.timestamp < lastMiningTime[_player] + miningCooldown) {
            revert MiningCooldownActive();
        }
        _;
    }
    
    constructor() 
        ERC20("ModernRetroCyberToken", "MRC")
        ERC20Permit("ModernRetroCyberToken")
        Ownable(msg.sender)
    {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
    /**
     * @dev Mine tokens through gameplay
     * @param _amount Base amount to mine (will be multiplied by level)
     */
    function mineTokens(uint256 _amount) 
        external 
        whenNotPaused
        nonReentrant
        onlyActiveGame(msg.sender)
        respectsCooldown(msg.sender)
    {
        if (_amount == 0) revert InvalidAmount();
        
        uint256 currentLevel = playerLevel[msg.sender];
        if (currentLevel == 0) {
            playerLevel[msg.sender] = 1;
            currentLevel = 1;
        }
        
        // Calculate mining reward based on level
        uint256 levelBonus = (currentLevel * levelMultiplier) / 100;
        uint256 miningReward = (_amount * baseMiningRate * levelBonus) / 100;
        
        // Check max supply
        if (totalSupply() + miningReward > MAX_SUPPLY) {
            revert MaxSupplyExceeded();
        }
        
        // Update mining stats
        totalMined[msg.sender] += miningReward;
        lastMiningTime[msg.sender] = block.timestamp;
        
        // Level up logic (every 1000 tokens mined)
        uint256 newLevel = (totalMined[msg.sender] / (1000 ether)) + 1;
        if (newLevel > currentLevel) {
            playerLevel[msg.sender] = newLevel;
            emit LevelUp(msg.sender, newLevel);
        }
        
        // Mint tokens
        _mint(msg.sender, miningReward);
        
        emit TokensMined(msg.sender, miningReward, playerLevel[msg.sender]);
    }
    
    /**
     * @dev Activate/deactivate mining for a player
     * @param _active True to activate, false to deactivate
     */
    function setGameStatus(bool _active) external {
        isGameActive[msg.sender] = _active;
        emit GameStatusChanged(msg.sender, _active);
    }
    
    /**
     * @dev Get player's mining statistics
     * @param _player Player address
     * @return level Player's current level
     * @return mined Total tokens mined
     * @return lastMining Timestamp of last mining action
     * @return active Whether mining is active
     * @return canMine Whether player can mine now
     */
    function getPlayerStats(address _player) 
        external 
        view 
        onlyValidAddress(_player)
        returns (
            uint256 level,
            uint256 mined,
            uint256 lastMining,
            bool active,
            bool canMine
        ) 
    {
        level = playerLevel[_player] == 0 ? 1 : playerLevel[_player];
        mined = totalMined[_player];
        lastMining = lastMiningTime[_player];
        active = isGameActive[_player];
        canMine = active && (block.timestamp >= lastMining + miningCooldown);
    }
    
    /**
     * @dev Calculate mining reward for a given amount and player
     * @param _player Player address
     * @param _baseAmount Base mining amount
     * @return Expected mining reward
     */
    function calculateMiningReward(address _player, uint256 _baseAmount) 
        external 
        view 
        onlyValidAddress(_player)
        returns (uint256) 
    {
        uint256 level = playerLevel[_player] == 0 ? 1 : playerLevel[_player];
        uint256 levelBonus = (level * levelMultiplier) / 100;
        return (_baseAmount * baseMiningRate * levelBonus) / 100;
    }
    
    // Owner functions
    
    /**
     * @dev Update base mining rate (only owner)
     * @param _newRate New base mining rate
     */
    function updateMiningRate(uint256 _newRate) external onlyOwner {
        if (_newRate == 0) revert InvalidAmount();
        baseMiningRate = _newRate;
        emit MiningRateUpdated(_newRate);
    }
    
    /**
     * @dev Update level multiplier (only owner)
     * @param _newMultiplier New level multiplier (basis points)
     */
    function updateLevelMultiplier(uint256 _newMultiplier) external onlyOwner {
        if (_newMultiplier < 100) revert InvalidAmount(); // Minimum 1x
        levelMultiplier = _newMultiplier;
    }
    
    /**
     * @dev Update mining cooldown (only owner)
     * @param _newCooldown New cooldown in seconds
     */
    function updateMiningCooldown(uint256 _newCooldown) external onlyOwner {
        miningCooldown = _newCooldown;
    }
    
    /**
     * @dev Emergency mint (only owner, for initial distribution)
     * @param _to Recipient address
     * @param _amount Amount to mint
     */
    function emergencyMint(address _to, uint256 _amount) 
        external 
        onlyOwner 
        onlyValidAddress(_to)
    {
        if (totalSupply() + _amount > MAX_SUPPLY) {
            revert MaxSupplyExceeded();
        }
        _mint(_to, _amount);
    }
    
    /**
     * @dev Pause contract (only owner)
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause contract (only owner)
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    // View functions for frontend integration
    
    /**
     * @dev Get total players count
     * @return Total number of players who have mined
     */
    function getTotalPlayers() external view returns (uint256) {
        // This is a simplified version - in production, you'd track this properly
        return totalSupply() > INITIAL_SUPPLY ? (totalSupply() - INITIAL_SUPPLY) / (1000 ether) : 0;
    }
    
    /**
     * @dev Check if contract is ready for mining
     * @return True if contract is not paused and has supply available
     */
    function isMiningAvailable() external view returns (bool) {
        return !paused() && totalSupply() < MAX_SUPPLY;
    }
    
    // Override required by Solidity
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20)
        whenNotPaused
    {
        super._update(from, to, value);
    }
}
