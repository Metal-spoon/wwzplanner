export class perk {
  name: string = "";
  description: string = "";
  level: number = 0;
  isBase: boolean = false;
  prestige: number = 0;
  selected: boolean = false;

  get teamWide(): boolean {
    const regexp = /(?<=entire|whole|all)\steam/
    return regexp.test(this.description)
  }

  get column(): number {
    let column = 0;
    if (this.isBase) {
      column = this.prestige > 0 ? (this.prestige - 1) * 3 + (this.prestige - 1) : ((this.level / 10) * 3) + (this.level / 10)
    } else {
      const offset = Math.ceil(this.level / 10) - 1
      column = Math.ceil((this.level - offset)/3) 
      column = column + offset
    }
    return column;
  }

  get columnIndex(): number {
    const offset = Math.ceil(this.level / 10) - 1
    return ((this.level - offset - 1) % 3) + 1
  }

  getIconPath(className: string): string {
    const filename = this.prestige > 0 ? 'P' + this.prestige + '.png' : 'L' + this.level + '.png'
    return process.env.BASE_URL + 'assets/' + className.toLowerCase() + '/' + filename;
  }
}
