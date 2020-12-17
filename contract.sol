pragma solidity ^0.6.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";

/// @title Interface for contracts conforming to ERC-721: Non-Fungible Tokens
/// @dev Ref: https://github.com/ethereum/EIPs/issues/721
abstract contract ERC721 {
    
    // Required methods
    function totalSupply() public virtual view returns (uint256);
    function balanceOf(address _owner) public virtual view returns (uint256 balance);
    function ownerOf(uint256 _tokenId) external virtual view returns (address owner);
    function approve(address _to, uint256 _tokenId) external virtual;
    function transfer(address _to, uint256 _tokenId) external virtual payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external virtual payable;

    // Events
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);

}

/**
* @title Ownable
* @dev The Ownable contract has an owner address, and provides basic authorization control
* functions, this simplifies the implementation of "user permissions".
*/
contract Ownable {
  
  address private _owner;

  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );

  /**
  * @dev The Ownable constructor sets the original `owner` of the contract to the sender
  * account.
  */
  constructor() internal {
    _owner = msg.sender;
    emit OwnershipTransferred(address(0), _owner);
  }

  /**
  * @return the address of the owner.
  */
  function owner() public view returns(address) {
    return _owner;
  }

  /**
  * @dev Throws if called by any account other than the owner.
  */
  modifier onlyOwner() {
    require(isOwner());
    _;
  }

  /**
  * @return true if `msg.sender` is the owner of the contract.
  */
  function isOwner() public view returns(bool) {
    return msg.sender == _owner;
  }

  /**
  * @dev Allows the current owner to relinquish control of the contract.
  * @notice Renouncing to ownership will leave the contract without an owner.
  * It will not be possible to call the functions with the `onlyOwner`
  * modifier anymore.
  */
  function renounceOwnership() public onlyOwner {
    emit OwnershipTransferred(_owner, address(0));
    _owner = address(0);
  }

  /**
  * @dev Allows the current owner to transfer control of the contract to a newOwner.
  * @param newOwner The address to transfer ownership to.
  */
  function transferOwnership(address newOwner) public onlyOwner {
    _transferOwnership(newOwner);
  }

  /**
  * @dev Transfers control of the contract to a newOwner.
  * @param newOwner The address to transfer ownership to.
  */
  function _transferOwnership(address newOwner) internal {
    require(newOwner != address(0));
    emit OwnershipTransferred(_owner, newOwner);
    _owner = newOwner;
  }
}

