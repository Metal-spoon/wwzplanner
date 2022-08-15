<template>
  <div class="perk-selection flex-row">
    <ul
      class="perk-column flex-column"
      v-for="(column, columnIndex) in groupedPerks"
      :key="columnIndex"
    >
      <li v-for="(perk, perkIndex) in column" :key="perkIndex">
        <div
          class="image-wrapper"
          v-bind:class="{ selectedperk: perk.selected }"
          @click="selectPerk(perkIndex, column)"
          @mouseenter="store.hoveredPerk = perk"
          @mouseleave="store.hoveredPerk = store.defaultHoveredPerk"
        >
          <img class="perk-image" :src="store.baseroute + perk.icon" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { store } from "@/store";
import { perk } from "@/models/perk";
export default defineComponent({
  name: "PerkPicker",
  props: {
    perkParam: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      store
    };
  },
  created() {
    if (this.perkParam) {
      this.updatePerksFromParam(this.perkParam);
    }
  },
  methods: {
    selectPerk: function (
      perkIndex: number,
      column: Array<perk>
    ) {
      if (column[perkIndex].isBase) return;
      column.forEach((perk) => {
        perk.selected = false;
      });
      column[perkIndex].selected = true;
    },
    groupPerks: function (perks: Array<perk>) {
      let result = Array.from(Array(13), () => new Array());
      perks.forEach((perk) => {
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
          if (store.prestige >= basePerk.prestige) {
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
        //-1 so were actually working with 0 based numbers, can go negative hence the check.
        let perkColumnIndex = Number(perkIndexString) - 1
        if (perkColumnIndex >= 0) {
          let columnIndexOffset = Math.ceil((index + 1) / 3);
          let perk = this.groupedPerks[index + columnIndexOffset][perkColumnIndex];
          perk.selected = true;
        }
      });
    },
  },
  computed: {
    groupedPerks(): Array<Array<any>> {
      return this.groupPerks(store.selectedClass.perks);
    },
  },
  watch: {
    'store.prestige': {
      handler() {
        this.updateBaseperks();
      },
      immediate: true,
    },
    'store.selectedClass': {
      handler() {
        store.hoveredPerk = store.defaultHoveredPerk;
        this.updateBaseperks();
      }
    },
  },
});
</script>

<style lang='less' scoped>


.perk-selection {
  max-width: 100%;
  align-content: center;
}

.perk-column {
  list-style-type: none;
  padding: 0px;

  .image-wrapper {
    display: block;
    padding: 5px;

    > img {
      filter: brightness(0.5);
      width: 100%;
      max-width: 100px;
      min-width: 50px;
      height: auto;
    }
    &:hover {
      cursor: pointer;
      > img {
        filter: brightness(1.5) drop-shadow(2px 2px 0 white)
          drop-shadow(-2px 2px 0 white) drop-shadow(2px -2px 0 white)
          drop-shadow(-2px -2px 0 white);
      }
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
@media (max-width: 800px) {
  .perk-selection {
    flex-direction: column;
    flex-wrap: wrap;
  }

  .perk-column {
    flex-direction: row;
    margin: 0;
  }

  .picker-perkinfo {
    border-top: 2px solid @foreground;
  }
}
</style>