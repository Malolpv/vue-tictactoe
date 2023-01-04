<template >
  <h1>❌⭕ Tic Tac Toe</h1>
  
  <div class="row">
    <h2 v-for="(player) in this.$store.getters.players" v-bind:key="player">
      Player {{ player }}   
    </h2>
  </div>

  <div v-if="!ended">
    <h2>{{ this.$store.getters.players[this.$store.getters.x_turn] }}'s turn !</h2>
    <TicTacToeBoardVue v-bind:board="this.$store.getters.board" @played="make_play"/>
  </div>
  <div v-if="ended && this.$store.getters.winner != ''" >
    <h1>{{ this.$store.getters.winner }} won the game !</h1>
    <button @click="this.restart_game">Restart</button>
  </div>
  <div v-if="draw">
    <button @click="this.restart_game">Restart</button>
  </div>
  
  
</template>

<script>

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
      draw: false,
    };
  },
  beforeMount() {
    this.set_first_player_random()
  },
  methods: {
    next_player() {
      /*give next player*/
      this.$store.commit('next_player');
    },

    set_first_player_random(){
      /*Return random index (0 or 1) in player list corresponding to the player which is starting the game*/ 
      this.$store.commit('set_first_player',Math.floor(Math.random() * this.$store.getters.players.length))
    },

    check_draw() {
      return (this.$store.getters.board.includes(null, 0)) ? false : true;
    },

    make_play(index) {
      if (this.$store.getters.board[index] != null) {
        alert("Cheater spotted !");
      }
      else {
        //this.$store.getters.board[index] = this.$store.getters.players[this.$store.getters.current_player];
        this.$store.commit('play',index);
        this.handle_play()
      }
    },

    handle_play() {
      
      if (this.has_win()) {
        this.ended=true;
        this.$store.commit("set_winner",this.$store.current_player)
      } else if (this.check_draw()) {
        this.draw = true;
      } else {
        this.next_player();
      }
    },

    restart_game(winner = -1) {
      if(winner > -1){
        this.$store.commit('set_first_player',winner);
      }
      this.$store.commit('reset_game');
      this.ended = false;
      this.draw = false;
    },

    has_win() {
      var won = false;
      //Check first row
      if (this.$store.getters.board[0] != null && this.$store.getters.board[0] == this.$store.getters.board[1] && this.$store.getters.board[2] == this.$store.getters.board[0]) {
        won = true;
      }
      //Check first column
      else if (this.$store.getters.board[0] != null && this.$store.getters.board[0] == this.$store.getters.board[3] && this.$store.getters.board[6] == this.$store.getters.board[0]) {
        won = true;
      }
      //Check second row
      else if (this.$store.getters.board[3] != null && this.$store.getters.board[3] == this.$store.getters.board[4] && this.$store.getters.board[5] == this.$store.getters.board[3]) {
        won = true;
      }
      //Check second column
      else if (this.$store.getters.board[1] != null && this.$store.getters.board[1] == this.$store.getters.board[4] && this.$store.getters.board[7] == this.$store.getters.board[1]) {
        won = true;
      }
      //Check third row
      else if (this.$store.getters.board[6] != null && this.$store.getters.board[6] == this.$store.getters.board[7] && this.$store.getters.board[8] == this.$store.getters.board[6]) {
        won = true;
      }
      //Check third column
      else if (this.$store.getters.board[2] != null && this.$store.getters.board[2] == this.$store.getters.board[5] && this.$store.getters.board[8] == this.$store.getters.board[2]) {
        won = true;
      }
      //Check top left to bottom right diagonal
      else if (this.$store.getters.board[0] != null && this.$store.getters.board[0] == this.$store.getters.board[4] && this.$store.getters.board[8] == this.$store.getters.board[0]) {
        won = true;
      }
      //Check top right to bottom left diagonal
      else if (this.$store.getters.board[2] != null && this.$store.getters.board[2] == this.$store.getters.board[4] && this.$store.getters.board[6] == this.$store.getters.board[2]) {
        won = true;
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

.row{
  display: flex;
  flex-direction: row;
  
  text-align: left;
  justify-content: center;
}
</style>