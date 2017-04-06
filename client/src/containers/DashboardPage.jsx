import React, { Component, PropTypes } from 'react';
import Auth from '../modules/Auth';
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
			temperature: [],
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
			if (xhr.status < 350) {
				//console.log(xhr.response);
				var temp = [];
				var humi = [];
				for(var i = 0; i < xhr.response.length; i++) {
					//temp.push([Date.parse(xhr.response[i].created_at),xhr.response[i].temperature]);
					humi.push([Date.parse(xhr.response[i].created_at)-1000*3600*4,xhr.response[i].humidity]);
					temp.push([Date.parse(xhr.response[i].created_at)-1000*3600*4,xhr.response[i].temperature]);

				}

				this.setState({
					//secretData: [xhr.resonse],
					temperature: temp,
					humidity: humi
				});
				var optionsHumi = {
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
						formatter: function() {
							return '<b>Humidity: </b>'+ this.y+'%'+'<br>'+
								Highcharts.dateFormat('%I:%M %p', this.x);
						}
						// headerFormat: '<b>{series.name}</b><br>',
						// pointFormat: '{point.x:%e. %b}: {point.y:.2f} %'
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
				var optionsTemp = {

					chart: {
						type: 'spline'
					},
					title: {
						text: 'Room Temperature'
					},
					subtitle: {
						text: 'Irregular time data in Highcharts JS'
					},
					xAxis: {
						type: 'datetime',
						dateTimeLabelFormats: { // don't display the dummy year
							day: '%b %e',
							week: '%b %e'
						},
						title: {
							text: 'Date'
						}
					},
					yAxis: {
						title: {
							text: 'Temperature (°C)'
						},
						min: 0
					},
					tooltip: {
						formatter: function() {
							return '<b>Temperature: </b>'+ this.y+'(°C)'+'<br>'+
								Highcharts.dateFormat('%I:%M %p', this.x);
						}

						//         headerFormat: '<b>{series.name}</b><br>',
						//       pointFormat: '{point.x:%e. %b}: {point.y:.2f} °C'
					},

					plotOptions: {
						spline: {
							marker: {
								enabled: true
							}
						}
					},
					series: [{
						name: "Temperature",
						data: this.state.temperature
					}]
				}

			};

			Highcharts.chart('chartHumi', optionsHumi);
			Highcharts.chart('chartTemp', optionsTemp);

		});
		xhr.send();
	}

	/**
	 * Render the component.
	 */
	render() {
		//return (<Dashboard secretData={this.state.secretData} />);
		return (
			<div>
				<div id='chartHumi'></div>
				<div id='chartTemp'></div>
			</div>
		);
	}

}

export default DashboardPage;
