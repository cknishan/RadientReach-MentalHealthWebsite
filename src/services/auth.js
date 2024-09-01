import axios from 'axios';

export const AuthService = {
    isAuthenticated: false,

    async login(username, password) {
        const response = await axios.get(`http://localhost:3000/users?username=${username}&password=${password}`);
        const user = response.data[0];
        if (user) {
            this.isAuthenticated = true;
            sessionStorage.setItem('loggedInUser', JSON.stringify({ username }));
        }
        return user;
    },

    logout() {
        this.isAuthenticated = false;
        sessionStorage.removeItem('loggedInUser');
    },

    isLoggedIn() {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        return !!loggedInUser;
    },

    async getRole() {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        const response = await axios.get(`http://localhost:3000/users?username=${loggedInUser.username}`);
        const user = response.data[0];
        return user ? user.role : null;
    }
};
