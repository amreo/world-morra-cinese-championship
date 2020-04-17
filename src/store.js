import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username: '',
        players: []
    },
    mutations: {
        setUsername(state, newUsername) {
            state.username = newUsername;
        },
        addPlayer(state, playerInfo) {
            state.players.push(playerInfo);
        },
        initRanks(state) {
            state.players.push({
                'name': state.username,
                'type': 'user'
            });
            state.players.push({
                'name': 'god',
                'type': 'ia-god'
            });
            state.players.push({
                'name': 'antigod',
                'type': 'ia-anti-god'
            });
            
            let number = (Math.random()*20) | 0+10;

            for (let i=0; i< number; i++) {
                state.players.push({
                    'name': 'probot-' + i,
                    'type': 'ia-prob' ,
                    'probs': {
                        'P': Math.random(),
                        'R': Math.random(),
                        'S': Math.random()
                    }
                });
            }
        }
    },
    getters: {
        username(state) {
            return state.username;
        },
        players(state) {
            return state.players;
        }
    },
});