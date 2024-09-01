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
    }
};