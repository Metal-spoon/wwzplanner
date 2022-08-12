<template>
  <div class="perkinfo flex-column flex-center">
    <div class="flex-column wrapper">
      <span
        ><b>{{ perk.Name }}</b></span
      >
      <span>{{ perk.Description }}</span>
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
});
</script>

<style lang="less" scoped>
.wrapper {
  padding: 5px;
}
</style>

