import {ref, computed} from 'vue'

/* Manage sidebar state*/ 
export const collapsed = ref(true)
export const toggle_sidebar = () => (collapsed.value = !collapsed.value)

/*Manage sidebar size*/
export const SIDEBAR_WIDTH = 300
export const SIDEBAR_WIDTH_COLLAPSED = 80
export const sidebar_width = computed(
    () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
)


import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
        tictactoe: {
            players: ["❌","⭕"],
            x_state: [],
            y_state: [],
            x_turn: true,
            board: Array(9).fill(null),
            winner: '',
            scores: [],
        }
    }
  },
  mutations: {
    add_play (state,player,index) {
        /* Add player move to board and his player move history */
        if(player == 0){
            state.tictactoe.x_state.push(index);
        }else{
            state.tictactoe.y_state.push(index);
        }
        state.tictactoe.board[index] = players[player];
    },
    next_turn(state){
        x_turn = !x_turn;
    },
    add_score(state,winner){
        scores.push(winner);
    }
  }
})

const app = createApp({ App })

// Install the store instance as a plugin
app.use(store)