/**
* @title PlanetFactory
* @dev The PlanetFactory contains all common structs, events and base variables.
*/
contract PlanetFactory is Ownable {

  using SafeMath for uint256;
  using SafeMath for uint32;
  using SafeMath for uint16;
    
  /// @dev The NewPlanet event is fired whenever a new planet "pops" in the universe. This obviously
  ///  includes any time a planet is created through the fusion method, but it is also called
  ///  when a new uni0 planet is created.
  event NewPlanet(address owner, uint planetId, uint planet1ID, uint planet2ID, uint univers, uint dna);
  
  event Transfer(address from, address to, uint256 tokenId);
  
  uint fusionTime = 4 days;

  uint dnaModulus = 100;

/// @dev The main Planet struct. All planets in the universe are represented by a copy of this structure.    
  struct Planet {
    
    // Planet's characteristics is the DNA of the planet. Similar to a genetic code packed into 256-bits. 
    uint256 dna;

    // Planet's date of creation in the universe. 
    uint64 creationTime;

    // Planet's time to be able to fusion.
    uint32 readyTime;
    
    // Planet's state fusion. A non zero value here is how we know that a planet is being fusionned.
    uint32 fusionState;

    // The ID of the planet ID before the fusion to create a new planet. Set to 0 for uni0 planets.    
    uint32 planet1Id;
    uint32 planet2Id;
    
    // Univers : 0 is the first univers created with a limited number of planets
    uint32 univers;
  }
  
  /******* STORAGE *******/
  
  /// @dev An array containing the Planet struct for all planets in the universe. The ID
  /// of each planet is an index into this array.
  Planet[] public planets;

  /// @dev A mapping from planets IDs to the address that owns them. All planets have
  /// valid owner address, even uni0 planets are created with a non-zero owner.  
  mapping (uint => address) public planetToOwner;
  
  // @dev A mapping from owner address to count of tokens that address owns.
  // Used internally inside balanceOf() to resolve ownership count.  
  mapping (address => uint) ownerPlanetCount;

  // @dev A mapping from owner address to count tokens and the ownership of possible constellation : how to do it ? 
  mapping (address => uint) ownerConstellationCount;
  
  /// @dev The address of the ClockAuction contract that handles sales of stars. This
  ///  same contract handles both peer-to-peer sales as well as the uni0 sales which are
  ///  initiated every 15 minutes.
  /// SaleClockAuction public saleAuction;
 
  /// @dev The address of a custom ClockAuction subclassed contract that handles cross-fusion
  ///  auctions. Needs to be separate from saleAuction because the actions taken on success
  ///  after a sales and cross-fusion auction are quite different.
  /// SiringClockAuction public siringAuction;
    

  // @dev Asigns planet's ownership to an address
  function _transfer(address _from, address _to, uint256 _tokenId) internal {
      
    ownerPlanetCount[_to] = ownerPlanetCount[_to].add(1);
    // Transfer the ownership
    planetToOwner[_tokenId] = _to;
    
    // Only when not using 0x0 address
    if (_from != address(0)) {
    ownerPlanetCount[msg.sender] = ownerPlanetCount[msg.sender].sub(1);
    }
    
    // Emit even Transfer
    emit Transfer(_from, _to, _tokenId);
  }


    
  function _createPlanet(uint _dna, uint32 _planet1ID, uint32 _planet2ID, uint32 _univers, address _owner) internal returns (uint){
    uint32 time = uint32(now);
    planets.push(Planet(_dna, time, time, 0, _planet1ID, _planet2ID, _univers));
    uint256 planetId = planets.length;
    
    planetToOwner[planetId] = msg.sender;
    ownerPlanetCount[msg.sender] = ownerPlanetCount[msg.sender].add(1);
    
    // Emit event NewPlanet
    emit NewPlanet(_owner, planetId, _planet1ID, _planet2ID, _univers, _dna);

    //_transfer(address(0), _owner, planetId);   // Verify _from = 0 if it works.
    
    return planetId;
  }
  
  
  function _generateRandomDna(string memory _str) private view returns (uint) {
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    return rand % dnaModulus;
  }

  function createRandomPlanet(string memory _name, uint32 _planet1ID, uint32 _planet2ID, uint32 _univers, address _owner) public {
    //require(ownerPlanetCount[msg.sender] == 0); Reinstall this line during the game
    uint256 randDna = _generateRandomDna(_name);
    
    // Check about the modulus
    randDna = randDna - randDna % dnaModulus;
    
    _createPlanet(randDna, _planet1ID, _planet2ID, _univers, _owner);
  }
 
    
}

/** @title FusionScienceInterface
* @dev The contract FusionScienceInterface is kept appart in an other smart contract and handles how 2 planets fusion. Make it abstract. Test for now
*/
abstract contract FusionInterface {
    /// @dev simply a boolean to indicate this is the contract we expect to be
    //function isFusion() public virtual pure returns (bool);

    /// @dev given dna of planet 1 & 2, return a combination with incertainty included
    /// @param dna1 genes of planet 1 
    /// @param dna2 genes of planet 2
    /// @return the dna that are supposed to be passed down to the new planet
    function fusionPlanets(uint256 dna1, uint256 dna2, uint256 targetBlock) public virtual returns (uint256) {
        return dna1;
    }
}


