import React from 'react';

export class Search extends React.Component{
	render(){
		return(
			<div>
				<div className="row">
					<div className="input-field col s8 push-s2">
						<input placeholder="Index number" id="index_number" type="text"/>
		          		<label htmlFor="index_number">Index Number</label>
					</div>
				</div>

				<div className="row">
					<a className="waves-effect waves-light btn col s2 push-s5" onClick={ () => this.props.onClick() }>Fetch</a>
				</div>
			</div>
		);
	}
}