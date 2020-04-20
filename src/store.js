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
                'type': 'user',
                'elo': 1500
            });
            state.players.push({
                'name': 'god',
                'type': 'ia-god',
                'elo': 9999
            });
            state.players.push({
                'name': 'antigod',
                'type': 'ia-anti-god',
                'elo': 0
            });
            
            let number = (Math.random()*20) | 0+10;

            for (let i=0; i< number; i++) {
                state.players.push({
                    'name': 'probot-' + i,
                    'type': 'ia-prob' ,
                    'probs': {
                        'P': 0.5+Math.random(),
                        'R': 0.5+Math.random(),
                        'X': 0.5+Math.random()
                    },
                    'elo': 1500
                });
            }
        },
        updateElo(state, newELOInfo) {
            state.players.filter(item => item.name == newELOInfo["name"])[0].elo = newELOInfo["elo"];
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