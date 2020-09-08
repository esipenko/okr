<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld :msg="msg" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

@Component({
    components: {
        HelloWorld,
    },
})
export default class Home extends Vue {
    msg = "";

    mounted() {
        axios.get(process.env.VUE_APP_URL).then((resp) => {
            this.msg = resp.data;
        });
    }
}
</script>
