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

