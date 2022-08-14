<template>
  <div class="modal flex-column flex-center" v-show="show">
    <div class="modal-content">
      <div class="modal-title">
      <span class="modal-title-text">{{ title }}</span>
    </div>
      <slot></slot>
    <div class="flex-row modal-controls">
      <slot name="modal-controls"></slot>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "modalDialog",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true
    }
  },
});
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
}

.modal-content {
  display: flex;
  flex-direction: column;
  background-color: #141516;
  padding: 10px;
  margin: 20px;
  max-height: 100%;
  overflow-y: auto;
  border: 2px solid @foreground;
  gap: 10px;
}

.modal-title-text {
  font-weight: bold;
  font-size: 30px;
}

.modal-controls {
  justify-content: right;
}
</style>