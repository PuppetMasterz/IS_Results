import React from 'react';
import Result from './result.jsx';
import { Search } from './search.jsx';

const apiUrl = "http://localhost:3000/results/get";

export default class App extends React.Component{
	constructor() {
		super();
		this.state = {
			results: null
		}
	}

	formatResults(results){
		let categorized = {};

		results.forEach((result) => {
			let sem = result.semester;
			if(sem == undefined){
				sem = "gpa";
			}

			if(categorized[sem] == undefined){
				categorized[sem] = [result];
			}
			else{
				categorized[sem].push(result);
			}
		});

		console.log(categorized);

		this.setState({
			result: categorized
		})
	}

	fetchResults(){
		let index = $('#index_number').val();
		console.log(index);

		fetch(`${apiUrl}/${index}`)
			.then((response) => response.json())
			.then((data) => {
				this.formatResults(data);
			})
			.catch((err) => console.log(err));
	}

	renderResults(){
		if(this.state.result == undefined){
			return [];
		}

		let resultCards = [];
		let semesters = Object.keys(this.state.result);

		semesters.forEach((sem) => {
			resultCards.push(<Result semester={ `Semester ${sem}` } results={ this.state.result[sem] }/>)
		});

		return resultCards;
	}

	render(){
		return (
			<div>
				<div style={{ textAlign: 'center'}}>
					<h2> IS Results 2013/24 </h2>
				</div>
				<Search onClick={ () => this.fetchResults() } />
				{ this.renderResults() }
			</div>
		);
	}
}