import { providers,Contract } from "ethers";

const CONTRACT_ADDRESS = "0xD923Bbe70e80C236be8b509BBe6b375CDDd0cEf4"
const ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"uint256","name":"_luckNumber","type":"uint256"}],"name":"LuckNumberSet","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressToLuckyNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMyLuckyNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLuckNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_luckyNumber","type":"uint256"}],"name":"setMyLuckyNumber","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const provider = new providers.Web3Provider(window.ethereum);
const contract = new Contract(CONTRACT_ADDRESS, ABI, provider.getSigner());


export  async function isNewUser(){
    let res;
    try{
        res = await contract.getMyLuckyNumber()
        return [false,res.toNumber()];
    }catch(err){
        return [true,err];
    }
}

export async function setLuckyNumber(_luckyNumber){
    let txHash = await contract.setMyLuckyNumber(_luckyNumber)
    return txHash;
}

export async function waitForTransaction(hash){
    let recipt = await provider.waitForTransaction(hash);
    return recipt
}

export async function getBalance(_address){
    let txHash =await provider.getBalance(_address);
    return (parseInt(txHash._hex)/1e18).toFixed(2)
}
