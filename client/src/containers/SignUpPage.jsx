import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import SignUpForm from '../components/SignUpForm.jsx';

class SignUpPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props, context) {
        super(props, context);
        //store token
        // set the initial component state

        this.state = {
            errors: {},
            user: {
                email: '',
                name: '',
                password: '',
                password_confirmation: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        // create a string for an HTTP body message
        const name = encodeURIComponent(this.state.user.name);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const password_confirmation = encodeURIComponent(this.state.user.password_confirmation);

        const formData = JSON.stringify({
            'email' : email,
            'password' : password,
		    'password_confirmation' : password_confirmation,
            'name' : name
        });
        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://34.200.149.58:3003/users');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success

                // change the component-container state
                this.setState({
                    errors: {}
                });
                // set a message
				localStorage.setItem('successMessage', xhr.response.message);

                //set a message
                Auth.authenticateUser(xhr.response.auth_token);

				// make a redirect
				this.context.router.replace('/');

            } else {
                console.log(xhr.response);
                const errors = {};
                if (xhr.response.name) {
                    errors.name = xhr.response.name[0];
                }
                if (xhr.response.email) {
                    errors.email = xhr.response.email[0];
                }
                if (xhr.response.password) {
                    errors.password = xhr.response.password[0];
                }
                if (xhr.response.password_confirmation) {
                    errors.password_confirmation = "Password not match";
                }

                errors.summary = "Check errors"
                this.setState({
                    errors
                });
            }
        });
        xhr.send(formData);
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <SignUpForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
        );
    }

}
SignUpPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignUpPage;
