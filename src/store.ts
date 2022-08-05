import { reactive } from 'vue'

export const store = reactive({
    selectedPerkIds: new Array<Number>(9).fill(0)
})