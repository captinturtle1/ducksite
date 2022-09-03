import { ethers, Signer } from "ethers";
import abi from './abi.json'

const contractAddress = "0x20c5EA7694Ae0457CBBA46dd5DBf22E40eF1D7FF";
const mutatedAddress = "";
const COSTINETH = 0;

let selectedAccount;

let nftContract;

let isInitialized = false;


export const initWeb3 = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();

    if (typeof provider !== 'undefined') {
        window.ethereum.on('accountsChanged', function (accounts){
            selectedAccount = accounts[0];
            console.log(`Selected account changed to ${selectedAccount}`);
        })
    }

    nftContract = new ethers.Contract(contractAddress, abi, signer);

    isInitialized = true;
}





export const checkIfPaused = async () => {
    if (!isInitialized) {
      await initWeb3();
    }
    let isPaused = await nftContract.paused();
    return isPaused;
};

export const getTotalSupply = async () => {
    if (!isInitialized) {
      await initWeb3();
    }
    let supply = await nftContract.totalSupply();
     return supply.toString()
};





export const mintToken = async (mintAmount) => {
    if (!isInitialized) {
      await initWeb3();
    }
    let totalcost = mintAmount * COSTINETH;
    let overrides = {
        value: ethers.utils.parseEther(totalcost.toString())
    };
    return nftContract.mint(mintAmount, overrides);
};

export const mintFreeToken = async (mintAmount) => {
  if (!isInitialized) {
    await initWeb3();
  }
  return nftContract.mint();
};

/*
export const mintMutated = async (tokenID) => {
    if (!isInitialized) {
      await initWeb3();
    }
    return mutatedAddress.mint(tokenID);
};

export const batchMintMutate = async (tokenIDs) => {
  if (!isInitialized) {
    await initWeb3();
  }
  return mutatedAddress.mint(tokenIDs);
};
*/


export async function requestAccount() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            selectedAccount = accounts[0];
            return accounts[0];
        } catch (error) {
        }
    } else {
    }
}

export async function getAccount() {
    if (window.ethereum) {
        console.log("Wallet detected");

        try {
            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            });
            selectedAccount = accounts[0];
            return accounts[0];
        } catch (error) {
            console.log("Error connecting...");
        }
    } else {
        console.log("No wallet detected");
    }
}