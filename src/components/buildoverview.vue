<template>
    <div class="component-wrapper">
        <h2 class="component-title"> Build overview </h2>
        <b> Selected perks: </b>
        <div class="perk-info" v-for="(perk, perkIndex) in selectedPerks" :key="perkIndex">
            <div v-if="perk">
            <div class="image-wrapper">
            <img
              class="perk-image"
              :src="perk.icon"
              
            />
            </div>
            <div class="perk-description">
            <div><b>{{perk.Name}}</b></div>
            <span>{{perk.Description}} </span>
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "buildoverview",
    props: {
        selectedPerks: {
            type: Array,
            required: true
        }
    },
    computed: {
        
    },
})
</script>

<style lang="less" scoped>
    .component-wrapper {
         display: inline-block;
    text-align: center;
  margin-left: 20px;
  vertical-align: top;
  background-color: red;
  padding: 10px;
  width: 16%;
    }

    .component-title {
        border-bottom: 2px solid black;
    }

    .perk-info {
        text-align: left;
    }

    .perk-image {
        width: 56px;
    }

    .image-wrapper {
        display: inline-block;
    }

    .perk-description {
        display: inline-block;
        vertical-align: top;
        padding: 10px
    }
</style>