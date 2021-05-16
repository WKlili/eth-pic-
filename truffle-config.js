require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');
var mnemonic =
  'film index metal kingdom where almost matrix talent execute dove humble fire'; // MetaMask的助记词。

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          'https://ropsten.infura.io/v3/b5bf1913970949d7a4c5e465c03b2135'
        );
      },
      network_id: 3
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: '0.8.0',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
