<template>
  <div class="modal flex-column flex-center" v-show="showModal">
    <div class="modal-content">
      <div class="flex-row modal-title">
        <span class="modal-title-text">Build overview</span>
      </div>
      <div class="flex-column">
        <ul class="perk-grid baseperk-grid">
          <li
            class="perk-grid-item"
            v-for="baseperk in basePerks"
            :key="baseperk"
          >
            <perkinfo :perk="baseperk" :showIcon="true" :iconWidth="75" :showIndicator="true"/>
          </li>
        </ul>
        <ul class="perk-grid">
          <li
            class="perk-grid-item"
            v-for="perk in selectedPerks"
            :key="perk"
          >
            <perkinfo :perk="perk" :showIcon="true" :iconWidth="75" :showIndicator="true"/>
          </li>
        </ul>
        <div class="indicator-disclaimer">
          <font-awesome-icon icon="people-group" /> Indicates perks that give a
          bonus to the whole team
        </div>
      </div>
      <div class="flex-column flex-center">
        <buildshareurl />
      </div>
      <div class="flex-row modal-controls">
        <div class="button" @click="showModal = false">Close</div>
        </div>
    </div>
  </div>
    <div class="button" @click="showModal = true">Show build summary</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "@/store";
import buildshareurl from "./buildshareurl.vue";
import Perkinfo from "./perkinfo.vue";

export default defineComponent({
  components: { buildshareurl, Perkinfo },
  name: "BuildOverview",
  data() {
    return {
      store,
      showModal: false,
    };
  },
  computed: {
    basePerks: function () {
      return store.selectedClass.perks
        .filter((perk) => perk.isBase && perk.selected)
        .sort();
    },
    selectedPerks: function () {
      return store.selectedClass.perks.filter(
        (perk) => !perk.isBase && perk.selected
      );
    },
  },
});
</script>

<style lang="less" scoped>

.modal-title {
  justify-content: space-between;
  align-items: center;
}

.modal-title-text {
  font-weight: bold;
  font-size: 30px;
}

.perk-grid {
  display: grid;
  list-style: none;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding-left: 0px;
  margin: 0;
  align-items: center;
}

.perk-grid-item {
  margin: 5px;
}

.baseperk-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.perk-icon {
  max-width: 75px;
}

.perk-text {
  text-align: left;
  padding-left: 5px;
  padding-right: 10px;
}

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

.teamwide-indicator {
  padding: 4px;
  border-radius: 20px;
}

.icon-wrapper {
  display: flex;
  position: relative;
}

.indicator-disclaimer {
  text-align: right;
}

.modal-controls {
  justify-content: right;
}
</style>