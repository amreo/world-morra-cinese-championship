<template>
    <div>
        <h2>Ranks {{ ok }}</h2>
        <table class="rank-table">
            <tr>
                <th>Player</th>
                <th>ELO</th>
                <th>Play</th>
            </tr>
            <tr v-for="pl in ranks" :key="pl.name">
                <td>{{ pl.name }}</td>
                <td>{{ pl.elo }}</td>
                <td><router-link :to="'/play/'+pl.name"> Play!</router-link></td>
            </tr>
        </table>
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
    .rank-table {
        border: 1px solid black;
    }
    .rank-table tr {
        border: 1px solid black;
    }
    .rank-table td {
        border: 1px solid black;
    }
</style>