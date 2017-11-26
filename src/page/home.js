import React, { Component } from 'react'
import CoinSale from '../../build/contracts/TurtleCoinSale.json'
import TurtleData from '../../build/contracts/TurtleData.json'
import getWeb3 from '../utils/getWeb3'
const contract = require('truffle-contract')

import { Row, Grid, Col, Nav, NavItem } from 'react-bootstrap';

// 0x068a5c020f58c9c1e427957502a6f1a6dea172d2


export default class Home extends Component {
	constructor(props) {
		super(props)
		console.log(props)
		this.state = {
			data: null,
			coin: null	
		}
	}

	componentWillMount() {
		// contract(CoinSale).deployed()
		let sale = contract(CoinSale).at("0xb4f8b30b65c6efda2d042fe65b2b6330775f23e1")
		let data = contract(TurtleData).at("0x4d7bd998477c9fa8e897516f58af0ef9ce227df0")

		let tk = sale.token()
		data.setCommuncation(tk)
		
		this.setState({data, sale})
	}

	instantiateContract() {
	
	}

	handleSelect(e){
		let num = this.state.data.globalTurtles.call()
		for(var i = 0; i <= num; i++){
			console.log(this.state.data.Turtles.call(i))
		}
	}

	mint(){

		// CS.sale.sendTransaction({from: acc, value: web3.toWei(10, "ether") })
		// TD.updateRequests({from: acc})

		// TD.mintTurtle("cool", 12, 15);

	}

	getTurtles(){
	
	}

	render() {
		return (
			<Grid id="home">
				<Row>
				<Col xs={12} md={4}>
					<Nav bsStyle="pills" stacked onSelect={this.handleSelect}>
						{this.props.accounts.map(acc => <NavItem key={acc} eventKey={acc}>{acc}</NavItem>)}
					</Nav>
				</Col>
				<Col xs={12} md={6}>
					{this.props.accounts.map(acc => <NavItem key={acc} eventKey={acc}>{acc}</NavItem>)}
				</Col>
				</Row>
			</Grid>
		);
	}
}