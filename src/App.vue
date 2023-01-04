<template>
  <SideBarRules />
  <TicTacToe />
</template>

<script>
import TicTacToe from './components/TicTacToe.vue'
import SideBarRules from './components/SideBarRules.vue'

export default {
  name: 'App',
  components: {
    TicTacToe,
    SideBarRules
  },
  setup(){

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
