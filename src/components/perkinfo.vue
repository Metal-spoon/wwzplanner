<template>
  <div class="perkinfo flex-column flex-center">
    <span
      ><b>{{ perk.Name }}</b></span
    >
    <span>{{ perk.Description }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PerkInfo",
  props: {
    perk: {
      type: Object,
      required: true,
    },
  },
});
</script>


