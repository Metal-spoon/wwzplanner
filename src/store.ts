import { reactive } from "vue";
import { perk } from "@/models/perk";
import { wwzclass } from "./models/wwzclass";
import { plainToInstance } from "class-transformer";

export const store = reactive({
  selectedClass: new wwzclass(),
  prestige: 0,
  defaultHoveredPerk: plainToInstance(perk, {
    name: "Nothing",
    description: "Hover over a perk to see it's info"
  }),
  hoveredPerk: plainToInstance(perk, {
    name: "Nothing",
    description: "Hover over a perk to see it's info"
  }),
  baseroute: process.env.NODE_ENV === 'production' ? '/wwzplanner/' : '/'
});
