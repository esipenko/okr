<template>
    <v-btn
        color="rgba(14, 187, 218, 1)"
        fab
        large
        dark
        bottom
        right
        class="open-form-button"
        @click.native="dialog = true"
    >
        <v-icon>mdi-plus-outline</v-icon>
    </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class OpenFormButton extends Vue {}
</script>

<style lang="scss" scoped>
.open-form-button {
    position: fixed;
    right: 16px;
    bottom: 16px;
}
</style>