/** @title PlanetOwnership
* @dev The contract PlanetOwnership contains all ownership methods, and ERC-721 implementation.
*/
contract PlanetOwnership is PlanetFactory, ERC721 {

    using SafeMath for uint256;

    string public constant name = "Planetorium";
    string public constant symbol = "PL";
    
    mapping (uint => address) planetsApprovals;
    
    modifier onlyOwnerOf(uint _planetId) {
    require(msg.sender == planetToOwner[_planetId]);
    _;
  }

    function _approve(address _approved, uint256 _tokenId) internal {
        planetsApprovals[_tokenId] = _approved;
    }
    
  function totalSupply() public override view returns (uint256) {
      return planets.length;
  }
  
  
  function balanceOf(address _owner) public override view returns (uint256 balance) {
      return ownerPlanetCount[_owner];
  }
  
  
  function ownerOf(uint256 _tokenId) external override view returns (address owner) {
      return planetToOwner[_tokenId];
  }
  
  
  function approve(address _to, uint256 _tokenId) external override onlyOwnerOf(_tokenId) {
      _approve(_to, _tokenId);
  }
  
  
  function transfer(address _to, uint256 _tokenId) external override payable onlyOwnerOf(_tokenId) {
      require (_to != address(0));
      require(_to != address(this));
      
      _transfer(msg.sender, _to, _tokenId);
  }
  
  
  function transferFrom(address _from, address _to, uint256 _tokenId) external override payable {
      require (_to != address(0));
      require (_to != address(this));
      require (planetsApprovals[_tokenId] == msg.sender);
      require (planetToOwner[_tokenId] == _from);
      
      _transfer(_from, _to, _tokenId);
  }
  
  // Return the list of planetID from an address
  function getPlanetsByOwner(address _owner) external view returns(uint[] memory) {
    uint[] memory result = new uint[](ownerPlanetCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < planets.length; i++) {
      if (planetToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }
 
}    


/** @title planetFusion
* @dev The contract planetFusion contains Planets fusionning methods, time before fusion, and birth/destruction of planets.
*/
contract planetFusion is PlanetOwnership{
    
    uint256 public fusionFee = 0.0001 ether;
    
    // @dev Event Fusion fires when two planets successfully begin a fusion. 
    event Fusion(address owner, uint256 planet1ID, uint256 planet2ID, uint256 time);
    
    /// @dev The address of the fusioning contract that is used to implement the fusion
    FusionInterface fusionInterface;
    
    function setFusionContractAddress(address _address) external onlyOwner {
        fusionInterface = FusionInterface(_address);
  }
     
    // @dev Update the fusion fee. Only possible by the owner.
    function setFusionFee(uint256 val) external onlyOwner {
        fusionFee = val;
    }
    
    // @dev Checks if both planets are owned by the same owner to be able to fusion
    function _isFusionOwnership(uint256 planet1ID, uint256 planet2ID) internal view returns (bool) {
        return (planetToOwner[planet1ID] == planetToOwner[planet2ID]);
    }
    
    // @dev Checks if a planet is available to fusion.
    function _isFusionnable(Planet storage _planet) internal view returns (bool) {
        return (_planet.readyTime <= now);
  }
    
    // @dev Set the cooldownTime for a planet
    function _triggerFusionCooldown(Planet storage _planet) internal {
        _planet.readyTime = uint32(now + fusionTime);
  }
    
    // Checks that a given planet is able to fusion.
    // @param _planetId is the id of the planet
    function isReadyToFusion(uint256 _planetId) public view returns (bool) {
        require(_planetId > 0);
        Planet storage planetReadyFusion = planets[_planetId];
        return _isFusionnable(planetReadyFusion);
    }
    
    /// @dev Checks whether a planet is currently being fusionned
    /// @param _planetId reference the id of the kitten, any user can inquire about it
    function isFusioning(uint256 _planetId) public view returns (bool)
    {
        require(_planetId > 0);
        return planets[_planetId].fusionState != 0;
    }
    
    // @dev Handle all specifix cases where a fusion is not possible
    function _isValidFusion(Planet storage _planet1, uint256 _planet1_id, Planet storage _planet2, uint256 _planet2_id) private view returns (bool){
        
        // Can't fusion with itself
        if (_planet1_id == _planet2_id) {
            return false;
        }
        
        // Add the mouvement restriction here 
        //if ( (_planet1.positionx*2 + _planet2.positionx*2) - (_planet1.positiony*2 + _planet2.positiony*2) <= 0 ) {
        //    return true;
        //}
        
        return true;
    }
    
    
    /// @notice Checks to see if two planets can fusion, including checks for
    ///  ownership and time for fusion.
    function canFusion(uint256 _planet1Id, uint256 _planet2Id) external view returns (bool) {
        
        require (_planet1Id > 0);
        require (_planet2Id > 0);
        
        Planet storage planet1 = planets[_planet1Id];
        Planet storage planet2 = planets[_planet2Id];
        
        return _isValidFusion(planet1, _planet1Id, planet2, _planet2Id) && _isFusionnable(planet1) && _isFusionnable(planet2) && _isFusionOwnership(_planet1Id,_planet2Id);
    }
    
}




/** @title PlanetAuction
* @dev The contract PlanetAuction contains auctions for sales of planets.
*/
contract PlanetAuction {}

/** @title PlanetCreation
* @dev The contract PlanetCreation contains all function related to planet's creation
*/contract PlanetCreation {}






// Implement the position + random position generator at birth + ability to fusion only when two planets are closeby
// 



// - fusion 2 planets + adn mix called
// - know if planets are available to fusion : time / previous fusion / ownership 
// - birth of a new planet
// - fees to fusion 
// - time before 
// - fusionCoolDown
// - rules to be able to fusion
// 



