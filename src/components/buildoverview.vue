<template>
  <div class="modal flex-column flex-center" v-show="showModal">
    <div class="modal-content">
      <div class="flex-row modal-title">
        <span class="modal-title-text">Build overview</span>
        <div class="x-button" @click="showModal = false">
          <font-awesome-icon size="2x" icon="xmark" />
        </div>
      </div>
      <div class="flex-column">
        <ul class="perk-grid baseperk-grid">
          <li
            class="perk-info flex-row flex-center"
            v-for="baseperk in basePerks"
            :key="baseperk"
          >
            <img class="perk-icon" :src="baseperk.icon" />
            <div class="perk-text">
              <div class="perk-title">
                <b>{{ baseperk.Name }}</b>
                <div v-show="baseperk.teamWide" class="teamwide-indicator">
                  <font-awesome-icon icon="people-group" />
                </div>
              </div>
              <span class="perk-description">{{ baseperk.Description }}</span>
            </div>
          </li>
        </ul>
        <ul class="perk-grid">
          <li
            class="perk-info flex-row flex-center"
            v-for="perk in selectedPerks"
            :key="perk"
          >
            <img class="perk-icon" :src="perk.icon" />
            <div class="perk-text perk-text-selected">
              <div class="perk-title">
                <b>{{ perk.Name }}</b>
                <div v-show="perk.teamWide" class="teamwide-indicator">
                  <font-awesome-icon icon="people-group" />
                </div>
              </div>
              <span class="perk-description">{{ perk.Description }}</span>
            </div>
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
    </div>
  </div>
  <div class="button" @click="showModal = true">Show build summary</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "@/store";
import { wwzclass } from "@/models/wwzclass";
import buildshareurl from "./buildshareurl.vue";

export default defineComponent({
  components: { buildshareurl },
  name: "BuildOverview",
  props: {
    selectedClass: {
      type: wwzclass,
      required: true,
    },
  },
  data() {
    return {
      store,
      showModal: false,
    };
  },
  computed: {
    basePerks: function () {
      return this.selectedClass.perks
        .filter((perk) => perk.isBase && perk.selected)
        .sort();
    },
    selectedPerks: function () {
      return this.selectedClass.perks.filter(
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
}

.baseperk-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.perk-icon {
  max-width: 75px;
}

.perk-info {
  position: relative;
  margin: 10px;
  justify-content: flex-start;
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
}

.x-button {
  display: flex;
  color: #f2bebf;
  &:hover {
    cursor: pointer;
    background-color: lighten(#6a2728, 10);
  }
  > svg {
    width: 1em;
  }
  background-color: #6a2728;
  z-index: 999;
}

.button {
  background-color: #6a2728;
  padding: 10px;
  color: #f2bebf;
  font-weight: bold;
  max-width: fit-content;
  &:hover {
    cursor: pointer;
    background-color: lighten(#6a2728, 10);
  }
}

.teamwide-indicator {
  padding: 4px;
  border-radius: 20px;
}

.icon-wrapper {
  display: flex;
  position: relative;
}

.perk-title {
  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.indicator-disclaimer {
  text-align: right;
}
</style>