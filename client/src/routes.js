import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Factories from './pages/Factories'
import FactoryDetails from './pages/FactoryDetails'
import { store } from './store/store'

export const routes = [
    {
        path: '/',
        beforeEnter(to, from, next) {
            if(!store.getters.getToken) {
                next('/login');
            } else {
                next('/factories');
            }
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter(to, from, next) {
            if(!store.getters.getToken) {
                next();
            } else {
                next('/');
            }
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter(to, from, next) {
            if(!store.getters.getToken) {
                next();
            } else {
                next('/');
            }
        }
    },
    {
        path: '/factories',
        name: 'Factories',
        component: Factories,
        beforeEnter(to, from, next) {
            if(store.getters.getToken) {
                next();
            } else {
                next('/login');
            }
        }
    },
    {
        path: '/factory-details',
        name: 'FactoryDetails',
        component: FactoryDetails,
        beforeEnter(to, from, next) {
            console.log(store.getters.getToken);
            next();
            if(store.getters.getToken) {
                next();
            } else {
                next('/login');
            }
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    }
]