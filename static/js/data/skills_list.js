export const skillsList = [
  {
    name: 'Awareness',
    class: 'Ranger',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: [],
    pracs: { max: 27, Tarkhnarb: 18, Zaugurz: 18, Troll: 11, Númenórean: 27 },
    knowledge_cap: 152,
    knowledge: { base: 20, per: 3.75, int: 2.6 }
  },
  {
    name: 'Bandage',
    class: 'Ranger',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: ['Troll'],
    pracs: { max: 18, Tarkhnarb: 8, Zaugurz: 18, Númenórean: 18 },
    knowledge_cap: 152,
    knowledge: { base: 18, int: 3.75, dex: 2.5 }
  },
  {
    name: 'Climb',
    class: 'Ranger',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: [],
    pracs: { max: 13, Tarkhnarb: 13, Zaugurz: 13, Troll: 3, Númenórean: 13 },
    knowledge_cap: 152,
    knowledge: { base: 18, dex: 3, wil: 2, str: 1.25 }
  },
  {
    name: 'Command',
    class: 'Ranger',
    factions: ['Free Folk', 'Minions of Sauron'],
    exclude_races: ['Troll'],
    pracs: { max: 27, Tarkhnarb: 18, Númenórean: 27 },
    knowledge_cap: 152,
    knowledge: { base: 17, wil: 4.0, int: 3.5 }
  },
  {
    name: 'Dark Oath',
    class: 'Ranger',
    factions: ['Minions of Sauron'],
    exclude_races: ['Orc', 'Troll'],
    pracs: { max: 23, Númenórean: 23 },
    knowledge_cap: 152,
    knowledge: { base: 16.5, con: 3, wil: 2, per: 0.75 }
  },
  {
    name: 'Leadership',
    class: 'Ranger',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: [],
    pracs: { max: 27, Tarkhnarb: 18, Zaugurz: 18, Troll: 11, Númenórean: 27 },
    knowledge_cap: 152,
    knowledge: { base: 17, wil: 4.0, wis: 3.5 }
  },
  {
    name: 'Ride',
    class: 'Ranger',
    factions: ['Free Folk', 'Minions of Sauron'],
    exclude_races: ['Troll'],
    pracs: { max: 13, Tarkhnarb: 13, Númenórean: 13 },
    knowledge_cap: 152,
    knowledge: { base: 18, dex: 3.75, wil: 2.5 },
  },
  {
    name: 'Swim',
    class: 'Ranger',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: [],
    pracs: { max: 14, Tarkhnarb: 13, Zaugurz: 13, Troll: 3, Númenórean: 13 },
    knowledge_cap: 152,
    knowledge: { base: 16, con: 3, wil: 2, dex: 1.3 }
  },
  {
    name: 'Track',
    class: 'Ranger',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: [],
    pracs: { max: 27, Tarkhnarb: 27, Zaugurz: 27, Troll: 27, Númenórean: 27 },
    knowledge_cap: 152,
    knowledge: { base: 16.9, int: 2.5, per: 3.8 }
  },
  {
    name: 'Wilderness',
    class: 'Ranger',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: [],
    pracs: { max: 27, Tarkhnarb: 27, Zaugurz: 27, Troll: 27, Númenórean: 27 },
    knowledge_cap: 152,
    knowledge: { base: 0, str: 3.6, wil: 4.85 }
  },
  {
    name: 'Attack',
    class: 'Thief',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: ['Troll', 'Númenórean'],
    pracs: { max: 16, Tarkhnarb: 16, Zaugurz: 16 },
    knowledge_cap: 114,
    knowledge: { base: 15, dex: 3.0, wil: 2.5 }
  },
  {
    name: 'Backstab',
    class: 'Thief',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: ['Troll'],
    pracs: { max: 23, Tarkhnarb: 23, Zaugurz: 23, Númenórean: 23 },
    knowledge_cap: 109,
    knowledge: { base: 10, dex: 3.0, per: 2.5 }
  },
  {
    name: 'Dodge',
    class: 'Thief',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: ['Troll'],
    pracs: { max: 23, Tarkhnarb: 23, Zaugurz: 23, Númenórean: 18 },
    knowledge_cap: 109,
    knowledge: { base: 10, dex: 3.0, per: 2.5 }
  },
  {
    name: 'Envenom',
    class: 'Thief',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: ['Troll'],
    pracs: { max: 23, Tarkhnarb: 23, Zaugurz: 23, Númenórean: 23 },
    knowledge_cap: 109,
    knowledge: { base: 10, dex: 3.0, int: 2.5 }
  },
  {
    name: 'Escape',
    class: 'Thief',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: [],
    pracs: { max: 16, Tarkhnarb: 16, Zaugurz: 16, Troll: 8, Númenórean: 13 },
    knowledge_cap: 109,
    knowledge: { base: 10, dex: 3.0, per: 2.5 }
  },
  {
    name: 'Hide',
    class: 'Thief',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: ['Troll'],
    pracs: { max: 16, Tarkhnarb: 16, Zaugurz: 16, Númenórean: 16 },
    knowledge_cap: 109,
    knowledge: { base: 10, dex: 3.0, per: 2.5 }
  },
  {
    name: 'Missile',
    class: 'Thief',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: ['Troll'],
    pracs: { max: 16, Tarkhnarb: 16, Zaugurz: 16, Númenórean: 5 },
    knowledge_cap: 114,
    knowledge: { base: 15, dex: 3.0, per: 2.5 }
  },
  {
    name: 'Pick',
    class: 'Thief',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: ['Troll'],
    pracs: { max: 16, Tarkhnarb: 8, Zaugurz: 6, Númenórean: 5 },
    knowledge_cap: 109,
    knowledge: { base: 10, dex: 3.0, int: 2.5 }
  },
  {
    name: 'Piercing',
    class: 'Thief',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: ['Troll', 'Númenórean'],
    pracs: { max: 16, Tarkhnarb: 16, Zaugurz: 16 },
    knowledge_cap: 114,
    knowledge: { base: 10.5, dex: 2.5, per: 1.75, str: 1.5 }
  },
  {
    name: 'Search',
    class: 'Thief',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: [],
    pracs: { max: 16, Tarkhnarb: 3, Zaugurz: 4, Troll: 1, Númenórean: 5 },
    knowledge_cap: 109,
    knowledge: { base: 10, dex: 3.0, per: 2.5 }
  },
  {
    name: 'Sneak',
    class: 'Thief',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: ['Troll'],
    pracs: { max: 23, Tarkhnarb: 23, Zaugurz: 23, Númenórean: 23 },
    knowledge_cap: 109,
    knowledge: { base: 10, dex: 3.0, per: 2.5 }
  },
  {
    name: 'Steal',
    class: 'Thief',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: ['Troll'],
    pracs: { max: 23, Tarkhnarb: 23, Zaugurz: 23, Númenórean: 23 },
    knowledge_cap: 109,
    knowledge: { base: 10, dex: 3.0, per: 2.5 }
  },
  /*{
    name: 'Bash',
    class: 'Warrior',
    factions: ['Free Folk', 'Minions of Sauron', 'Renegades'],
    exclude_races: ['Númenórean'],
    pracs: { max: 43, Tarkhnarb: 43, Zaugurz: 43, Troll: 40 },
    knowledge_cap: 114,
    knowledge: { base: 6, str: 3.0, dex: 2.0, wil: 1.0 }
  },*/
]