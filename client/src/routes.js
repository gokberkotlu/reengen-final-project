import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Factories from './pages/Factories'
import FactoryDetails from './pages/FactoryDetails'
import { store } from './store/store'

export const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/factories',
        name: 'Factories',
        component: Factories,
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