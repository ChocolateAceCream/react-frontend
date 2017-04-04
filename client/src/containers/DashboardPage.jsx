import React, { Component, PropTypes } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import Highcharts from 'highcharts';
//import axios from 'axios';

class DashboardPage extends React.Component {

	/**
	 * Class constructor.
	 */
	constructor(props) {
		super(props);

		this.state = {
			// secretData: [],
			// temperature: [],
			humidity: []
		};
	}

	/**
	 * This method will be executed after initial rendering.
	 */
	componentDidMount() {
		const xhr = new XMLHttpRequest();
		xhr.open('get', 'http://34.200.149.58:3003/dhts');
		xhr.setRequestHeader('Content-type', 'application/json');
		// set the authorization HTTP header
		xhr.setRequestHeader("X-CSRF-Token", `bearer ${Auth.getToken()}`);
		xhr.responseType = 'json';
		xhr.addEventListener('load', () => {
			if (xhr.status === 200) {
				//console.log(xhr.response);
				//var temp = [];
				var humi = [];
				for(var i = 0; i < xhr.response.length; i++) {
					//temp.push([Date.parse(xhr.response[i].created_at),xhr.response[i].temperature]);
					humi.push([Date.parse(xhr.response[i].created_at),xhr.response[i].humidity]);

				}

				this.setState({
					//secretData: [xhr.resonse],
					//     temperature: temp,

					humidity: humi
				});
				var options = {

					chart: {
						type: 'spline'
					},
					title: {
						text: 'Humidity level in the room'
					},
					subtitle: {
						text: 'Irregular time data in Highcharts JS'
					},
					xAxis: {
						type: 'datetime',
						title: {
							text: 'Date'
						}
					},
					yAxis: {
						title: {
							text: 'Humidity level (%)'
						},
						min: 0
					},
					tooltip: {
						headerFormat: '<b>{series.name}</b><br>',
						pointFormat: '{point.x:%e. %b}: {point.y:.2f} %'
					},

					plotOptions: {
						spline: {
							marker: {
								enabled: true
							}
						}
					},
					series: [{
						name: "Humidity",
						data: this.state.humidity
					}]
				}
			};

			Highcharts.chart('chart', options);

        });
	xhr.send();
}

/**
 * Render the component.
 */
render() {

	console.log("hi");
	console.log(this.state.humidity);
	//return (<Dashboard secretData={this.state.secretData} />);
	return (<div id='chart'></div>);
}

}

export default DashboardPage;
