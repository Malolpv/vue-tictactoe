<template>

    <div class="board">
        <div class="board-row">
            <button v-for="(item, index) in this.board.slice(0, 3)" v-bind:key="index" v-on:click="handle_click(index)">{{
        item
}}</button>
        </div>
        <div class="board-row">
            <button v-for="(item, index) in this.board.slice(3, 6)" v-bind:key="index"
                v-on:click="handle_click(index + 3)">{{
        item
}}</button>
        </div>
        <div class="board-row">
            <button v-for="(item, index) in this.board.slice(6, 9)" v-bind:key="index"
                v-on:click="handle_click(index + 6)">{{
        item
                }}</button>
        </div>

    </div>

</template>

<script>

export default {
    name: 'TicTacToeBoard',
    props: {
        board: Array,
    },
    data() {
        return {

        }
    },
    methods: {
        handle_click(index) {
            this.$emit('played',index)
            
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