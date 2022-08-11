<template>
  <div :class="[{ showOnHover: hover }, { show: show }, 'tooltip-container']">
    <slot />
    <div class="tooltip" ref="tooltip">
      <span v-if="perk" class="text">
        {{ perk.Description }}
      </span>
      <span v-if="text" class="text">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToolTip",
  props: {
    perk: {
      type: Object,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    hover: {
      type: Boolean,
      required: true,
    },
    show: {
      type: Boolean,
      required: false,
    },
  },
});
</script>

<style lang="less" scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.showOnHover:hover .tooltip {
  opacity: 1;
}

.show .tooltip {
  opacity: 1;
}

.tooltip {
  color: #ffffff;
  text-align: center;
  padding: 5px 0;
  border-radius: 2px;

  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;

  opacity: 0;
  transition: opacity 1s;

  position: absolute;
  z-index: 1;

  background: #000000;
}

.text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #000000 transparent transparent transparent;
}
</style>