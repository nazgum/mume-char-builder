export default class Stats {
  constructor(str, int, wis, dex, con, wil, per) {
    this.str = str
    this.int = int
    this.wis = wis
    this.dex = dex
    this.con = con
    this.wil = wil
    this.per = per
  }
}

export default function str(stats) {
  console.log(`str is ${stats.str}`)
}

let stats = new Stats(12,14,13,16,11,14,14)

str(stats)