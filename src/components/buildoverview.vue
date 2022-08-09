<template>
<div class="modal" v-show="showModal">
        <div class="modal-content">
            <div class="flex-row modal-title">
            <b>Build overview</b>
            <div class="x-button" @click="showModal = false"><font-awesome-icon size="2x" icon="xmark" /></div>
            </div>
    <div class="flex-column">
    <ul class="perk-grid baseperk-grid">
        <li class="perk-info" v-for="baseperk in basePerks" :key="baseperk">
            <img class="perk-icon" :src="baseperk.icon" />
            <div class="perk-text">
                <div class="perk-title">    
                    <b>{{baseperk.Name}}</b>
                    <div v-show="baseperk.teamWide" class="teamwide-indicator"> 
                        <font-awesome-icon icon="people-group" />
                    </div>
                </div>
                <span class="perk-description">{{baseperk.Description}}</span>
            </div>
        </li>
     </ul>
     <ul class="perk-grid">
        <li class="perk-info" v-for="perk in selectedPerks" :key="perk">
            <img class="perk-icon" :src="perk.icon" />
            <div class="perk-text perk-text-selected">
                <div class="perk-title">    
                    <b>{{perk.Name}}</b>
                    <div v-show="perk.teamWide" class="teamwide-indicator"> 
                        <font-awesome-icon icon="people-group" />
                    </div>
                </div>
            <span class="perk-description">{{perk.Description}}</span>
            </div>
        </li>
     </ul>
     <div class="indicator-disclaimer"><font-awesome-icon icon="people-group" /> Indicates perks that give a bonus to the whole team</div>
     </div>
     <buildshareurl />
    </div>
</div>
<div class="button" @click="showModal = true">Show build summary</div>
</template>

<script lang="ts">
import { defineComponent  } from 'vue'
import { store } from '@/store'
import { wwzclass } from '@/models/wwzclass'
import buildshareurl from './buildshareurl.vue'

export default defineComponent({
  components: { buildshareurl },
    name: "BuildOverview",
    props: {
        selectedClass: {
            type: wwzclass,
            required: true
        }
    },
    data() {
        return {
            store,
            showModal: false
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
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding-left: 0px;
    margin: 0;
   }

   .baseperk-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
   }

   .perk-icon {
    max-width: 75px;
   }

   .perk-info {
    position: relative;
    margin: 10px;
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
    
   }
    .flex-column {
        display: flex;
        flex-direction: column;
    }
   .flex-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    position: relative;
    flex-wrap: wrap;
   }

   .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0, 0.8);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
   }


   .modal-content {
    display: flex;
    flex-direction: column;
    background-color: #808080;
    padding: 10px;
    margin: 20px;
    max-height: 100%;
    overflow-y: scroll;
   }

   .x-button {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    color: white;
    &:hover {
        cursor: pointer;
        background-color: lighten(darkred, 10);
    }
    > svg {
        width: 1em;
    }
    background-color: darkred;
    z-index: 999;
   }

   .button {
    background-color: darkred;
    padding: 10px;
    color: white;
    font-weight: bold;
    max-width: fit-content;
    &:hover {
        cursor: pointer;
        background-color: lighten(darkred, 10);
    }
   }

   .teamwide-indicator{
    padding: 4px;
    border-radius: 20px;
   }

   .icon-wrapper {
    display: flex;
    position: relative;
   }

    .perk-title {
        font-size: 16px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .indicator-disclaimer {
        text-align: right;
    }
  
</style>