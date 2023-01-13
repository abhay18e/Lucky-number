import React from 'react';
import Container  from '@mui/material/Container';
import Heading from './components/heading';
import Connection from './components/Connection';
import {isNewUser, setLuckyNumber, getBalance} from './utils/utils';
import UserInfo from './components/userInfo';
import ChangeLuckyNumber from './components/changeLuckyNumber';
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      status : "notConnected", // "waiting" ,"connected" 
      address : undefined,
      gotBalance : false,
      balance : undefined,
      luckyNumber:undefined,
      fetchedUserInfo:false
    }
    this.connectionClick = this.connectionClick.bind(this);
    this.luckyNumberChange = this.luckyNumberChange.bind(this);
  }

  async luckyNumberChange(){
    this.setState({fetchedUserInfo:false});
    let [_isNewUser,luckyNumber] = await isNewUser();
    if(!_isNewUser) this.setState({luckyNumber:luckyNumber,fetchedUserInfo:true})
    else this.setState({fetchedUserInfo:true})
  }

  async connectionClick(e){
    if(typeof window.ethereum == 'undefined'){ 
      alert("First install Metamask Extension")
    }

    this.setState({status:"waiting"})
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    this.setState({
      address:accounts[0],
      status:"connected"
    })
      
    let chainId = await window.ethereum.request({method:"eth_chainId"});
    if(chainId !== '0x5'){
      await window.ethereum.request({
        method:"wallet_switchEthereumChain",
        params:[{chainId:'0x5'}]
      });
    }

    this.setState({gotBalance:false})
    let bal = await getBalance(this.state.address)
    this.setState({balance:bal,gotBalance:true});
     
    let [_isNewUser,luckyNumber] = await isNewUser();
    if(!_isNewUser) this.setState({luckyNumber:luckyNumber,fetchedUserInfo:true})
    else this.setState({fetchedUserInfo:true})
  }

  render(){
    return (
      <Container>
        <Heading value="Lucky Number" />
        <Connection 
        address = {this.state.address} 
        status  = {this.state.status} 
        onclick = {this.connectionClick}
        balance = {this.state.balance} 
        gotBalance = {this.state.gotBalance} />
        {
        this.state.fetchedUserInfo ?
        <>
        <UserInfo  luckyNumber={this.state.luckyNumber} />
        <ChangeLuckyNumber  luckyNumber={this.state.luckyNumber} luckyNumberChange={this.luckyNumberChange} />
        </>
        :
        null
        }
      </Container>
    );
  }
}

export default App;
