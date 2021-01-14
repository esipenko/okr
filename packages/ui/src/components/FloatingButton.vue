<template>
    <v-btn
        color="rgba(14, 187, 218, 1)"
        fab
        large
        dark
        bottom
        right
        class="floating-button"
    >
        <slot>
            <v-icon>mdi-plus-outline</v-icon>
        </slot>
    </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FloatingButton extends Vue {}
</script>

<style lang="scss" scoped>
.floating-button {
    position: fixed;
    right: 16px;
    bottom: 16px;
}
</style>
