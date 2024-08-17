export const charInfo = {
  factions: [
    {
      name: 'Freefolk',
      races: [
        {
          name: 'Dwarf',
          lifespan: 2,
          stats: { str: 1, int: 0, wis: -1, dex: -1, con: 1, wil: 1, per: -1 },
          traits: [],
          subraces: [
            { 
              name: 'Broadbeam', 
              traits: [],
            },
            { 
              name: 'Firebeard', 
              traits: [ {skill: 'Bash', amount: 10} ],
            },
            { 
              name: 'Longbeard', 
              traits: [],
            },
          ]
        },
        {
          name: 'Elf',
          lifespan: 3,
          stats: { str: -1, int: 1, wis: 0, dex: 1, con: -1, wil: -1, per: 1 },
          traits: [],
          subraces: [
            { 
              name: 'Noldorin', 
              lifespan: 3.5,
              traits: [],
            },
            { 
              name: 'Sindarin', 
              lifespan: 3.0,
              traits: [ {skill: 'Leadership', amount: 10} ],
            },
            { 
              name: 'Silvan', 
              lifespan: 2.5,
              traits: [
                {skill: 'Missile', amount: 10},
                {skill: 'Wilderness', amount: 10},
              ],
            },
          ]
        },
        {
          name: 'Half-Elf',
          lifespan: 2,
          stats: { str: -1, int: 0, wis: 1, dex: 0, con: 0, wil: 0, per: 0 },
          traits: [],
          subraces: [
            { 
              name: 'Half-Elf', 
              traits: [],
            },
          ]
        },
        {
          name: 'Hobbit',
          lifespan: 1.5,
          stats: { str: -2, int: -1, wis: 0, dex: 1, con: 1, wil: 1, per: 0 },
          traits: [],
          subraces: [
            { 
              name: 'Fallohid', 
              traits: [],
            },
            { 
              name: 'Harfoot', 
              traits: [],
            },
            { 
              name: 'Stoor', 
              traits: [ {skill: 'Endurance', amount: 10}, {skill: 'Swim', amount: 25} ],
            },
          ]
        },
        {
          name: 'Men',
          lifespan: 1,
          stats: { str: 0, int: 0, wis: 0, dex: 0, con: 0, wil: 0, per: 0 },
          traits: [
            {name: 'Swift Recovery', desc: 'Men regenerate moves at a quicker rate.'},
            {name: 'Skilled Traveler', desc: 'Men are able to travel in all terrains without any difficulties.'},
          ],
          subraces: [
            { 
              name: 'Beorning', 
              traits: [ {skill: 'Wilderness', amount: 25} ],
            },
            { 
              name: 'Rohirrim', 
              traits: [ {skill: 'Ride', amount: 25} ],
            },
            { 
              name: 'Dúnadan', 
              traits: [
                {skill: 'Leadership', amount: 25},
                {skill: 'Track', amount: 10},
              ],
            },
            { 
              name: 'Eriadorian', 
              traits: [],
            },
          ]
        },
      ]
    },
    {
      name: 'Sauron',
      races: [
        {
          name: 'Orc',
          lifespan: 2,
          stats: { str: 2, int: -3, wis: -2, dex: 0, con: 2, wil: -2, per: 0 },
          traits: [],
          subraces: [
            { 
              name: 'Tarkhnarb', 
              traits: [],
            },
            { 
              name: 'Morruhk', 
              traits: [],
            },
          ]
        },
        {
          name: 'Troll',
          lifespan: 2,
          stats: { str: 7, int: -3, wis: -3, dex: -3, con: 4, wil: -3, per: -2 },
          traits: [],
          subraces: [
            { 
              name: 'Cave', 
              traits: [],
            },
            { 
              name: 'Hill', 
              traits: [],
            },
            { 
              name: 'Mountain', 
              traits: [],
            },
          ]
        },
        {
          name: 'Númenórean',
          lifespan: 1.5,
          stats: { str: 0, int: 0, wis: -1, dex: 0, con: 0, wil: -2, per: 0 },
          traits: [],
          subraces: [
            { 
              name: 'Black', 
              traits: [],
            },
          ]
        },
      ],
    },
    {
      name: 'Renegades',
      races: [
        {
          name: 'Orc',
          lifespan: 2,
          stats: { str: 2, int: -3, wis: -2, dex: 0, con: 2, wil: -2, per: 0 },
          traits: [],
          subraces: [
            { 
              name: 'Zaugurz', 
              traits: [],
            },
          ],
        },
      ],
    }
  ]
};