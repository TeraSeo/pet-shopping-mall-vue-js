import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        email: localStorage.getItem('email') || null,
        isVerified: localStorage.getItem('isVerified') || false,
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
        setEmail(state, email) {
            state.email = email;
            localStorage.setItem('email', email);
        },
        setVerifiedStatus(state, isVerified) {
            state.isVerified = isVerified;
            localStorage.setItem('isVerified', isVerified);
        },
        clearToken(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.email = null;
            state.isVerified = false;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('email');
            localStorage.removeItem('isVerified');
        }
    },
});

export default store