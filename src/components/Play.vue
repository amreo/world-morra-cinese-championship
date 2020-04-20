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
        <p v-if="isMatchFinished">Match finished. <router-link to="/ranks"> Back</router-link></p>
    </div>
</template>

<script>

const MOVES_DAMAGE_TABLE = {
    'P': ['R', 'X'],
    'R': ['X', 'P'],
    'X': ['P', 'R']
}

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
        },
        player() {
            return this.$store.getters.players.filter(item => item.name == this.username)[0];
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
                    aiMove = MOVES_DAMAGE_TABLE[symbol][1];
                    break;
                case 'ia-anti-god':
                    aiMove = MOVES_DAMAGE_TABLE[symbol][0];
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
            } else if (MOVES_DAMAGE_TABLE[symbol][0] == aiMove) {
                this.player1Points += 1;
                this.player2Points += 0;
            } else {
                this.player1Points += 0;
                this.player2Points += 1;
            }

            this.moves.push({ id: ++this.lastID, user1: symbol, user2: aiMove});
            if ((this.moves.length >= 5 && this.player1Points != this.player2Points) || this.moves.length >= 10) {
                this.isMatchFinished = true;
                if (this.player1Points > this.player2Points) {
                    this.$store.commit('updateElo', { "name": this.username, "elo": this.player.elo+100*this.player1Points/(this.player1Points+this.player2Points) });
                    this.$store.commit('updateElo', { "name": this.opponentUsername, "elo": this.opponent.elo-100*this.player1Points/(this.player1Points+this.player2Points) });
                } else if (this.player1Points < this.player2Points) {
                    this.$store.commit('updateElo', { "name": this.username, "elo": this.player.elo-100*this.player2Points/(this.player1Points+this.player2Points) });
                    this.$store.commit('updateElo', { "name": this.opponentUsername, "elo": this.opponent.elo+100*this.player2Points/(this.player1Points+this.player2Points) });
                }
            }
        }
    }
}
</script>
<style scoped>
    .round-table {
        border: 1px solid black;
    }
    .round-table tr td  {
        border: 1px solid black;
    }
    .round-table tr th  {
        border: 1px solid black;
    }
</style>