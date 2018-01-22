import React from 'react';
import Result from './result.jsx';
import Rank from './rank.jsx';
import Error from './error.jsx';
import Graph from './graph.jsx';
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
		console.log(index.length);

		if(index.length != 8 ){
			this.setState({
				results: null
			});
			$('#index_number').addClass('invalid');
			$('#index_number').prop('area-invalid', 'true');
			$('#index_label').attr('data-error', 'Index must be 8 digits');
			return;
		}

		$('#index_number').removeClass('invalid');
		$('#index_number').prop('area-invalid', 'false');

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

		if(results && results.error){
			return (<Error />);
		}

    if (results) {
      resultCards.push(<Rank gpa={results['gpa']} rank={results['rank']} />);
      resultCards.push(<Graph results={results}/>);
      console.log("new result state", results);
    }

	    for(let year in results){
	      for(let sem in results[year]){
	        resultCards.push(<Result year={ year } gpa={ results[year][sem]['gpa'] } semester={ sem } rank={ results[year][sem]['rank'] } results={ results[year][sem]['result'] }/>)
	      }
	    }

	    return resultCards;
  }

  render(){
    return (
      	<div>
	        <div className="center-align">
	          <h2> IS Results 2013/14 </h2>
	        </div>
			<Search onClick={ () => this.fetchResults() } />
			{ this.renderResults() }
		</div>
	   );
	}
}