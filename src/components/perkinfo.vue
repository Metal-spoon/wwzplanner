<template>
  <div class="perkinfo flex-column flex-center">
    <div class="flex-column wrapper">
      <span
        ><b>{{ perk.name }}</b></span
      >
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
  },
  methods: {
    numberHighlightFilter: function(text: string){
      const exp = /(?<=[\s(]|^)[0-9%]+(?=[\s)]|$)/gm;
      const result = text.replace(exp, '<b class="highlight">$&</b>');
      return result;
    }
  }
});
</script>

<style lang="less" scoped>
.wrapper {
  padding: 5px;
}
</style>

