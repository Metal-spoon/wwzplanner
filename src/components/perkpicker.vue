<template>
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
            <tooltip v-bind:perk="perk" :hover="true">
              <img
                class="perk-image"
                :src="perk.icon"
                v-on:click="selectPerk(perkIndex, column, columnIndex)"
              />
            </tooltip>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import tooltip from "./tooltip.vue"
import { store } from "@/store"
export default defineComponent({
  name: "perkpicker",
  components: {tooltip},
  props: {
    selectedClass: {
      type: Object,
      required: true
    },
    prestige: {
      type: Number,
      required: true
    },
    perkParam: {
      type: String,
      required: true
    }

    },
    data() {
      return {
        selectedPerks: new Array<Object>(9),
        store
      }
    },
    created() {
      if (this.perkParam) {
        this.updatePerksFromParam(this.perkParam)
      }
    },
  methods: {
        
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
      store.selectedPerkIds[columnIndex - columnIndexOffset] = perkIndex + 1;
    },

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
    updatePerks: function(){
      store.selectedPerkIds.forEach((perkId, index) => {
         if (Number(perkId) !== 0) { 
          let columnIndexOffset = Math.ceil((index + 1) / 3);
          let column = this.groupedPerks[index + columnIndexOffset];
          let perkIndex = Number(perkId) - 1;
          column[perkIndex].selected = true;
          this.selectedPerks[index] = column[perkIndex];
          
        }
      });
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
        store.selectedPerkIds[index] = Number(perkIndexString);
      });
    },
  },
    computed: {
    groupedPerks(): Array<Array<any>> {
      return this.groupPerks(this.selectedClass.perks);
    },
  },
  watch: {
    prestige: {
      handler() {
        this.updateBaseperks();
      },
      immediate: true,
    },
    selectedClass: {
      handler() {
        this.updateBaseperks();
        this.updatePerks();
      },
      immediate: true,
    },
  }
  },
);
</script>

<style lang=less scoped>
.perk-selection {
  display: inline-block;
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