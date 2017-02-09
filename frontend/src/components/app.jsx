import React from 'react';
import Result from './result.jsx';
import Rank from './rank.jsx';
import { Search } from './search.jsx';

const apiUrl = "http://localhost:3000/results/get";

export default class App extends React.Component{
	constructor() {
		super();
		this.state = {
			results: null
		}
	}


	fetchResults(){
		let index = $('#index_number').val();
		console.log(index);

		fetch(`${apiUrl}/${index}`)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					results: data
				});
			})
			.catch((err) => console.log(err));
	}

	renderResults(){
		let resultCards = [];
		let results = this.state.results;

    if (results) {
      resultCards.push(<Rank gpa={results['gpa']} rank=''/>);
    }

    for(let year in results){
      for(let sem in results[year]){
        resultCards.push(<Result year={ year } gpa={ results[year][sem]['gpa'] } semester={ sem } results={ results[year][sem]['result'] }/>)
      }
    }

    return resultCards;
  }

  render(){
    return (
      <div>
        <div className="center-align">
          <h2> IS Results 2013/24 </h2>
        </div>
				<Search onClick={ () => this.fetchResults() } />
				{ this.renderResults() }
			</div>
		);
	}
}