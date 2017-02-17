import React from 'react';

export default class Rank extends React.Component{

	render(){
		return(
			<div>
				<div className="block-style" >
						<h4> {`GPA: ${this.props.gpa.toFixed(2)}`} </h4>
						<h5> { `Rank: ${this.props.rank}` } </h5>
				</div>
			</div>
		)
	}
}
