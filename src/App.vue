<template>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import planner from './components/planner.vue';
@Options({
  components: {
    planner,
  },
})

export default class App extends Vue {}
</script>

<style lang='less'>
@import "@/style/common"; 

#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @foreground;
  height: 100%;
}

body {
  height: 100vh;
  background-color: @bg;
  margin: 0;
}

.highlight {
  color: lightgreen;
}

</style>
