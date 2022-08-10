<template>
  <div class="flex-column flex-center">
    <h1>World War Z build planner</h1>
    <div class="content-wrapper">
      <div class="flex-row">
        <div>
          <select
            id="classlist"
            @change="selectClass(parseInt($event.target.value))"
          >
            <option
              v-for="(wwzclass, classIndex) in classData"
              :value="classIndex"
              :key="classIndex"
            >
              {{ wwzclass.name }}
            </option>
          </select>
          <span>Prestige:</span>

          <input type="number" min="0" max="4" v-model="store.prestige" />
        </div>
        <buildoverview :selectedClass="selectedClass" />
      </div>
      <perkpicker
        :selectedClass="selectedClass"
        :prestige="store.prestige"
        :perkParam="perkParam"
      />
    </div>
    <div></div>
    <div>
      <buildshareurl />
    </div>
  </div>
</template>

<style lang="less" scoped>
.flex-row {
  justify-content: space-between;
}

.content-wrapper {
  max-width: fit-content;
}
</style>

<script lang='ts'>
import { defineComponent } from "vue";
import perkpicker from "./perkpicker.vue";
import buildshareurl from "./buildshareurl.vue";
import json from "../assets/data.json";
import buildoverview from "./buildoverview.vue";
import { wwzclass } from "@/models/wwzclass";
import { plainToInstance } from "class-transformer";
import { store } from "../store";

export default defineComponent({
  // eslint-disable-next-line
  name: "Planner",
  components: { perkpicker, buildshareurl, buildoverview },
  data(): {
    classData: wwzclass[];
    selectedClass: wwzclass;
    perkParam: string;
    store: any;
  } {
    return {
      classData: plainToInstance(wwzclass, json.classdata),
      selectedClass: new wwzclass(),
      perkParam: "",
      store,
    };
  },
  created() {
    this.selectedClass = this.classData[0];
    if (this.$route.path === "/") return;
    let classParam = String(this.$route.params.class);
    let perkParam = String(this.$route.params.perks);
    let prestigeParam = String(this.$route.params.prestige);

    if (this.verifyParameters(classParam, perkParam, prestigeParam)) {
      store.prestige = Number(prestigeParam);
      this.selectedClass = this.classData[Number(classParam)] as wwzclass;
      this.perkParam = String(perkParam);
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    verifyParameters: function (
      classParam: string,
      perkParam: string,
      prestigeParam: string
    ) {
      if (!classParam && !perkParam && !prestigeParam) {
        console.error("invalid build URL: missing parameter");
        return false;
      }

      let isClassParamValid = /^([0-7])?$/.test(classParam);
      if (!isClassParamValid) {
        console.error(
          "invalid build URL: class parameter is invalid: " + classParam
        );
        return false;
      }

      let isPrestigeParamValid = /^([0-5])?$/.test(prestigeParam);
      if (!isPrestigeParamValid) {
        console.error(
          "invalid build URL: prestige parameter is invalid: " + prestigeParam
        );
        return false;
      }

      let isPerkParamValid = /^(?=.{17}$)([0-3]{1})(,[0-3]{1}){0,}?$/.test(
        perkParam
      );
      if (!isPerkParamValid) {
        console.error("invalid build URL: perk list is invalid: " + perkParam);
        return false;
      }

      return true;
    },
    selectClass: function (classIndex: number) {
      console.log(classIndex);
      this.selectedClass.resetPerks();
      store.selectedClassId = classIndex;
      this.selectedClass = this.classData[classIndex];
    },
  },
});
</script>
