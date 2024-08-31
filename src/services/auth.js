// src/services/auth.js

/**
 * AuthService provides a simple way to authenticate a user.
 *
 * The service provides 3 methods:
 * - login: takes a username and a password and returns true if the user is authenticated, false otherwise.
 * - logout: logs out the user.
 * - isLoggedIn: returns true if the user is authenticated, false otherwise.
 *
 * The service uses a simple flag to keep track of the user's authentication status.
 * The flag is set to true when the user logs in and set to false when the user logs out.
 */

import { ref } from 'vue';
export const AuthService = {
    /**
     * Flag to keep track of the user's authentication status.
     * @type {boolean}
     */
    isAuthenticated: false,

    /**
     * Logs in a user with the given username and password.
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @returns {boolean} - true if the user is authenticated, false otherwise.
     */
    login(username, password) {
        // For simplicity, let's assume any non-empty credentials are valid
        if (username == "username" && password == "password") {
            this.isAuthenticated = true;
            return true;
        }
        return false;
    },

    /**
     * Logs out the user.
     */
    logout() {
        this.isAuthenticated = false;
    },

    /**
     * Returns true if the user is authenticated, false otherwise.
     * @returns {boolean} - true if the user is authenticated, false otherwise.
     */
    isLoggedIn() {
        return this.isAuthenticated;
    }
};

