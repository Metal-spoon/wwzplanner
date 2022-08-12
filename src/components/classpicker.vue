<template>
  <div class="modal flex-column flex-center" v-show="showModal">
    <div class="modal-content">
      <div class="modal-title flex-row">
        <b> Pick a class: </b>
      </div>
      <ul class="class-list flex-column">
        <li
          v-for="wwzclass in classdata"
          :key="wwzclass"
          class="flex-row class-item"
          :class="{ selected: isSelected(wwzclass.id) }"
          @click="selectClass(wwzclass)"
        >
          <font-awesome-icon
            :icon="wwzclass.icon"
            size="4x"
            class="class-icon"
          />
          <div class="flex-column class-info">
            <b>{{ wwzclass.name }}</b>
            <span>{{ wwzclass.description }}</span>
          </div>
        </li>
      </ul>
      <div class="flex-row modal-controls">
        <div class="button" @click="showModal = false">
          Cancel
          <div></div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex-column label">
    <span>Selected class:</span>
    <div class="flex-row selectedclass-info">
      <font-awesome-icon
        :icon="store.selectedClass.icon"
        size="3x"
        class="class-icon"
      />
      <span class="selectedclass-name"> {{ store.selectedClass.name }} </span>
    </div>
  </div>
  <div class="button" @click="showModal = true">Change</div>
</template>

<script lang='ts'>
import { store } from "@/store";
import { wwzclass } from "@/models/wwzclass";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "classPicker",
  data() {
    return {
      store,
      showModal: false,
    };
  },
  methods: {
    isSelected: function (id: number) {
      return store.selectedClass.id === id;
    },
    selectClass: function (wwzclass: wwzclass) {
      if (store.selectedClass.id === wwzclass.id) {
        this.showModal = false;
        return;
      }
      store.selectedClass.resetPerks();
      store.selectedClass = wwzclass;
      this.showModal = false;
    },
  },
  props: {
    classdata: {
      type: Array as PropType<wwzclass[]>,
      required: true,
    },
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
  border: 2px solid transparent;
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

.selected {
  border-color: @redbg;
}

.selectedclass-name {
  font-weight: bold;
  font-size: 22px;
}

.label {
  align-items: flex-start;
}

.selectedclass-info {
  align-items: center;
  margin-top: 5px;
  gap: 5px;
}
</style>
