import React, { Component, PropTypes } from 'react';
import Highcharts from 'highcharts';

class Dashboard extends Component{
	componentDidMount(){
        console.log("hello");
    console.log(this.props);
		const options = {
			title: {
				text: 'Fruit Consumption'
			},
			xAxis: {
				categories: [1,2,3,4,5,6,7,8,9,10]
			},
			yAxis: {
				title: {
					text: 'Fruit eaten'
				}
			},
			chart: {
				type: 'bar'
			},
			series: [{
				name: 'Jane',
				data: this.props.humidity
			}]
		};

		this.chart = new Highcharts[this.props.type || "Chart"](
			this.refs.chart,
			options
		);
	}
	render() {
		return (
			<div ref="chart"></div>
		)
	}
}

/*
const Dashboard = ({ secretData }) => (
	<Card className="container">
		<CardTitle
			title="Dashboard"
			subtitle="For Jerry and Star"
	/>

	{secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
</Card>
);

Dashboard.propTypes = {
	//secretData: PropTypes.array.isRequired
	humidity: PropTypes.array.isRequired
};

*/
export default Dashboard;
