import React, { Component } from 'react'
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
import getWeb3 from '../utils/getWeb3'



export default class Battle extends Component {
	constructor(props) {
		super(props)

		this.state = {
			
		}
	}

	componentWillMount() {

	}

	instantiateContract() {
	
	}

	render() {
		return (
			<div id="fight">
				<div id="turtle_y">
					<img  src="/turtle.png"/>
					<span>name1</span>
				</div><div id="turtle_e">
					<img  src="/turtle.png"/>
					<span>name2</span>
				</div>

			</div>
		);
	}
}