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
            secretData: [],
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
            if (xhr.status === 200) {
                console.log(xhr.response)
                var temp = [];
                var humi = [];
                for(var i = 0; i < xhr.response.length; i++) {
                    temp.push([Date.parse(xhr.response[i].created_at),xhr.response[i].temperature]);
                    humi.push([Date.parse(xhr.response[i].created_at),xhr.response[i].humidity]);
                }
                console.log(temp,humi);
                this.setState({
                    secretData: [xhr.resonse],
                    temperature: temp,
                    humidity: humi
                });
            }
        });
        xhr.send();
    }

    /**
     * Render the component.
     */
    render() {
        return (<Dashboard secretData={this.state.secretData} />);
    }

}

export default DashboardPage;
