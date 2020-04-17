<template>
    <div>
        <p>Battle {{ username }}({{player1Points}}) VS {{ opponent.name }}({{player2Points}})</p>
        <table class="round-table">
            <tr>
                <th>Round</th>
                <th>{{ username }} move</th>
                <th>{{ opponent.name }} move</th>
            </tr>
            <tr v-for="(mv, i) in moves" :key="mv.id">
                <td>#  {{ i }}</td>
                <td>{{ mv.user1 }}</td>
                <td>{{ mv.user2 }}</td>
            </tr>
        </table>
        <button :disabled="isMatchFinished" @click="chooseMove('P')">P</button>
        <button :disabled="isMatchFinished" @click="chooseMove('R')">R</button>
        <button :disabled="isMatchFinished" @click="chooseMove('X')">X</button>
        <p v-if="isMatchFinished">Match finished.</p>
    </div>
</template>

<script>
export default {
    data() {
        return { 
            ok:'ok',
            moves: [
            ],
            lastID: 0,
            isMatchFinished: false,
            player1Points: 0,
            player2Points: 0,
        };
    },
    computed: {
        opponentUsername() {
            return this.$route.params["id"];
        },
        username() {
            return this.$store.getters.username;
        }, 
        opponent() {
            return this.$store.getters.players.filter(item => item.name == this.opponentUsername)[0];
        }
    },
    created() {
        if (this.username == "") {
            this.$router.push("/login");
        }
        console.log();
    },
    methods: {
        chooseMove(symbol) {
            //AI choose the move
            let aiMove = "";

            switch (this.opponent.type) {
                case 'user':
                    console.error("user cannot compete to the user");
                    this.$router.push('/ranks');
                    break;
                case 'ia-god':
                    aiMove = 'W';
                    break;
                case 'ia-anti-god':
                    aiMove = 'L';
                    break;
                case 'ia-prob':
                    var probSum = this.opponent.probs['P'] + this.opponent.probs['R'] + this.opponent.probs['X'];
                    var probP = this.opponent.probs['P']/probSum;
                    var probR = this.opponent.probs['R']/probSum;
                    var res = Math.random();
                    if (res <= probP) {
                        aiMove = 'P';
                    } else if (res <= probP+probR) {
                        aiMove = 'R';
                    } else {
                        aiMove = 'X';
                    }
                    break;
            }

            if (symbol == aiMove) {
                this.player1Points += 0.5;
                this.player2Points += 0.5;
            }

            
        }
    }
}
</script>
<style scoped>
    .round-table {
        border: 1px solid black;
    }
    tr  {
        border: 1px solid black;
    }
    td  {
        border: 1px solid black;
    }
</style>