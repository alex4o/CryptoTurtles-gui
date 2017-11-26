import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'


import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import './bootstrap.min.css'

import Home from "./page/home"
import Battle from "./page/battle"
import Turtle from "./page/turtle"

import { Navbar, NavItem, Nav } from 'react-bootstrap';


class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			storageValue: 0,
			web3: null,
			accounts: []
		}
	}

	componentWillMount() {
		// Get network provider and web3 instance.
		// See utils/getWeb3 for more info.

		getWeb3
		.then(results => {
			this.setState({
				web3: results.web3
			})

			// Instantiate contract once web3 provided.
			this.instantiateContract()
		})
		.catch(() => {
			console.log('Error finding web3.')
		})
	}

	instantiateContract() {
		/*
		 * SMART CONTRACT EXAMPLE
		 *
		 * Normally these functions would be called in the context of a
		 * state management library, but for convenience I've placed them here.
		 */

		this.state.web3.eth.getAccounts((error, accounts) => {
			this.setState({accounts: accounts})
		})

		 return 0;
		const contract = require('truffle-contract')
		const simpleStorage = contract(SimpleStorageContract)
		simpleStorage.setProvider(this.state.web3.currentProvider)

		// Declaring this for later so we can chain functions on SimpleStorage.
		var simpleStorageInstance

		// Get accounts.
		this.state.web3.eth.getAccounts((error, accounts) => {
			simpleStorage.deployed().then((instance) => {
				simpleStorageInstance = instance
				// Stores a given value, 5 by default.
				return simpleStorageInstance.set(5, {from: accounts[0]})
			}).then((result) => {
				// Get the value from the contract to prove it worked.
				return simpleStorageInstance.get.call(accounts[0])
			}).then((result) => {
				// Update state with the result.
				return this.setState({ storageValue: result.c[0] })
			})
		})
	}

	render() {
		return (
			<Router>
				<div>


						<Navbar inverse>
							<Navbar.Header>
								<Navbar.Brand>
									<Link to="/">Home</Link>
								</Navbar.Brand>
							</Navbar.Header>
							<Navbar.Collapse>
								<Nav>
									<NavItem eventKey={1} href="/battle">Battle</NavItem>
									<NavItem eventKey={2} href="/turtle">Turtle</NavItem>

								</Nav>

							</Navbar.Collapse>
						</Navbar>

							<Route exact path="/" component={(props) => <Home accounts={this.state.accounts} /> }/>
							<Route path="/battle" component={Battle}/>
							<Route path="/turtle" component={Turtle}/>
				</div>
				</Router>
		);
	}
}

export default App
