// src/services/auth.js

export const AuthService = {
    isAuthenticated: false,

    login(username, password) {
        this.isAuthenticated = true;
        localStorage.setItem('loggedInUser', JSON.stringify({ username }));
    },

    logout() {
        this.isAuthenticated = false;
        localStorage.removeItem('loggedInUser');
    },

    isLoggedIn() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        return !!loggedInUser;
    },

    getRole() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === JSON.parse(loggedInUser).username);
        console.log(user.role)
        return user ? user.role : null;
    }
};