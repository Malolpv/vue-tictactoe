<template>
  <h1>❌⭕ Tic Tac Toe</h1>
  <h2>Player 1 : {{ player_1 }}</h2>
  <h2>Player 2 : {{ player_2 }}</h2>

  <h2>{{ this.players[current_player] }}'s turn !</h2>

  <div class="board">
    <div class="board-row">
      <button v-for="(item, index) in board.slice(0, 3)" v-bind:key="index" v-on:click="make_play(index)">{{ item
}}</button>
    </div>
    <div class="board-row">
      <button v-for="(item, index) in board.slice(3, 6)" v-bind:key="index" v-on:click="make_play(index + 3)">{{ item
}}</button>
    </div>
    <div class="board-row">
      <button v-for="(item, index) in board.slice(6, 9)" v-bind:key="index" v-on:click="make_play(index + 6)">{{ item
        }}</button>
    </div>

  </div>
</template>

<script>


export default {
  name: "TicTacToe",
  props: {

  },
  data() {
    return {
      current_player: "❌",
      board: Array(9).fill(null),
      players: ["❌","⭕"],
      game: {
        players: ["❌","⭕"],
        x_state: [],
        y_state: [],
        x_turn: true,
      }
    };
  },
  beforeMount() {
    this.get_first_player();
    //this.game.x_turn = this.get_first_player_v2()
  },
  methods: {
    next_player() {
      /*give next player*/
      this.current_player = (this.current_player == 1) ? 0 : 1;
    },

    get_first_player() {
      /* get the first player wich will start the game */
      this.current_player = Math.floor(Math.random() * this.players.length);
    },

    get_first_player_v2(){
      /*Return random index (0 or 1) in player list*/ 
      return this.game.players[Math.floor(Math.random * 2)]
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
        this.handle_play();
      }
    },

    handle_play() {
      if (this.has_win()) {
        alert(this.players[this.current_player] + " won the game !")
        this.reset_game();
      } else if (this.check_draw()) {
        alert("Draw !")
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