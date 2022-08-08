<template>
  <div class=perkinfo>
    <span><b>{{ perk.Name }}</b></span>
    <span>{{ perk.Description }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
    name: 'PerkInfo',
    props: {
        perk: {
            type: Object,
            required: true
        }
    }
})
</script>

<style lang="less" scoped>
    .perkinfo {
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
</style>

