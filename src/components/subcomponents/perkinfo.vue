<template>
  <div class="flex-row perk-info">
    <img
      v-if="showIcon && perk.icon"
      class="perk-icon"
      :src="perk.icon"
      :width="iconWidth"
    />
    <div class="perk-text" :class="{ 'align-left': showIcon }">
      <div class="perk-title flex-row" :class="{'space-between': showIndicator}">
      <b>{{ perk.name }}</b>
      <font-awesome-icon v-if="showIndicator && perk.teamWide" icon="people-group" /> 
      </div>
      <span v-html="numberHighlightFilter(perk.description)"></span>
    </div>
  </div>
</template>

<script lang='ts'>
import { perk } from "@/models/perk";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PerkInfo",
  props: {
    perk: {
      type: perk,
      required: true,
    },
    showIcon: {
      type: Boolean,
      required: false,
      default: false
    },
    iconWidth: {
      type: Number,
      required: false,
      default: 100
    },
    showIndicator: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    numberHighlightFilter: function (text: string) {
      const exp = /(?<!Casull\s)(?<=[\s(]|^)[0-9%]+(?=[\s)]|$)/gm;
      const result = text.replace(exp, '<b class="highlight">$&</b>');
      return result;
    },
  },
});
</script>

<style lang="less" scoped>
.perk-info {
  align-items: center;
}
.align-left {
  text-align: left;
}

.perk-title {
  font-size: 16px;
  justify-content: center;
  align-items: center;
  max-width: 100%;
}

.space-between {
  justify-content: space-between;
}

.perk-text {
  padding: 10px;
}
</style>

