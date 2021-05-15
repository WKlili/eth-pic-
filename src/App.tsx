/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';

import { Personal } from './components/Personal';
import { Public } from './components/Public';
import { Tab } from './components/Tab';
import { Upload } from './components/Upload';
import { UserInfo } from './components/UserInfo';
import UniqueCreator from './abis/UniqueCreator.json';
import { Context } from './context';

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      'Non-Ethereum browser detected. You should consider trying MetaMask'
    );
  }
}

function App() {
  const [account, setAccount] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [files, setFiles] = useState([]);
  const [contract, setContract] = useState(null);

  const loadBlockchainData = useCallback(async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = (UniqueCreator as any).networks[networkId];
    if (networkData) {
      const abi = (UniqueCreator as any).abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      const totalSupply = await contract.methods.totalSupply().call();
      setTotalSupply(totalSupply);
      const result = [];
      for (let i = 0; i < totalSupply; i++) {
        const color = await contract.methods.files(i).call();
        result.push(color);
      }
      setFiles(result);
      setContract(contract);
    } else {
      window.alert('Smart contract not deployed to detected network.');
    }
  }, []);

  useEffect(() => {
    loadWeb3().then(() => {
      loadBlockchainData().then(() => {
        /** ignore */
      });
    });
  }, [loadBlockchainData]);

  const [tabList] = useState([
    {
      name: 'Public',
      content: <Public />
    },
    {
      name: 'Personal',
      content: <Personal />
    },
    {
      name: 'Upload',
      content: <Upload />
    }
  ]);

  return (
    <Context.Provider value={{}}>
      <div className="App">
        <UserInfo></UserInfo>

        <Tab tabList={tabList}></Tab>
      </div>
    </Context.Provider>
  );
}

export default App;
