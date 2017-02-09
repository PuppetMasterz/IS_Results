import React from 'react';

function Result(props){
	return(
		<tr>
			<td> { props.result.code } </td>
			<td> { props.result.title } </td>
			<td> { props.result.grade? props.result.grade: 'N/A' } </td>
		</tr>
	)
}

export default class Results extends React.Component{
	renderSubjects(){
		var subjects = [];

		this.props.results.map((result) => {
			subjects.push(<Result result={ result }/>);
		});

		return subjects;
	}

	render(){
		return(
			<div>
			<h4 className="center-align" >  {`Year ${this.props.year.charAt(4)} - Semester ${this.props.semester.charAt(3)}`} </h4>
			<h5 className="center-align"> {`GPA ${this.props.gpa.toFixed(2)} | Rank: ${this.props.rank}`} </h5>

			<table className="centered">
				<thead>
					<tr>
						<th> Code </th>
						<th> Title </th>
						<th> Grade </th>
					</tr>
				</thead>
				<tbody>
					{ this.renderSubjects() }
				</tbody>
			</table>

		</div>
		)
	}
}
