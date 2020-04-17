<template>
    <div>
        <h2>Ranks {{ ok }}</h2>
        <ol>
            <li v-for="pl in ranks" :key="pl.name">
                {{ pl.name }}
                <router-link :to="'/play/'+pl.name"> Play!</router-link>
            </li>
        </ol>
        
        {{ ranks }}
    </div>
</template>

<script>
import { mapState } from 'vuex';


export default {
    data() {
        return { 
            ok:'ok' 
        };
    },
    computed: mapState({
        ranks: 'players',
        username: 'username',
    }),
    created() {
        if (this.username == "") {
            this.$router.push("/login");
        }
    }
}
</script>

<style scoped>

</style>