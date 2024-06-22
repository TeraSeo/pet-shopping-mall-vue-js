import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        email: localStorage.getItem('email') || null,
        isVerified: localStorage.getItem('isVerified') || false,
        userId: localStorage.getItem('userId') || null
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
        setUserIdStatus(state, userId) {
            state.userId = userId;
            localStorage.setItem('userId', userId);
        },
        clearToken(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.email = null;
            state.isVerified = false;
            state.userId = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('email');
            localStorage.removeItem('isVerified');
            localStorage.removeItem('userId');
        }
    },
});

export default store