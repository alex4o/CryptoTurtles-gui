import React, { Component } from 'react'
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
import getWeb3 from '../utils/getWeb3'



export default class Turtle extends Component {
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
			<div id="turtle">
				<div>
					<img src="turtle.png"/>
					<span>name1</span>
				</div>
				

			</div>
		);
	}
}