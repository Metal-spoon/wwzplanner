<template>
  <div class="share-wrapper flex-column">
    <b class="label">Share your build: </b>
    <tooltip :text="'Copied!'" :hover="false" :show="showTooltip">
      <div class="flex-row">
        <div class="shareurl-text">
          <span ref="urlspan">{{ shareURL }}</span>
        </div>
        <div class="iconwrapper flex-column flex-center" @click="copyURL">
          <font-awesome-icon icon="clipboard" />
        </div>
      </div>
    </tooltip>
  </div>
</template>

<script lang="ts">
import { store } from "@/store";
import { defineComponent } from "vue";
import tooltip from "./tooltip.vue";

export default defineComponent({
  name: "BuildShareUrl",
  components: { tooltip },
  data() {
    return {
      showTooltip: false,
      store,
    };
  },
  methods: {
    buildURL: function () {
      let host = window.location.host;
      host = 'https://metal-spoon.github.io/wwzplanner/'
      let classString = String(store.selectedClass.id);
      let perkIdString = /^([0-3]{1})(,[0-3]{1}){0,}?$/.exec(
        String(this.selectedPerkIds)
      )![0];
      let prestigeString = String(store.prestige);
      let URL =
        host + process.env.BASE_URL + classString + "/" + perkIdString + "/" + prestigeString;
      this.$router.replace({path: process.env.BASE_URL + classString + '/' + perkIdString + '/' + prestigeString})
      return URL;
    },
    copyURL: function () {
      document.getSelection()?.selectAllChildren(this.$refs.urlspan as any);
      navigator.clipboard.writeText(this.buildURL()).then(() => {
        this.showTooltip = true;
        setTimeout(() => {
          this.showTooltip = false;
        }, 2000);
      }).catch(() => {
        alert("Something went wrong");
      });
    },
  },
  computed: {
    shareURL(): any {
      return this.buildURL();
    },
    selectedPerkIds(): Array<number> {
      let result = new Array<number>(9).fill(0);
      store.selectedClass.perks.filter((x) => x.selected && !x.isBase).forEach((selectedPerk) => {
        result[selectedPerk.column - (Math.ceil((selectedPerk.level / 10)) - 1) - 1] = selectedPerk.columnIndex
      });
      return result
    }
  },
});
</script>

<style lang="less" scoped>
.share-wrapper {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.label {
  display: block;
}

.urltextbox {
  padding: 5px;
  &:focus {
    outline: none;
  }
}

.shareurl-text {
  background: white;
  color: black;
  padding: 5px;
  align-content: center;
  word-break: break-all;
}

.iconwrapper {
  background-color: darkred;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  &:hover {
    background-color: lighten(darkred, 10);
    cursor: pointer;
  }
}
</style>