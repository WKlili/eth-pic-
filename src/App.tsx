/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    toast.error(
      'Non-Ethereum browser detected. You should consider trying MetaMask'
    );
  }
}

export interface IFile {
  md5: string;
  address: string;
  url: string;
  user: string;
}
export interface IBlockData {
  account: string;
  totalSupply: number;
  files: IFile[];
  contract: any;
  mintStatus?: string;
  setMintStatus?: any;
}

function App() {
  const [account, setAccount] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [files, setFiles] = useState<IFile[]>([]);
  const [contract, setContract] = useState(null);
  const [mintStatus, setMintStatus] =
    useState<'none' | 'padding' | 'success'>('none');

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
        const file = await contract.methods.files(i).call();
        result.push(file);
      }
      setFiles(result);
      setContract(contract);
    } else {
      toast.error('Smart contract not deployed to detected network.');
    }
  }, [mintStatus]);

  useEffect(() => {
    console.log('refresh'); // ccc-log
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

  // console.log({
  //   account,
  //   totalSupply,
  //   files,
  //   contract,
  //   mintStatus,
  //   setMintStatus
  // }); // ccc-log
  return (
    <Context.Provider
      value={{
        account,
        totalSupply,
        files,
        contract,
        mintStatus,
        setMintStatus
      }}>
      <div className="App">
        <UserInfo></UserInfo>

        <Tab tabList={tabList}></Tab>
        <ToastContainer />
      </div>
    </Context.Provider>
  );
}

export default App;
