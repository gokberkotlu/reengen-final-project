import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'
import { serverUrl } from '../utils/serverUrl'
import { router } from '../main'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token'),
        expiresIn: null,
        authority: null,
        name: null,
        email: null
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getExpiresIn(state) {
            return state.expiresIn;
        },
        getAuthority(state) {
            return state.authority;
        },
        getName(state) {
            return state.name;
        },
        getEmail(state) {
            return state.email;
        },
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        },
        setExpiresIn(state, payload) {
            state.expiresIn = payload
        },
        setAuthority(state, payload) {
            state.authority = payload
        },
        setName(state, payload) {
            state.name = payload
        },
        setEmail(state, payload) {
            state.email = payload
        },
    },
    actions: {
        signup({ commit }, payload) {
            axios({
                method: 'post',
                url: `${serverUrl}/signup`,
                data: payload
            })
            .then(res => {
                if(res.status === 200) {
                    commit('setToken', res.data.token);
                    localStorage.setItem("token", res.data.token);
                    router.push('/factories');
                }
            });
        },
        login({ commit }, payload) {
            axios({
                method: 'post',
                url: `${serverUrl}/login`,
                data: payload.form
            })
            .then(res => {
                if(res.status === 200) {
                    commit('setToken', res.data.token);
                    commit('setExpiresIn', res.data.expiresIn);
                    commit('setAuthority', res.data.authority);
                    commit('setName', res.data.name);
                    commit('setEmail', res.data.email);
                    if(payload.remember) {
                        localStorage.setItem("token", res.data.token);
                    }
                    router.push('/factories');
                }
            });
        },
        logout({ commit }) {
            commit('setToken', null);
            commit('setExpiresIn', null);
            commit('setAuthority', null);
            commit('setName', null);
            commit('setEmail', null);
            localStorage.removeItem("token");
            router.push('/login');
        },
        checkToken({ commit }) {
            const token = localStorage.getItem('token');
            if(token) {
                axios({
                    method: 'post',
                    url: `${serverUrl}/check-token`,
                    data: { token }
                })
                .then(res => {
                    if(res.status === 200) {
                        commit('setAuthority', res.data.authority);
                        commit('setName', res.data.name);
                        commit('setEmail', res.data.email);
                    }
                });
            }
        }
    },
});