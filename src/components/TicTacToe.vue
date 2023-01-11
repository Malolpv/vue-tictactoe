
<template >
  <h1>❌⭕ Tic Tac Toe</h1>

  <div class="row">
    <h2 v-for="(player) in this.$store.getters.players" v-bind:key="player">
      Player {{ player }}
    </h2>
  </div>

  <div v-if="!ended" id="game">
    <h2>{{ this.$store.getters.players[this.$store.getters.x_turn] }}'s turn !</h2>
    <TicTacToeBoardVue v-bind:board="this.$store.getters.board" @played="make_play" />
  </div>

  <div v-if="ended && this.$store.getters.winner != ''">
    <h1>{{ this.$store.getters.winner }} won the game !</h1>
    <button @click="this.restart_game">Restart</button>
  </div>

  <div v-if="draw">
    <h2>Draw !</h2>
    <button @click="this.restart_game">Restart</button>
  </div>


</template>

<script>

import TicTacToeBoardVue from './TicTacToeBoard.vue'

export default {
  name: "TicTacToe",
  props: {

  },
  components: {
    TicTacToeBoardVue
  },
  data() {
    return {
      ended: false,
      draw: false,
    }
  },
  beforeMount() {
    this.set_first_player_random()
  },
  methods: {
    next_player() {
      /*give next player*/
      this.$store.commit('next_player')
    },

    set_first_player_random() {
      /*Return random index (0 or 1) in player list corresponding to the player which is starting the game*/
      this.$store.commit('set_first_player', Math.floor(Math.random() * this.$store.getters.players.length))
    },

    check_draw() {
      return (this.$store.getters.board.includes(null, 0)) ? false : true
    },
    handle_draw(){
      var nodes = document.getElementById("game").getElementsByTagName('*');
      for(var i = 0; i < nodes.length; i++){
        nodes[i].disabled = true;
      }
    },

    make_play(index) {
      if (this.$store.getters.board[index] != null) {
        alert("Cheater spotted !")
      }
      else {
        this.$store.commit('play', index)
        this.handle_play()
      }
    },

    handle_play() {

      if (this.has_win()) {
        this.ended = true
        this.$store.commit("set_winner", this.$store.current_player)
      } else if (this.check_draw()) {
        this.handle_draw()
        this.draw = true
      } else {
        this.next_player()
      }
    },

    restart_game(winner = -1) {
      if (winner > -1) {
        this.$store.commit('set_first_player', winner)
      }
      this.$store.commit('reset_game')
      if(this.draw){
        var nodes = document.getElementById("game").getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++){
          nodes[i].disabled = false;
        }
      }
        
      this.ended = false 
      this.draw = false
    },
    check_line(line_index, side_length) {
      /*check the line at the specified index */
      const start_index = line_index * side_length
      const end_index = start_index + side_length
      var line = this.$store.getters.board.slice(start_index, end_index)
      return line.every((current_value) => current_value != null && current_value === line[0])
    },
    check_column(column_index, side_length) {
      /*check the column at the specified index */
      var column = Array()
      for (let i = column_index; i < side_length * side_length; i += side_length) {
        column.push(this.$store.getters.board[i])
      }
      return column.every((current_value) => current_value != null && current_value === column[0])
    },
    check_diagonal_lr(side_length) {
      /*check the top left to bottom rigth diagonal */
      var diagonal = Array()
      for (let i = 0; i <= this.$store.getters.board.length; i += side_length + 1) {
        diagonal.push(this.$store.getters.board[i])
      }
      return diagonal.every((current_value) => current_value != null && current_value === diagonal[0])
    },
    check_diagonal_rl(side_length) {
      /*check the top Rigth to bottom left diagonal */
      var diagonal = Array()
      for (let i = side_length - 1; i <= this.$store.getters.board.length - side_length; i += side_length - 1) {
        diagonal.push(this.$store.getters.board[i])
      }
      return diagonal.every((current_value) => current_value != null && current_value === diagonal[0])
    },
    has_win() {
      /*check if a player has win */
      const board_side_length = Math.sqrt(this.$store.getters.board.length)
      let i = 0
      let winner = false
      while (i < board_side_length && winner == false) {
        if (this.check_column(i, board_side_length) || this.check_line(i, board_side_length))
          winner = true
        i++
      }
      if (!winner && (this.check_diagonal_lr(board_side_length) || this.check_diagonal_rl(board_side_length)))
        winner = true
      return winner
    }


  }
}
</script>


<style>
button {
  border: 1px solid black;
  min-width: 75px;
  min-height: 50px;
  background-color: transparent;
  font-weight: bold;
}

.board {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board-row {
  display: flex;
  flex-direction: row;

}

.row {
  display: flex;
  flex-direction: row;

  text-align: left;
  justify-content: center;
}
</style>