pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


struct File {
  address user;
  string md5;
  string url;
}

contract UniqueCreator is ERC721 {

    File[] public files;
    mapping(string=> bool) _fileMd5Exist;


    constructor() ERC721("UniqueCreator", "UNIQUECREATOR") {
    }


    function totalSupply() public view returns(uint) {
      return files.length;
    }

    function mint(string memory _md5, string memory _url) public {
      require(!_fileMd5Exist[_md5], 'file already exist.');
      files.push(File(msg.sender, _md5, _url));
      uint _id = files.length;
      _mint(msg.sender, _id);
      _fileMd5Exist[_md5] = true;
    }
}



