<template>
    <div>
        <input type="text" v-model="username" @keyup.enter="login" placeholder="Insert the username" />
        <button :disabled="disabled" @click="login">Login!</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: ""
        };
    },
    computed: {
        disabled() {
            return this.username == "";
        }
    },
    methods: {
        login() {
            this.$store.commit('setUsername', this.username);
            this.$store.commit('initRanks');
            this.$router.push('/ranks');
        }
    }
}
</script>
<style scoped>

</style>