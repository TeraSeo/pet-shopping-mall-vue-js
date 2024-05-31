<template>
  logout
</template>

<script>

import router from '@/router';

export default {
    created() {
        router.push('/login');
    }
}
</script>

<style>

</style>