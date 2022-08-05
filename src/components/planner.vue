<template>
<div class="wrapper">
  
  <div>
    <select v-model="selected" id="classlist">
      <option
        v-for="(wwzclass, classIndex) in classData"
        :value="wwzclass"
        :key="classIndex"
        @click="selectedClassId = classIndex"
      >
        {{ wwzclass.name }}
      </option>
    </select>
    <span>Prestige:</span>
    <input type="number" min="0" max="4" v-model="prestige" />
  </div>
  </div>
  <div class="row">
  <perkpicker :selectedClass="selected" :prestige="prestige" :perkParam="perkParam"/>
  </div>
  <div>
    <buildshareurl :classId="selectedClassId" :prestige="prestige"/>
    
  </div>

</template>

<style lang="less" scoped>
.row {
  text-align: center;
  
}
.wrapper {
  padding: 50px;
}
</style>

<script lang='ts'>
import { defineComponent } from "vue";
import perkpicker from './perkpicker.vue'
import buildshareurl from './buildshareurl.vue';
import json from "../assets/data.json";

export default defineComponent({
  name: "planner",
  components: {perkpicker, buildshareurl},
  data() {
    return {
      classData: json.classdata,
      selected: json.classdata[0],
      selectedClassId: 0,
      prestige: 0,
      perkParam: ''
    };
  },
  created() {

    if (this.$route.path === "/") return;
    console.log(this.$route);
    let classParam = String(this.$route.params.class);
    let perkParam = String(this.$route.params.perks);
    let prestigeParam = String(this.$route.params.prestige);

    if (this.verifyParameters(classParam,perkParam,prestigeParam)) {
      this.prestige = Number(prestigeParam);
      this.selected = this.classData[Number(classParam)]
      this.perkParam = String(perkParam);
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    verifyParameters: function(classParam: string, perkParam: string, prestigeParam: string) {
      if (!classParam && !perkParam && !prestigeParam) {
        console.error("invalid build URL: missing parameter")
        return false;
      }

      let isClassParamValid = /^([0-7])?$/.test(classParam);
      if (!isClassParamValid) {
        console.error("invalid build URL: class parameter is invalid: " + classParam);
        return false;
      }

      let isPrestigeParamValid = /^([0-5])?$/.test(prestigeParam);
      if (!isPrestigeParamValid) {
        console.error("invalid build URL: prestige parameter is invalid: " + prestigeParam);
        return false;
      }
      
      let isPerkParamValid = /^(?=.{17}$)([0-3]{1})(,[0-3]{1}){0,}?$/.test(perkParam);
      if (!isPerkParamValid) {
        console.error("invalid build URL: perk list is invalid: " + perkParam)
        return false;
      }
     
     return true;

      
    },
  },
  
});
</script>
