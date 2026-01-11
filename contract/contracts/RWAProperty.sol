// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RWAProperty
 * @notice ERC1155 token contract representing a tokenized Real World Asset
 * @dev Each property is a unique contract instance with its own metadata and token supply
 */
contract RWAProperty is ERC1155, Ownable {
    // ============================================
    // STATE VARIABLES
    // ============================================

    /// @notice Token ID for this property (always 1 for single property per contract)
    uint256 public constant PROPERTY_TOKEN_ID = 1;

    /// @notice Asset metadata
    string public assetName;
    string public assetType;
    string public description;
    bool public isOwner;
    uint256 public approximatedValue;
    uint256 public totalSupply;
    string public propertyAddress_;
    uint256 public squareMeters;

    // ============================================
    // CONSTRUCTOR
    // ============================================

    /**
     * @notice Constructor initializes the property with all metadata
     * @param _issuer Address that will own this property contract
     * @param _assetName Name of the asset
     * @param _assetType Type of asset (e.g., "Real Estate", "Art", "Collectibles")
     * @param _description Description of the asset
     * @param _isOwner Whether the issuer is the owner of the asset
     * @param _approximatedValue Approximated value of the asset in USD (with decimals)
     * @param _totalSupply Total supply of tokens to mint
     * @param _propertyAddress Physical address of the property (if applicable)
     * @param _squareMeters Square meters of the property (if applicable)
     * @param _uri Metadata URI for the property
     */
    constructor(
        address _issuer,
        string memory _assetName,
        string memory _assetType,
        string memory _description,
        bool _isOwner,
        uint256 _approximatedValue,
        uint256 _totalSupply,
        string memory _propertyAddress,
        uint256 _squareMeters,
        string memory _uri
    ) ERC1155(_uri) Ownable(_issuer) {
        require(_issuer != address(0), "RWAProperty: Invalid issuer address");
        require(bytes(_assetName).length > 0, "RWAProperty: Asset name required");
        require(bytes(_assetType).length > 0, "RWAProperty: Asset type required");
        require(bytes(_description).length > 0, "RWAProperty: Description required");
        require(_approximatedValue > 0, "RWAProperty: Value must be positive");
        require(_totalSupply > 0, "RWAProperty: Supply must be positive");
        require(bytes(_uri).length > 0, "RWAProperty: URI required");

        assetName = _assetName;
        assetType = _assetType;
        description = _description;
        isOwner = _isOwner;
        approximatedValue = _approximatedValue;
        totalSupply = _totalSupply;
        propertyAddress_ = _propertyAddress;
        squareMeters = _squareMeters;

        // Mint all tokens to the issuer
        _mint(_issuer, PROPERTY_TOKEN_ID, _totalSupply, "");
    }

    // ============================================
    // VIEW FUNCTIONS
    // ============================================

    /**
     * @notice Get all property details
     * @return assetName Name of the asset
     * @return assetType Type of the asset
     * @return description Description of the asset
     * @return isOwner Whether the issuer is the owner
     * @return approximatedValue Approximated value in USD
     * @return totalSupply Total token supply
     * @return propertyAddress Physical address of the property
     * @return squareMeters Square meters of the property
     */
    function getAllDetails()
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            bool,
            uint256,
            uint256,
            string memory,
            uint256
        )
    {
        return (
            assetName,
            assetType,
            description,
            isOwner,
            approximatedValue,
            totalSupply,
            propertyAddress_,
            squareMeters
        );
    }
}
