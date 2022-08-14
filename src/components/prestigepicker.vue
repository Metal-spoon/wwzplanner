<template>
  <div class="flex-column prestige-wrapper">
    <span>Prestige:</span>
    <div class="flex-row flex-center prestige-picker">
      <div class="button" @click="lowerPrestige()" :class="{ 'disabled' : store.prestige === 0}">
          <font-awesome-icon icon="angle-left" size="1x" />
        </div>
      <span class="prestige-text">{{ store.prestige }}</span>
        <div class="button" @click="addPrestige()" :class="{ 'disabled': store.prestige === 4 }">
          <font-awesome-icon icon="angle-right" size="1x" />
        </div>
        
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { store } from "@/store";

export default defineComponent({
  name: "prestigePicker",
  data() {
    return {
      store
    }
  },
  methods: {
    addPrestige: function() {
      store.prestige = store.prestige + 1 > 4 ? 4 : store.prestige + 1
    },
    lowerPrestige: function() {
      store.prestige = store.prestige - 1 < 0 ? 0 : store.prestige - 1
    }
  }
});
</script>

<style lang="less" scoped>
  .space-between {
    justify-content: space-between;
  }

  .prestige-text {
    font-size: 30px;
  }

  .disabled {
    background-color: @foreground;
    color: darken(@foreground, 40);
    &:hover {
      background-color: @foreground;
    }
  }

  .prestige-picker {
    gap: 5px;
  }

  .prestige-wrapper {
    align-items: flex-start;
  }
</style>