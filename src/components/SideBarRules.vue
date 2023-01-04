<template>
    
    <div class="sidebar" :style="{width: sidebar_width}">
        <span class="collapse-title" :class="{'rotate-90': collapsed}" @click="toggle_sidebar">
            <h2>RULES</h2>

            <ul>
                <span v-if="!collapsed">
                    <li><p>Jeu qui se joue à deux joueurs, sur un damier de 3 cases par 3 cases.</p></li>
                    <li><p>Chaque joueur est représenté par un "symbole"</p></li>
                    <li><p>Un joueur utilise toujours le même type de "symbole"</p></li>
                    <li><p>Un premier joueur dessine son symbole sur une case. Puis c'est au tour de l'autre joueur de dessiner son symbole sur une case vide</p></li>
                    <li><p>Le but du jeu est de réussir à aligner ses trois symboles (horizontal, vertical ou diagonale), on remporte alors la partie</p></li>
                </span>
            </ul>
        </span>
    </div>
    
</template>

<script>
import { collapsed, toggle_sidebar, sidebar_width } from './Store';

export default {
    name: "SideBarRules",
    props: {},
    setup(){
        return {collapsed,toggle_sidebar,sidebar_width}
    }
}
</script>

<style>
:root{
    --sidebar-bg-color: #2f855a;
    --sidebar-item-hover: #38a169;
    --sidebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar{
    color: white;
    background-color: var(--sidebar-bg-color);
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    
    transition: 1s ease;

    display: flex;
    flex-direction: column;
}

.collapse-title {
    position: absolute;
    top: 0;
    padding: 0.75em;

    color: rgba(255, 255,255,0.7);
    transition: 0.2s linear; 
}

.rotate-90{
    transform: rotate(90deg);
    transition:  0.2s linear;
}

h2{
    color: white;
}
</style>