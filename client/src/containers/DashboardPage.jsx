import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
//import axios from 'axios';

class DashboardPage extends React.Component {

	/**
	 * Class constructor.
	 */
	constructor(props) {
		super(props);

		this.state = {
			secretData: ''
		};
	}

	/**
	 * This method will be executed after initial rendering.
	 */
	componentDidMount() {
		/*
        axios.defaults.headers.common['Authorization'] =  `bearer ${Auth.getToken()}`
        axios.defaults.headers.common['Access-Control-Request-Headers'] = 'Authorization'
		axios.get('http://34.200.149.58:3003/dhts/1')
			.then(function (response) {
				console.log(response);
			});
            */
	const xhr = new XMLHttpRequest();
	xhr.open('get', 'http://34.200.149.58:3003/dhts/1');
	xhr.setRequestHeader('Content-type', 'application/json');
		// set the authorization HTTP header
	xhr.setRequestHeader("X-CSRF-Token", `bearer ${Auth.getToken()}`);
	xhr.responseType = 'json';
	xhr.addEventListener('load', () => {
	  if (xhr.status === 200) {
		this.setState({
		  secretData: xhr.response.message
		});
	  }
	});
	xhr.send();
            /*
	  $.ajax({
		url: 'http://34.200.149.58:3003/dhts/1',
		  beforeSend: function (xhr){
			xhr.setRequestHeader('Authorization', )
		  }
	  })
	  */
	}

	/**
	 * Render the component.
	 */
	render() {
		return (<Dashboard secretData={this.state.secretData} />);
	}

}

export default DashboardPage;
