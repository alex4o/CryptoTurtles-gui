import React, { Component } from 'react'
import CoinSale from '../../build/contracts/TurtleCoinSale.json'
import TurtleData from '../../build/contracts/TurtleData.json'
import getWeb3 from '../utils/getWeb3'

const contract = require('truffle-contract')

import { Row, Grid, Col, Nav, NavItem, Thumbnail, Button } from 'react-bootstrap';

// 0x068a5c020f58c9c1e427957502a6f1a6dea172d2


export default class Home extends Component {
	constructor(props) {
		super(props)
		console.log(props)
		this.state = {
			data: null,
			my: []
		}
	}

	componentDidMount() {
		let {data} = this.props

		// data.setProvider(web3.currentProvider)
		// let tk = sale.token()
		// data.setCommuncation(tk)
		
		this.setState({data: data})
	}

	instantiateContract() {
	
	}

	handleSelect(e){
		let my = []
		let { data } = this.state
		window.data = data
		window.e = e
		let num = data.globalTurtles.call().c[0]
		console.log("Global turtles: ", num)
		for(var i = 1; i <= num; i++){
			let id = data.Turtles.call(i).c[0]
				
			let name = data.turtleName.call(id)
			if(data.verifyTurtleOwner.call(e, id)){
				console.log(name,id)
				let stats_s = id.toString()
				let stats_a = []
				for(var k = 0; k <= stats_s.length; k += 2){
					stats_a.push(parseInt(stats_s.substr(k, 2)))
				}

				let stats = {
					atk: stats_a[0],
					spd: stats_a[1],
					lvl: stats_a[2],
					def: stats_a[3],
					dap: stats_a[4]
				}

				my.push({name, id, stats})
			}
		}

		this.setState({my})
	}



	getTurtles(){
	
	}

	render() {
		return (
			<Grid id="home">
				<Row>
				<Col xs={12} md={4}>
					<Nav bsStyle="pills" stacked onSelect={this.handleSelect.bind(this)}>
						{this.props.accounts.map(acc => <NavItem key={acc} eventKey={acc}>{acc}</NavItem>)}
					</Nav>
				</Col>
				<Col xs={12} md={6}>
					{this.state.my.map(({name, id, stats}) => {
						return <Thumbnail key={id} src="/turtle.png" alt="242x200">
          <h3>{name}</h3>
          <p>
          	<span>Attack: </span>{stats.atk}
          </p>
          <p>
          	<span>Speed: </span>{stats.spd}
          </p>
          <p>
          	<span>Level: </span>{stats.lvl}
          </p>
          <p>
          	<span>Deffence: </span>{stats.def}
          </p>
          <p>
          	<span>Dance Power: </span>{stats.dap}
          </p>

          <p>
            <Button bsStyle="primary">Fight</Button>
            <Button bsStyle="default">Heal</Button>
            <Button bsStyle="default">Trade</Button>
            <Button bsStyle="default">Breed</Button>
          </p>
        </Thumbnail>

				})}
				</Col>
				</Row>
			</Grid>
		);
	}
}