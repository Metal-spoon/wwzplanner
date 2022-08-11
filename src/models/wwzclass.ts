import { Type } from "class-transformer";
import { perk } from "./perk";

export class wwzclass {
  name: string = "";

  icon: string = "";

  description: string = "";

  @Type(() => perk)
  perks: Array<perk> = [];

  resetPerks() {
    this.perks.forEach((perk) => {
      perk.selected = false;
    });
  }
}
