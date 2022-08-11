<template>
  <div class="flex-column">
    <span>Prestige:</span>
    <div class="flex-row space-between flex-center">
      <span class="prestige-text">{{ store.prestige }}</span>
      <div class="flex-column">
        <div class="button" @click="addPrestige()">
          <font-awesome-icon icon="angle-up" size="1x" />
        </div>
        <div class="button" @click="lowerPrestige()">
          <font-awesome-icon icon="angle-down" size="1x" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { store } from "@/store";

export default defineComponent({
  name: "prestigePicker",
  props: {
    prestige: {
      type: Number,
      required: true,
    },
    
  },
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
</style>