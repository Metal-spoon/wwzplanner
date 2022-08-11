<template>
  <div class="modal flex-column flex-center" v-show="showModal">
    <div class="modal-content">
      <div class="modal-title flex-row">
          <b> Pick a class: </b>
      </div>
        <ul class="class-list flex-column">
          <li v-for="wwzclass in classdata" :key="wwzclass" class="flex-row class-item">
            <font-awesome-icon :icon="wwzclass.icon" size="4x" fixedWidth=true class="class-icon"/>
            <div class="flex-column class-info">
              <b>{{wwzclass.name}}</b>
              <span>{{wwzclass.description}}</span>
            </div>
          </li>
        </ul>
        <div class="flex-row modal-controls">
          <div class="button" @click="showModal = false">
          Cancel
          <div> 
        </div>
    </div>
  </div>
  </div>
  </div>
  <div class="button" @click="showModal = true">
    Click me
  </div> 
</template>

<script lang='ts'>
import { store } from "@/store";

export default {
  name: "classPicker",
  data() {
    return {
      store,
      showModal: false,
    };
  },
  props: {
    classdata: {
      type: Array,
      required: true,
    },
  },
};
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
}

.class-list {
  list-style: none;
  text-align: left;
  padding: 0;
}

.class-item {
  max-width: 60ch;
  padding: 10px;
  align-items: center;
  &:hover {
    background-color: lighten(@bg, 10);
    cursor: pointer;
  }
}

.class-info {
  margin-left: 10px;
}

.class-icon {
  flex-shrink: 0;
}

.modal-title {
  font-size: 24px;
}

.modal-controls {
  justify-content: flex-end;
}
</style>
