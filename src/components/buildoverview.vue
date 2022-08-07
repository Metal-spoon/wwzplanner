<template>
    <div class="flex-row">
     <ul class="perk-grid baseperk-grid">
        <li class="perk-info" v-for="baseperk in basePerks" :key="baseperk">
            <img class="perk-icon" :src="baseperk.icon" />
            <div class="perk-text">
            <b>{{baseperk.Name}}</b>
            <span>{{baseperk.Description}}</span>
            </div>
        </li>
     </ul>
     <ul class="perk-grid">
        <li class="perk-info" v-for="perk in selectedPerks" :key="perk">
            <img class="perk-icon" :src="perk.icon" />
            <div class="perk-text perk-text-selected">
            <b>{{perk.Name}}</b>
            <span>{{perk.Description}}</span>
            </div>
        </li>
     </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent  } from 'vue'
import { store } from '@/store'
import { wwzclass } from '@/models/wwzclass'

export default defineComponent({
    name: "buildoverview",
    props: {
        selectedClass: {
            type: wwzclass,
            required: true
        }
    },
    data() {
        return {
            store
        }
    },
    computed: {
        basePerks: function() {
            return this.selectedClass.perks.filter((perk) => perk.isBase && perk.selected).sort()
        },
        selectedPerks: function() {
            return this.selectedClass.perks.filter((perk) => !perk.isBase && perk.selected)
        }
    },
})
</script>

<style lang="less" scoped>
   .perk-grid {
    display: grid;
    list-style: none;
    grid-auto-flow: column;
    grid-template-rows: repeat(3, 1fr);
    padding-left: 0px;
    margin: 0;
   }

   .baseperk-grid {
    grid-template-rows: repeat(4, 1fr);
   }

   .perk-icon {
    max-width: 75px;
   }

   .perk-info {
    display: flex;
    flex-direction: row;
    align-items: center;
   }
   .perk-text {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-left: 5px;
    padding-right: 10px;
    max-width: 4000px;
   }

   .perk-text-selected {
   
   }

   
   .flex-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
   }
</style>