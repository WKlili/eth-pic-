const { assert } = require('chai');

const UniqueCreator = artifacts.require('./UniqueCreator.sol');

require('chai')
  .use(require('chai-as-promised'))
  .should();


contract('UniqueCreator', (accounts) => {
  let contract;

  before(async () => {
    contract = await UniqueCreator.deployed()
  });

  describe('deployment', async () => {

  });

    describe('minting', async() => {
    
        it('creates a new token', async() =>{
          const result = await contract.mint('md5', 'http://url...');
          const totalSupply = await contract.totalSupply();
    
          assert.equal(totalSupply, 1);
          const event = result.logs[0].args;
          assert.equal(event.tokenId.toNumber(), 1, 'id is correct');
          assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct');
          assert.equal(event.to, accounts[0], 'to is correct');
     
          // FAILURE: cannot mint same color twice
          await contract.mint('md5', 'http://url...').should.be.rejected;
        })
    })

    describe('indexing', async()=> {
        it('lists colors', async() =>{
          await contract.mint('md52', 'http://url...');
          await contract.mint('md53', 'http://url...');
          await contract.mint('md54', 'http://url...');
        
          const totalSupply = await contract.totalSupply();
            // let color
            let result = []

            for (var i = 0; i < totalSupply; i++){
              const file = await contract.files(i);
              result.push(file);
            }
          console.log({result}); //ccc-log

          // let expected = ['#EC085E', '#5386E4', '#FFFFFF', '#000000'];
          // assert.equal(result.join(','), expected.join(','));
        })
    })


})
