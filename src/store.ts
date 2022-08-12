import { reactive } from "vue";
import { perk } from "@/models/perk";
import { wwzclass } from "./models/wwzclass";

export const store = reactive({
  selectedClass: new wwzclass(),
  prestige: 0,
  defaultHoveredPerk: {
    Name: "Nothing",
    Description: "Hover over a perk to see it's info",
  } as perk,
  hoveredPerk: {
    Name: "Nothing",
    Description: "Hover over a perk to see it's info",
  } as perk
});
