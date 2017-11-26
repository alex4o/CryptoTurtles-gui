pragma solidity ^0.4.11;

import './zeppelin-solidity/contracts/math/SafeMath.sol';
import './TurtleCoin.sol';


contract TurtleData{

	using SafeMath for uint256;

	address public listeningContract;

	TurtleCoin public coinContract;

	mapping(address => uint256) balances;

	mapping(address => uint256) requests;

	mapping(address => uint256) lastChecked;

	mapping(uint256 => uint256) public Turtles;

	mapping(uint256 => address) public TurtleOwner;

	mapping(uint256 => string) public TurtleNames;

	//number of turtles that someone owns.
	mapping(address => uint256) public TurtlesOwned;

	uint256 public globalTurtles; 

	event dataSubmitted(address submitter, uint256 data_type, uint256 req);

	event sendResponse(address submitter, uint256 encryptType, uint256 req);

	event noRequests(address submitter);

	event dataRequest(address submitter, uint256 data_type, uint256 encrypt_type);

	event mintedTurtle(address sender, string name, uint256 parent1, uint256 parent2);

	event turtleTransfer(address to, address from);


	function TurtleData(){

		globalTurtles = 0;


	}

	function setCommunication(address contrac) returns (bool){

		listeningContract = contrac;

		coinContract = TurtleCoin(listeningContract);

		return true;

	}


	function calculateRequests() public returns (uint256){

		//use monthly

		require(block.number > lastChecked[msg.sender] + 100800);

		uint256 turtleCoinBalance;

		turtleCoinBalance = coinContract.balanceOf(msg.sender);

		//Needs to multiply by number of months since last checked for the case where users havent made requests in multiple months
		if(turtleCoinBalance >= 0){

			requests[msg.sender] = requests[msg.sender].add(turtleCoinBalance/200000000000000000000);




		}

		balances[msg.sender] = turtleCoinBalance;

		lastChecked[msg.sender] = block.number;

		return requests[msg.sender];




		}
	
	function updateRequests() public returns (uint256){

		//use if new funds are accquired in turtleCoin

		uint256 turtleCoinBalance;

		uint256 difference;

		turtleCoinBalance = coinContract.balanceOf(msg.sender);

		difference = turtleCoinBalance.sub(balances[msg.sender]);

		//change to require otherwise users can just keep getting new coins
		if(difference >= 0){
	
			requests[msg.sender] = requests[msg.sender].add(difference/200000000000000000000);


		}

		balances[msg.sender] = turtleCoinBalance;

		return requests[msg.sender];



	}



	function mintTurtle(string name, uint256 parent1, uint256 parent2){

		require(verifyTurtleOwner(msg.sender, parent1) && verifyTurtleOwner(msg.sender,parent2));

		if(requests[msg.sender] > 0){

			requests[msg.sender] = requests[msg.sender].sub(1);

			globalTurtles = globalTurtles.add(1);

			//turtle ids determine features such as attributes and owner
			Turtles[globalTurtles] = now + 123456 + parent1 + parent2 + globalTurtles;

			TurtleNames[Turtles[globalTurtles]] = name;

			TurtleOwner[Turtles[globalTurtles]] = msg.sender;

			TurtlesOwned[msg.sender] = TurtlesOwned[msg.sender].add(1);

			mintedTurtle(msg.sender, name, parent1, parent2);


		}

		else{

			noRequests(msg.sender);



		}



	}

	function verifyTurtleOwner(address claimer, uint256 turtleId) public returns (bool){

		if(claimer == TurtleOwner[turtleId]){

			return true;

		}

		else{

			return false;
		}



	}

	//return number of turtles a user owns
	function turtleCount(address owner) returns(uint256){
		return TurtlesOwned[owner];


	}

	function transferTurtle(address _to, uint256 turtleId){

		require(verifyTurtleOwner(msg.sender, turtleId));

		TurtleOwner[turtleId] = _to;

		turtleTransfer(_to, msg.sender);


	}

	function requestData(uint256 data_type, uint256 encrypt_type){
		dataRequest(msg.sender, data_type, encrypt_type);


	}

	function balanceret() returns(uint256){
			return coinContract.balanceOf(msg.sender);


	}

	function turtleName(uint256 turtleId) returns(string){
		return TurtleNames[turtleId];

	}





}