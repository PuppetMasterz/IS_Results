import React from 'react';
import Modal from 'react-modal';
var LineChart = require("react-chartjs").Line;

var data = {
    labels: ["1st year 1st sem", "1st year 2nd sem", "2nd year 1st sem", "2nd year 2nd sem", "3rd year 1st sem"],
    datasets: [
        {
            label: "GPA variation",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
            spanGaps: false,
        }
    ]
};

var chartOptions = {
  scales: {
    xAxes: [{
      display: false
    }]
  }
};


export default class Graph extends React.Component{

	constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      results: this.props.results,
      data: data
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }


  formatData(results) {
  	console.log("format data",results);
  	for(let year in results){
  	  for(let sem in results[year]){
  	    this.state.data.datasets[0].data.push(results[year][sem]['gpa']);
  	  }
  	}
  }

  openModal() {
    this.setState({modalIsOpen: true});
		// console.log("props", this.props);
	  var results = this.props.results;
	  console.log('results', results);
	  this.formatData(results);
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <button className="waves-effect waves-light btn col s2 push-s5 graph-btn" onClick={this.openModal}>Graph it</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Graph Modal"
        >

          <h2 className="center-align" ref="subtitle">GPA Variation</h2>
          <LineChart className="chart" data={this.state.data} options={chartOptions} width="600" height="250"/>
          <br/>
          <button className="waves-effect waves-light btn col s2 push-s5 modal-close" onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}
