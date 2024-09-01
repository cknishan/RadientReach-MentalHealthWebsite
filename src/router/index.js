// src\router\index.js
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AccessDeniedView from '@/views/AccessDeniedView.vue'
import CommunityView from '../views/CommunityView.vue'
import FindHelpView from '../views/FindHelpView.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminProfileView from '@/views/AdminProfileView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import SettingsView from '../views/SettingsView.vue'
import SignUp from '../views/SignUp.vue'
import NotFoundView from '@/views/NotFoundView.vue'

import { AuthService } from '@/services/auth'

const routes = [
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileView,
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            const role = AuthService.getRole();
            if (role === 'admin' && to.name !== 'AdminProfile') {
                next({ name: 'AdminProfile' });
            } else if (role !== 'admin' && to.name !== 'Profile') {
                next({ name: 'Profile' });
            } else {
                next();
            }
        }
    },
    {
        path: '/admin-profile',
        name: 'AdminProfile',
        component: AdminProfileView,
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            const role = AuthService.getRole();
            if (role != "admin") {
                next({ name: 'Profile' });
            } else {
                next();
            }
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsView,
        meta: { requiresAuth: true }
    },
    { path: '/home', name: 'Home', component: HomeView },
    {
        path: '/login', name: 'Login', component: LoginView,
        beforeEnter: (to, from, next) => {
            if (AuthService.isLoggedIn()) {
                next({ name: 'Profile' }); // Redirect to Home or Profile if logged in
            } else {
                next();
            }
        }
    },
    {
        path: '/signup', name: 'SignUp', component: SignUp,
        beforeEnter: (to, from, next) => {
            if (AuthService.isLoggedIn()) {
                next({ name: 'Profile' }); // Redirect to Home or Profile if logged in
            } else {
                next();
            }
        }
    },
    { path: '/access-denied', name: 'AccessDenied', component: AccessDeniedView },
    { path: '/community', name: 'Community', component: CommunityView, meta: { requiresAuth: true } },
    { path: '/find-help', name: 'FindHelp', component: FindHelpView },
    { path: '/resources', name: 'Resources', component: ResourcesView },
    { path: '/', redirect: '/home' }, // Redirect to login by default
    { path: '/:catchAll(.*)', name: 'NotFound', component: NotFoundView },
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkActiveClass: 'bg-theme-green',
    linkExactActiveClass: 'bg-theme-green',
})

router.beforeEach((to, from, next) => {
    /**
     * Perform authentication checks before each route change.
     *
     * If the route to which we are navigating requires authentication, check if the user is logged in.
     * If the user is not logged in, navigate to the login page instead.
     * If the user is logged in, continue the navigation.
     */
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!AuthService.isLoggedIn()) {
            next('/access-denied');
        } else {
            next();
            return;
        }
    } else {
        next();
    }
});

export default router;