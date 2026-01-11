// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./RWAProperty.sol";

/**
 * @title RWAFactory
 * @notice Factory contract for creating and managing RWA (Real World Asset) tokenized properties
 * @dev Allows users to create new RWA properties by deploying new contract instances
 */
contract RWAFactory is Ownable, ReentrancyGuard {
    // ============================================
    // STATE VARIABLES
    // ============================================

    /// @notice Array of all created property addresses
    address[] public allProperties;

    /// @notice User => deployed property contracts mapping
    mapping(address => address[]) private userProperties;

    // ============================================
    // EVENTS
    // ============================================

    event PropertyLaunched(
        address indexed propertyContract,
        address indexed issuer,
        string assetName,
        string assetType,
        uint256 indexed propertyId
    );

    // ============================================
    // CONSTRUCTOR
    // ============================================

    /**
     * @notice Constructor sets the owner
     * @param _initialOwner Address of the contract owner
     */
    constructor(address _initialOwner) Ownable(_initialOwner) {
        require(_initialOwner != address(0), "Factory: Invalid owner address");
    }

    // ============================================
    // PUBLIC FUNCTIONS
    // ============================================

    /**
     * @notice Create a new RWA property tokenization
     * @param _assetName Name of the asset
     * @param _assetType Type of asset (e.g., "Real Estate", "Art", "Collectibles")
     * @param _description Description of the asset
     * @param _isOwner Whether the caller is the owner of the asset
     * @param _approximatedValue Approximated value of the asset in USD (with decimals)
     * @param _totalSupply Total supply of tokens to mint
     * @param _propertyAddress Physical address of the property (if applicable)
     * @param _squareMeters Square meters of the property (if applicable)
     * @param _uri Metadata URI for the property
     * @return property Address of the newly created property contract
     */
    function launchProperty(
        string calldata _assetName,
        string calldata _assetType,
        string calldata _description,
        bool _isOwner,
        uint256 _approximatedValue,
        uint256 _totalSupply,
        string calldata _propertyAddress,
        uint256 _squareMeters,
        string calldata _uri
    ) external nonReentrant returns (address property) {
        require(bytes(_assetName).length > 0, "Factory: Asset name required");
        require(bytes(_assetType).length > 0, "Factory: Asset type required");
        require(bytes(_description).length > 0, "Factory: Description required");
        require(_approximatedValue > 0, "Factory: Value must be positive");
        require(_totalSupply > 0, "Factory: Supply must be positive");
        require(bytes(_uri).length > 0, "Factory: URI required");

        // Deploy new RWAProperty contract with constructor parameters
        property = address(new RWAProperty(
            msg.sender,
            _assetName,
            _assetType,
            _description,
            _isOwner,
            _approximatedValue,
            _totalSupply,
            _propertyAddress,
            _squareMeters,
            _uri
        ));

        // Global registry
        allProperties.push(property);

        // User registry
        userProperties[msg.sender].push(property);

        emit PropertyLaunched(
            property,
            msg.sender,
            _assetName,
            _assetType,
            allProperties.length - 1
        );

        return property;
    }

    // ============================================
    // VIEW FUNCTIONS
    // ============================================

    /**
     * @notice Get all property addresses
     * @return Array of all property addresses
     */
    function getAllProperties() external view returns (address[] memory) {
        return allProperties;
    }

    /**
     * @notice Get the total number of properties created
     * @return Number of properties
     */
    function getPropertyCount() external view returns (uint256) {
        return allProperties.length;
    }

    /**
     * @notice Get property address by index
     * @param _index Index of the property
     * @return Property address at the given index
     */
    function getProperty(uint256 _index) external view returns (address) {
        require(_index < allProperties.length, "Factory: Index out of bounds");
        return allProperties[_index];
    }

    /**
     * @notice Get property information for a specific property
     * @param _propertyAddress Address of the property
     * @return assetName Name of the asset
     * @return assetType Type of the asset
     * @return description Description of the asset
     * @return isOwner Whether the issuer is the owner
     * @return approximatedValue Approximated value in USD
     * @return totalSupply Total token supply
     * @return propertyAddress Physical address of the property
     * @return squareMeters Square meters of the property
     */
    function getPropertyInfo(address _propertyAddress)
        external
        view
        returns (
            string memory assetName,
            string memory assetType,
            string memory description,
            bool isOwner,
            uint256 approximatedValue,
            uint256 totalSupply,
            string memory propertyAddress,
            uint256 squareMeters
        )
    {
        require(_propertyAddress != address(0), "Factory: Invalid property address");
        return RWAProperty(_propertyAddress).getAllDetails();
    }

    /**
     * @notice Check if an address is a valid property created by this factory
     * @param _propertyAddress Address to check
     * @return Whether the address is a valid property
     */
    function isValidProperty(address _propertyAddress) external view returns (bool) {
        for (uint256 i = 0; i < allProperties.length; i++) {
            if (allProperties[i] == _propertyAddress) {
                return true;
            }
        }
        return false;
    }

    // ============================================
    // USER GETTERS
    // ============================================

    /**
     * @notice Get all properties created by a specific user
     * @param _user Address of the user
     * @return Array of property addresses created by the user
     */
    function getUserProperties(address _user)
        external
        view
        returns (address[] memory)
    {
        return userProperties[_user];
    }

    /**
     * @notice Get the number of properties created by a specific user
     * @param _user Address of the user
     * @return Number of properties created by the user
     */
    function getUserPropertyCount(address _user)
        external
        view
        returns (uint256)
    {
        return userProperties[_user].length;
    }

    /**
     * @notice Get a specific property by index for a user
     * @param _user Address of the user
     * @param _index Index of the property
     * @return Property address at the given index for the user
     */
    function getUserPropertyByIndex(address _user, uint256 _index)
        external
        view
        returns (address)
    {
        require(_index < userProperties[_user].length, "Factory: Index out of bounds");
        return userProperties[_user][_index];
    }
}
