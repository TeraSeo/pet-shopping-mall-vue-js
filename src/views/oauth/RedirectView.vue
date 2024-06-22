<template>
    <div></div>
</template>

<script>
    import router from '@/router';
    import store from '@/store';

    export default {
        created() {
            const accessToken = this.$route.query.accessToken;
            const refreshToken = this.$route.query.refreshToken;
            const email = this.$route.query.email;

            if (accessToken && refreshToken) {
                store.commit('setAccessToken', accessToken);
                store.commit('setRefreshToken', refreshToken);
                store.commit('setVerifiedStatus', true);
                store.commit('setEmail', email);
                router.push({path: '/'})
            }
            else {
                router.push({path: '/login'})
            }
        }
    }
</script>