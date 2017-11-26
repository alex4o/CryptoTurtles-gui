pragma solidity ^0.4.11;

import './zeppelin-solidity/contracts/token/MintableToken.sol';

contract TurtleCoin is MintableToken {


  string public name = "TURTLE COIN";
  string public symbol = "TRTL";
  uint256 public decimals = 18;

  function TurtleCoin(){



  }

}