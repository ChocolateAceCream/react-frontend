class Auth {
    //Authenticate a user, save a token string in local storage
    static authenticateUser(token) {
        localStorage.setItem('token',token);
    }

    //check if user is authenticated, and token is saved.
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    //deauthenticate a user, remove a token from local storage
    static deauthenticateUser() {
        localStorage.removeItem('token');
    }

    //get a token
    static getToken() {
        return localStorage.getItem('token');
    }
}

export default Auth;
