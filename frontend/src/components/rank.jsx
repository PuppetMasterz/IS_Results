import React from 'react';

export default class Rank extends React.Component{
	componentDidMount() {
		console.log(this.props.gpa);
	}

	render(){

		var blockStyle = {
	        padding: "3%",
	        backgroundColor: "#f5f2f0",
	        textAlign: "center"
	    };

		return(
			<div>
				<h4 style={blockStyle} >  {`GPA: ${this.props.gpa.toFixed(2)}`} </h4>
			</div>
		)
	}
}
