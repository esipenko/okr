<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    {{ title }}
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text class="content">
                    <slot />
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="$emit('cancel')"> cancel </v-btn>
                    <v-btn text @click="$emit('submit')">
                        {{ action }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AccessControl from "./AccessControl.vue";

@Component({
    components: { AccessControl },
})
export default class RolesForm extends Vue {
    @Prop() title!: string;
    @Prop({ default: "save" }) action!: string;
    @Prop({ default: false }) dialog!: boolean;
}
</script>

<style scoped>
.content {
    padding-top: 20px !important;
}
</style>
