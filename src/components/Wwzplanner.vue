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
  <div class="row">
  <div class="perk-selection">
    <div
      class="perk-column"
      v-for="(column, columnIndex) in groupedPerks"
      :key="columnIndex"
    >
      <ul>
        <li v-for="(perk, perkIndex) in column" :key="perkIndex">
          <div
            class="image-wrapper"
            v-bind:class="{ selectedperk: perk.selected }"
          >
          <perktooltip v-bind:perk="perk" :hover="true">
            <img
              class="perk-image"
              :src="perk.icon"
              v-on:click="selectPerk(perkIndex, column, columnIndex)"
            />
          </perktooltip>
        
          
          </div>
        </li>
        test
      </ul>
    </div>
  </div>
  
  
  </div>
  <div>
     <buildshareurl :classId="selectedClassId" :selectedPerkIds="selectedPerkIds" :prestige="prestige"/>
    
  </div>
  </div>
</template>

<style lang="less" scoped>
.perk-selection {
  display: inline-block;
}


.row {
  text-align: center;
  
}
.wrapper {
  padding: 50px;
}

.perk-column {
  display: inline-table;
  vertical-align: top;
  > ul {
    list-style-type: none;
    padding: 0px;
    > li {
      padding: 5px;
    }
  }
  .perk-image {
    display: block;
    filter: brightness(0.5);
    &:hover {
      filter: brightness(1.5) drop-shadow(2px 2px 0 white)
        drop-shadow(-2px 2px 0 white) drop-shadow(2px -2px 0 white)
        drop-shadow(-2px -2px 0 white);
      cursor: pointer;
    }
  }
  .selectedperk {
    position: relative;
     img {
      filter: brightness(1);
    }
    &:after {
      content: "";
      width: 0;
      height: 0;
      border-left: 0px solid transparent;
      border-right: 15px solid transparent;
      border-top: 15px solid orange;
      position: absolute;
      left: 0%;
      top: 0%;
    }
  }
}
</style>

<script lang='ts'>
import { defineComponent } from "vue";
import perktooltip from './tooltip.vue';
import buildshareurl from './buildshareurl.vue';
//import buildoverview from './buildoverview.vue';
import json from "../assets/data.json";

export default defineComponent({
  name: "wwzplanner",
  components: {perktooltip, buildshareurl},
  data() {
    return {
      classData: json.classdata,
      selected: json.classdata[0],
      selectedClassId: 0,
      prestige: 0,
      selectedPerks: new Array<Object>(9),
      selectedPerkIds: new Array<Number>(9).fill(0)
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
      this.updatePerksFromParam(String(perkParam));
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    groupPerks: function (array: Array<any>) {
      var result: Array<Array<any>> = [];
      for (let index = 0; index < 13; index++) {
        result.push([]);
      }
      array.forEach((perk) => {
        result[perk.column].push(perk);
      });
      return result;
    },
    selectPerk: function (
      perkIndex: number,
      column: Array<any>,
      columnIndex: number
    ) {
      if (column[perkIndex].isBase) return;
      let columnIndexOffset = Math.ceil(columnIndex / 4);
      column.forEach((perk) => {
        perk.selected = false;
      });
      column[perkIndex].selected = true;
      this.selectedPerks[columnIndex - columnIndexOffset] = column[perkIndex];
      this.selectedPerkIds[columnIndex - columnIndexOffset] = perkIndex + 1;
    },
    updateBaseperks: function () {
      for (
        let index = 0;
        index <= this.groupedPerks.length - 1;
        index = index + 4
      ) {
        const column = this.groupedPerks[index];
        column.forEach((basePerk) => {
          if (this.prestige >= basePerk.prestige) {
            basePerk.selected = true;
          } else {
            basePerk.selected = false;
          }
        });
      }
    },
    updatePerksFromParam: function (perkParam: string) {
      let perkParamArray = perkParam.split(",");
      perkParamArray.forEach((perkIndexString, index) => {
        if (Number(perkIndexString) !== 0) { 
          let columnIndexOffset = Math.ceil((index + 1) / 3);
          let column = this.groupedPerks[index + columnIndexOffset];
          let perkIndex = Number(perkIndexString) - 1;
          column[perkIndex].selected = true;
          this.selectedPerks[index] = column[perkIndex];
          
        }
        this.selectedPerkIds[index] = Number(perkIndexString);
      });
    },
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
    updatePerks: function(){
      this.selectedPerkIds.forEach((perkId, index) => {
         if (Number(perkId) !== 0) { 
          let columnIndexOffset = Math.ceil((index + 1) / 3);
          let column = this.groupedPerks[index + columnIndexOffset];
          let perkIndex = Number(perkId) - 1;
          column[perkIndex].selected = true;
          this.selectedPerks[index] = column[perkIndex];
          
        }
      });
    }
  },
  computed: {
    groupedPerks(): Array<Array<any>> {
      return this.groupPerks(this.selected.perks);
    },
  },
  watch: {
    prestige: {
      handler() {
        this.updateBaseperks();
      },
      immediate: true,
    },
    selected: {
      handler() {
        this.updateBaseperks();
        this.updatePerks();
      },
      immediate: true,
    },
  },
});
</script>
