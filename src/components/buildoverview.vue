<template>
    <div>
     
    </div>
</template>

<script lang="ts">
import { defineComponent  } from 'vue'
import { store } from '@/store'
import { perk } from '@/models/perk'
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
            return this.selectedClass.perks.filter((perk: perk) => perk.isBase && perk.selected)
        }
    },
})
</script>

<style lang="less" scoped>
   
</style>