<template >
  <h1>❌⭕ Tic Tac Toe</h1>
  <h2>Player 1 : {{ players[0] }}</h2>
  <h2>Player 2 : {{ players[1] }}</h2>

  <div v-if="!ended">
    <h2>{{ this.players[0] }}'s turn !</h2>
    <TicTacToeBoardVue v-bind:board="this.board" @played="make_play"/>
  </div>
  <div v-if="ended && winner != ''" >
    <h1>{{ players[0] }} won the game !</h1>
  </div>
  
</template>

<script>

import { tictactoe } from './Store';
import TicTacToeBoardVue from './TicTacToeBoard.vue';

export default {
  name: "TicTacToe",
  props: {

  },
  components:{
    TicTacToeBoardVue
  },
  data() {
    return {
      ended: false,
      current_player: -1,
      board: tictactoe.board,
      players: ["❌","⭕"],
      
    };
  },
  beforeMount() {
    // tictactoe.x_turn = this.get_first_player()
  },
  methods: {
    next_player() {
      /*give next player*/
      this.current_player = (this.current_player == 1) ? 0 : 1;
    },

    get_first_player(){
      /*Return random index (0 or 1) in player list corresponding to the player which is starting the game*/ 
      return this.game.players[Math.floor(Math.random * this.players.length)]
    },

    check_draw() {
      return (this.board.includes(null, 0)) ? false : true;
    },

    make_play(index) {
      if (this.board[index] != null) {
        alert("Cheater spotted !");
      }
      else {
        this.board[index] = this.players[this.current_player];
        this.handle_play()
      }
    },

    handle_play() {
      if (this.has_win()) {
        this.ended=true;
        this.reset_game();
      } else if (this.check_draw()) {
        this.reset_game();
      } else {
        this.next_player();
      }
    },

    reset_game() {
      this.board = Array(9).fill(null);
      this.get_first_player();
    },

    has_win() {
      var won = false;
      //Check first row
      if (this.board[0] != null && this.board[0] == this.board[1] && this.board[2] == this.board[0]) {
        won = true;
      }
      //Check first column
      else if (this.board[0] != null && this.board[0] == this.board[3] && this.board[6] == this.board[0]) {
        won = true;
      }
      //Check second row
      else if (this.board[3] != null && this.board[3] == this.board[4] && this.board[5] == this.board[3]) {
        won = true;
      }
      //Check second column
      else if (this.board[1] != null && this.board[1] == this.board[4] && this.board[7] == this.board[1]) {
        won = true;
      }
      //Check third row
      else if (this.board[6] != null && this.board[6] == this.board[7] && this.board[8] == this.board[6]) {
        won = true;
      }
      //Check third column
      else if (this.board[2] != null && this.board[2] == this.board[5] && this.board[8] == this.board[2]) {
        won = true;
      }
      //Check top left to bottom right diagonal
      else if (this.board[0] != null && this.board[0] == this.board[4] && this.board[8] == this.board[0]) {
        won = true;
      }
      //Check top right to bottom left diagonal
      else if (this.board[2] != null && this.board[2] == this.board[4] && this.board[6] == this.board[2]) {
        won = true;
      }
      
      if (won){
        tictactoe.winner = tictactoe.players[won];
      }
      return won;
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
</style>