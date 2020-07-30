import Restservice from "../Restservice";
import axios from 'axios';

export default {

    state: {
        token: localStorage.getItem('token') || '',
        userId: localStorage.getItem('userId') || '',
    },
    mutations: {
        login(state, user) {
            state.token = user.token;
            state.userId = user.userId;
        }
    },
    actions: {
        login({commit}, user) {
            Restservice.login(user).then(response => {
                if (response.data.login) {
                    commit('login', response.data.login);
                    localStorage.setItem('token', response.data.login.token);
                    localStorage.setItem('userId', response.data.login.userId);
                    axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.login.token;
                }
            })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    getters: {
        token: state => {
            return state.token;
        },
        userId: state => {
            return state.userId;
        }
    }
}