import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null
    },
    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token;
            localStorage.setItem('accessToken', token);
        },
        setRefreshToken(state, token) {
            state.refreshToken = token;
            localStorage.setItem('refreshToken', token);
        },
        clearToken(state) {
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    },
});

export default store