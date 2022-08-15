<template>
  <div class="flex-column flex-center planner">
    <h1>World War Z build planner</h1>
    <div class="content-wrapper flex-column flex-center">
      <div class="picker-wrapper flex-column">
        <div class="flex-row controls-bar">
          <div class="flex-row controls-bar">
            <classpicker :classdata="classData" />
          </div>
          <prestigepicker />
        </div>
        <perkpicker :perkParam="perkParam" />
      </div>
      <perkinfo class="picker-perkinfo" :perk="store.hoveredPerk" />
    </div>
    <buildoverview />
    <div>
      <buildshareurl />
    </div>
    <div>
      <creditscomponent />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import perkpicker from "./perkpicker.vue";
import buildshareurl from "./subcomponents/buildshareurl.vue";
import json from "../assets/data.json";
import buildoverview from "./buildoverview.vue";
import classpicker from "./classpicker.vue";
import prestigepicker from "./prestigepicker.vue";
import { wwzclass } from "@/models/wwzclass";
import { plainToInstance } from "class-transformer";
import { store } from "../store";
import perkinfo from "./subcomponents/perkinfo.vue";
import creditscomponent from "@/components/aboutcomponent.vue"

export default defineComponent({
  // eslint-disable-next-line
  name: "Planner",
  components: {
    perkpicker,
    buildshareurl,
    buildoverview,
    perkinfo,
    classpicker,
    prestigepicker,
    creditscomponent
  },
  data(): {
    classData: Array<wwzclass>;
    perkParam: string;
    store: any;
  } {
    return {
      classData: plainToInstance(wwzclass, json.classdata),
      perkParam: "",
      store,
    };
  },
  created() {
    store.selectedClass = this.classData[0];
    if (this.$route.path === store.baseroute) return;
    let classParam = String(this.$route.params.class);
    let perkParam = String(this.$route.params.perks);
    let prestigeParam = String(this.$route.params.prestige);

    if (this.verifyParameters(classParam, perkParam, prestigeParam)) {
      store.prestige = Number(prestigeParam);
      store.selectedClass = this.classData[Number(classParam)] as wwzclass;
      this.perkParam = String(perkParam);
    } else {
      this.$router.push(store.baseroute);
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
  },
});
</script>


<style lang="less" scoped>
.picker-perkinfo {
  position: sticky;
  bottom: 0px;
  background-color: @bg;
  width: 100%;
  justify-content: center;
}

.picker-wrapper {
  max-width: fit-content;
  gap: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.content-wrapper {
  width: 100%;
}

.controls-bar {
  align-items: flex-end;
  gap: 10px;
  justify-content: space-between;
}

.planner {
  gap: 10px;
}

@media (max-width: 800px) {
  .picker-perkinfo {
    border-top: 2px solid @foreground;
  }
}
</style>