pragma solidity ^0.4.11;

import './TurtleCoin.sol';

//import './zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';

import './zeppelin-solidity/contracts/crowdsale/CappedCrowdsale.sol';

contract TurtleCoinSale is CappedCrowdsale{



  function TurtleCoinSale(uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet, uint256 _cap) CappedCrowdsale(_cap)Crowdsale(_startTime, _endTime, _rate, _wallet){
    }

    // creates the token to be sold. 
    // override this method to have crowdsale of a specific mintable token.
    function createTokenContract() internal returns (MintableToken) {
      return new TurtleCoin();
    }

}
