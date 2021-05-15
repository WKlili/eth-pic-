const UniqueCreator = artifacts.require("UniqueCreator");

module.exports = function(deployer) {
  deployer.deploy(UniqueCreator);
  
};
