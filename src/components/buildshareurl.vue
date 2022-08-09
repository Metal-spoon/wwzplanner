<template>
<div class='share-wrapper flex-column'>
    <b class="label">Share your build: </b>
    <tooltip :text="'Copied!'" :hover="false" :show="showTooltip">
    <input class="urltextbox" type="text" readonly v-bind:value="shareURL" v-on:focus="$event.target.select()" ref="urltextbox">
    <div class="iconwrapper" @click="copyURL">
    <font-awesome-icon icon="clipboard"/>
    
    </div>
    </tooltip>
</div>
</template>

<script lang="ts">
import { store } from '@/store';
import { defineComponent } from 'vue'
import tooltip from './tooltip.vue'

export default defineComponent({
    name: "BuildShareUrl",
    components: {tooltip},
    data() {
        return {
            showTooltip: false,
            store
        }
    },
    methods: {
        buildURL: function() {
            let host = window.location.host;
            let classString = String(store.selectedClassId);
            let perkIdString = /^([0-3]{1})(,[0-3]{1}){0,}?$/.exec(String(store.selectedPerkIds))![0];
            let prestigeString = String(store.prestige);
            let URL = host + "/" + classString + "/" + perkIdString + "/" + prestigeString;
            return URL;
            
        },
        copyURL: function() {
            (this.$refs.urltextbox as any).focus();
            navigator.clipboard.writeText(this.buildURL());
            this.showTooltip = true;
            var self = this;
            setTimeout(function(){self.showTooltip = false}, 2000)
        }
    },
    computed: 
    {
        shareURL(): any {
            return this.buildURL();
        }
    }
})
</script>

<style lang="less" scoped>
    .share-wrapper {
        margin-top: 10px;
    }
    .label {
        display: block;
    }

    .urltextbox {
        width: 215px;
        padding: 5px;
        &:focus {
            outline: none;
        }
    }

    .iconwrapper {
        display: inline-block;
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