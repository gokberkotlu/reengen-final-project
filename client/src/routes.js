import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Factories from './pages/Factories'

export const routes = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/settings', name: 'Settings', component: Settings },
    { path: '/factories', name: 'Factories', component: Factories }
]