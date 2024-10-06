// src/services/auth.js

export const AuthService = {
    isAuthenticated: false,

    logout() {
        this.isAuthenticated = false;
        sessionStorage.removeItem('loggedInUser');
    },

    isLoggedIn() {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        return !!loggedInUser;
    },

    async getRole() {
        const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
        return user ? user.role : null;
    },

    async getUID() {
        const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
        return user ? user.uid : null;
    }
};
