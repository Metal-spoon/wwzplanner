import { reactive } from 'vue'
import { perk } from '@/models/perk'

export const store = reactive({
    selectedPerkIds: new Array<number>(9).fill(0),
    selectedPerks: new Array<perk>(9),
    activeBasePerks: new Array<perk>(),
    selectedClassId: 0,
    prestige: 0
})