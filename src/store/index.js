import { createStore } from 'vuex'

export default createStore({
  state: {
    tictactoe: {
      players: ["❌", "⭕"],
      x_turn: 0,
      board: Array(9).fill(null),
      winner: '',
      scores: [],
    }
  },
  getters: {
    players: state => state.tictactoe.players,
    board: state => state.tictactoe.board,
    x_turn: state => state.tictactoe.x_turn,
    winner: state => state.tictactoe.winner,
    scores: state => state.tictactoe.scores,
    current_player: state => state.tictactoe.players[state.tictactoe.x_turn],
  },
  mutations: {
    set_first_player(state,player_index){
      /* Set the first player with given index */
      state.tictactoe.x_turn = player_index 
    },
    reset_game(state){
      
      state.tictactoe.board = Array(9).fill(null)
      state.tictactoe.winner = '' 
    },
    set_winner(state,winner_index){
      state.tictactoe.winner = state.tictactoe.players[state.tictactoe.x_turn] 
      state.tictactoe.scores.push(state.tictactoe.players[winner_index]) 
    },
    play(state,index){
      state.tictactoe.board[index] = state.tictactoe.players[state.tictactoe.x_turn]
    },
    next_player (state){
      state.tictactoe.x_turn = (state.tictactoe.x_turn == 0)? 1:0
    } 


  },
  actions: {
  },
  modules: {
  }
})
