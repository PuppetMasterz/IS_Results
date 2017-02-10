import React from 'react';

export default function Error(props){
	return(
		<div className="block-style">
			<div className="center-align block-style"><i className="large material-icons"> error_outline </i></div>
			<h5 className="center-align"> Sorry, no result matched your query </h5>
		</div>
	);
}