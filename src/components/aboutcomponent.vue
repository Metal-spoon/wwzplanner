<template>
  <modaldialog title="About" :show="showModal"> 
    <span>WWZ planner v1.0.0</span>
    <span>Made by <a href="https://github.com/Metal-spoon">David a.k.a metal-spoon</a></span>
    <span>Source code available at: <a href="https://github.com/Metal-spoon/wwzplanner">https://github.com/Metal-spoon/wwzplanner</a></span>
    <span>If you have any suggestions or find a bug, feel free to open an issue on github</span>
    <span>I do not own any rights to World War Z (the game nor the movie), all rights belong to their respective owners</span>
    <span>Made with Vue</span>
      <template #modal-controls>
        <div class="button" @click="showModal = false">Close</div>
      </template>
  </modaldialog>
  <div class="button" @click="showModal = true">About</div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import modaldialog from "@/components/subcomponents/modaldialog.vue";

export default defineComponent({
  name: 'aboutComponent',
  components: { modaldialog },
  data() {
    return {
      showModal: false
    }
  }

})
</script>

<style lang='less' scoped>
a {
  color: inherit;
  &:visited {
    color: inherit;
  }
}

</style>