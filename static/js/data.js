export const data = {
  factions: [
    {
      name: 'Free Folk',
      races: [
        {
          name: 'Dwarf',
          lifespan: 2,
          stats: { str: 1, int: 0, wis: -1, dex: -1, con: 1, wil: 1, per: -1 },
          traits: [
            {name: 'Heavy load', desc: 'Dwarves can carry more weight without exhausting themselves.'},
            {name: 'Axemaster', desc: 'Dwarves are particularly skilled at using axes, both one-handed and two-handed, when standing with both feet firmly on the ground.'},
            {name: 'Mining Expertise', desc: 'Dwarf skill at mining is unmatched by the other races.'},
            {name: 'Poison Resistance', desc: 'Dwarves have a natural resistance to poisons.'},
            {name: 'Rockfoot', desc: 'Dwarves have a natural heaviness in their step, making it difficult for them to move silently.'},
            {name: 'Small Rider', desc: 'Dwarves suffer penalties when riding large mounts.'},
          ],
          subraces: [
            { 
              name: 'Broadbeam', 
              traits: [
                {name: 'Brave', desc: 'Broadbeams have an increased chance to not panic after a flee.'},
                {name: 'Metal Affinity', desc: 'Broadbeams armour wears out at a greatly reduced rate.'},
                {name: 'Door Violence', desc: 'Broadbeams receive a bonus towards bashing exits.'},
                {name: 'Fearless', desc:  'A Broadbeam does not scare easily. They are less likely to be affected by fear in any way.'},
                {name: 'Calm under Fire', desc: 'Broadbeams receive an increasing parry bonus as their health drops low.'},
              ],
            },
            { 
              name: 'Firebeard', 
              traits: [
                {name: 'Furious', desc: 'Firebeards are of an unforgiving temper and will receive an OB bonus when dealing or receiving a critical strike.'},
                {name: 'Bash Mastery', desc: 'Firebeards have a natural bonus to the bash skill.'},
                {name: 'Door Violence', desc: 'Firebeards receive a bonus towards bashing exits.'},
                {name: 'Sharp Blades', desc:  'Firebeards are experts at keeping their weapons sharp and ready and will sharpen a blade faster than anyone else.'},
              ],
            },
            { 
              name: 'Longbeard', 
              traits: [
                {name: 'Hardened', desc: 'A Longbeard is hard to faze and they will recover quicker from stuns.'},
                {name: 'Metal Affinity', desc: 'Longbeards have a sixth sense when it comes to finding hidden riches.'},
                {name: 'Door Violence', desc: 'Longbeards have a bonus towards bashing exits.'},
                {name: 'Mining Mastery', desc: 'Longbeards receive an additional bonus when mining.'},
              ],
            },
          ]
        },
        {
          name: 'Elf',
          lifespan: 3,
          stats: { str: -1, int: 1, wis: 0, dex: 1, con: -1, wil: -1, per: 1 },
          traits: [
            {name: 'Mystical', desc: 'Elves are quick thinkers and therefore make good Magic users.'},
            {name: 'Horse Friends', desc: 'Elves can ride horses bareback without any penalties.'},
            {name: 'Light Footed', desc: 'Elves can walk on snow.'},
            {name: 'Resilient', desc: 'Elves are immune to disease.'},
          ],
          subraces: [
            { 
              name: 'Noldorin', 
              lifespan: 3.5,
              traits: [
                {name: 'Magic Affinity', desc: 'Noldorin Elves have a natural passive ability to Detect Magic.'},
                {name: 'Gem Socket', desc: 'Noldorin Elves may an extra minor gem socket to a focus item.'},
              ],
            },
            { 
              name: 'Sindarin', 
              lifespan: 3.0,
              traits: [
                {name: 'Blacksmith', desc: 'Sindarin Elves can repair most armour to flawless on their own with the use of a cross-pein hammer.'},
                {name: 'Shield Swap', desc: 'Sindarin Elves can un-equip shields in combat.'},
                {name: 'Leadership Mastery', desc: 'Sindarin Elves have a natural affinity for Leadership.'},
                {name: 'Windrider', desc:  'The great Eagles will carry Sindarin Elves further than anyone else.'},
              ],
            },
            { 
              name: 'Silvan', 
              lifespan: 2.5,
              traits: [
                {name: 'Archery', desc: 'Silvan Elves have a natural affinity for missile weapons.'},
                {name: 'Survival', desc: 'Silvan Elves are experts at living in the wilderness.'},
                {name: 'Tracker', desc: 'Silvan Elves are able to track significantly faster in forests.'},
                {name: 'Ranged Combat', desc: 'Silvan Elves are able to parry enemy blows better than other races when wielding ranged weapons.'},
                {name: 'Forest Mastery', desc: 'Silvan Elves are able to move through forests more easily, as if it were a trail, if the land is good and not gripped by the Shadow.'},
              ],
            },
          ]
        },
        {
          name: 'Half-Elf',
          lifespan: 2,
          stats: { str: -1, int: 0, wis: 1, dex: 0, con: 0, wil: 0, per: 0 },
          traits: [
            {name: 'Resilient', desc: 'Half-elves possess partial immunity to diseases; ailments take only half the usual time to run their course.'},
            {name: 'Star light', desc: 'Half-elves can cast healing spells at a reduced cost under the light of the Star of Eärendil.'},
            {name: 'Star Wars', desc: 'Half-elves exhibit improved combat skills when under the Star of Eärendil.'},
            {name: "Nature's Blessing", desc: 'Half-elves receive bonuses to spellcasting and defending against spells, influenced by their mood.'},
          ],
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
          traits: [
            {name: 'Nimble', desc: 'With their small size and quick reflexes, hobbits excel at moving silently and unnoticed.'},
            {name: 'Barefeet', desc: 'Hobbits are able to move and sneak better when barefoot.'},
            {name: 'Leather Soles', desc: 'Hobbits furry feet with leathery soles provide some basic protection.'},
            {name: 'Tiny Spaces', desc: 'Hobbits are able to enter small holes that other races cannot fit into.'},
            {name: 'Small Rider', desc: 'Hobbits suffer penalties when riding large mounts.'},
          ],
          subraces: [
            { 
              name: 'Fallohid', 
              traits: [
                {name: 'Well Traveled', desc: 'Fallohids always get the full amount of travel points, even when following someone.'},
                {name: 'Travel Guide', desc: 'Fallohids provide other adventurers who are following them with the full amount of travel points.'},
                {name: 'Herbal Bliss', desc: 'Fallohids are well-versed in herbs and herblores. They mix potions and brews with an increased proficiency equal to two herbal kit upgrades.'},
                {name: 'Weed Connoisseur', desc: 'When smoking pipe-weed, Fallohids will never have a negative experience, and the chance for an especially gratifying experience is increased.'},
              ],
            },
            { 
              name: 'Harfoot', 
              traits: [
                {name: 'Unseen Scout', desc: 'Harfoots are exceptional at scouting without being noticed.'},
                {name: 'Hard to Bash', desc: 'Thanks to their small size, Harfoots have an increased chance to avoid being bashed.'},
                {name: 'Disengage', desc: 'Harfoots can escape combat slightly faster.'},
                {name: 'Evasive', desc:  'Harfoots have a reduced penalty when escaping from multiple opponents. '},
              ],
            },
            { 
              name: 'Stoor', 
              traits: [
                {name: 'Swim Mastery', desc: 'Stoor have a natural affinity for swimming.'},
                {name: 'Endurance Mastery', desc: 'Stoor stoutness grant them a bonus in the endurance skill.'},
                {name: 'Hardened Soles', desc: 'Stoor feet are especially leathery, making them more resilient to physical damage.'},
              ],
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
              traits: [
                {name: 'Metamorph', desc: 'Beornings can shapeshift to bear form while near the Carrock.'},
                {name: 'Rage', desc: 'Bears fight with little regard to their own life, and cannot cast spells or wear shields/armour while shapeshifted.'},
                {name: 'Forager', desc: 'Bears have access to the "forage" command, allowing them to search the surrounding area for food and water.'},
                {name: 'Wilderness Mastery', desc: 'Beornings start the game with a bonus in the Wilderness skill.'},
                {name: 'Strength in Numbers', desc: 'Bears are empowered by the presence of more powerful, friendly bears.'},
              ],
            },
            { 
              name: 'Rohirrim', 
              traits: [
                {name: 'The Mark', desc: 'Rohirrim have cheaper rent in Rohan.'},
                {name: 'Steady Rider', desc: 'Rohirrim are skilled riders and have protection from being thrown off by their mounts.'},
                {name: 'Trained Horses', desc: 'Rohirrim mounts have a decreased chance to refuse to move.'},
                {name: 'Mounted Spears', desc: 'Rohirrim have increased skill when wielding a a one-handed or two-handed stabbing weapons while riding.'},
                {name: 'Riding Mastery', desc: 'Rohirrim start the game with a bonus in the Riding skill.'},
              ],
            },
            { 
              name: 'Dúnadan', 
              traits: [
                {name: 'Detect Evil', desc: 'Dúnadan have a natural sensitivity to evil.'},
                {name: 'Elf Friend', desc: 'Dúnadan are friends of the Elves. They can pray to Rivendell and will be welcomed in Lorien with less effort than other men.'},
                {name: 'Blademasters', desc: 'Dúnadan are master swordsmen, and are able to defend themselves better with bladed weapons.'},
                {name: 'Leadership Mastery', desc: 'Dúnadan have a natural affinity for Leadership.'},
                {name: 'Shared Knowledge', desc: 'Dúnadan are natural teachers. They will share a portion of their knowledge in ranger skills with their followers who are not as proficient as they are.'},
                {name: 'Track Mastery', desc: 'Dúnadan are excellent trackers. They will get a bonus to their ability to track as they become more well-rounded rangers.'},
              ],
            },
            { 
              name: 'Eriadorian', 
              traits: [
                {name: 'Tavern Regular', desc: 'Friendly inns throughout Arda treat them as locals when they rent.'},
                {name: 'Adaptable', desc: 'They start the game with five bonus practice points.'},
                {name: 'Tharbad', desc: 'It is easier for them to obtain Tharbad citizenship.'},
              ],
            },
          ]
        },
      ]
    },
    {
      name: 'Minions of Sauron',
      races: [
        {
          name: 'Orc',
          lifespan: 2,
          stats: { str: 2, int: -3, wis: -2, dex: 0, con: 2, wil: -2, per: 0 },
          traits: [
            {name: 'Strength in Numbers', desc: 'Orcs feel empowered when grouped with more of their own kind.'},
            {name: 'Sun Aversion', desc: 'Orcs become very weak under direct Sunlight.'},
            {name: 'Night Vision', desc: 'Orcs can see in the dark without a light source.'},
            {name: 'Fire Resistance', desc: 'Orcs have a natural resistance to fire.'},
            {name: 'Poison Resistance', desc: 'Orcs have a natural resistance to poison.'},
          ],
          subraces: [
            { 
              name: 'Tarkhnarb', 
              traits: [
                {name: 'Orc Brewing', desc: 'Tarkhnarb Orcs mix Orkish herblores with an increased proficiency equal to 3 herbal kit upgrades.'},
                {name: 'Cave Climbing', desc: 'Tarkhnarb Orcs are tunnel born and have a natural affinity to climbing in caves, tunnels, and other familiar terrain.'},
                {name: 'Spirit Link', desc:  'Tarkhnarb Orcs form a link to the wraith-world through raise dead, increasing their mana regeneration and sharpening their awareness.'},
                {name: 'Bloodlust', desc: 'Encountering or fighting the Free People will cause Tarkhnarb Orcs to temporarily increase their offensive bonus.'},
              ],
            },
            { 
              name: 'Morruhk', 
              traits: [
                {name: 'Foot Tracker', desc: 'Morruhk Orcs have a greatly increased track skill when on foot.'},
                {name: 'Slavering Mastery', desc: 'If Morruhk Orcs achieve superb riding, they are less likely to fall from their mounts, and their mounts are less likely to refuse.'},
                {name: 'Call Warg', desc:  'Slavering and dreadful wargs will come when called by a Morruhk Orc.'},
                {name: 'Warg Bash', desc:  'Dreadful wargs can bash doors when called and have a higher chance of listening to their commands.'},
                {name: 'Blood Trail', desc:  'Encountering or fighting the Free People will cause Orcs to temporarily increase their tracking skill.'},
              ],
            },
          ]
        },
        {
          name: 'Troll',
          lifespan: 2,
          stats: { str: 7, int: -3, wis: -3, dex: -3, con: 4, wil: -3, per: -2 },
          traits: [
            {name: 'Sundeath', desc: 'Trolls suffer tremendous damage under sunlight.'},
            {name: 'Night Vision', desc: 'Trolls can see in the dark without a light source.'},
            {name: 'Trollskin', desc: 'Trolls have a thick hide, providing them with strong natural armour.'},
            {name: 'Poison Resistance', desc: 'Trolls have a natural resistance to poison.'},
            {name: 'Fire Weakness', desc: 'Trolls have a natural weakness to fire.'},

          ],
          subraces: [
            { 
              name: 'Cave', 
              traits: [
                {name: 'Cave Regen', desc: 'Cave Trolls have slightly increased hit point regeneration. This bonus is increased when in a cave or tunnel.'},
                {name: 'Multi Bash', desc: 'Cave Trolls have huge bashes which may cause the victim to hurtle and collide with a nearby engaged target.'},
              ],
            },
            { 
              name: 'Hill', 
              traits: [
                {name: 'Concussive Blows', desc: 'Hill Trolls deal extra damage to stunned opponents when wielding a concussion weapon.'},
                {name: 'Storm into Combat', desc: 'Hill Trolls enjoy storming into battle and get a higher offensive bonus when aggressive or berserk.'},
                {name: 'Burrow', desc: 'Hill Trolls can burrow under certain conditions.'},
              ],
            },
            { 
              name: 'Mountain', 
              traits: [
                {name: 'Battering Rams', desc: 'Mountain Trolls are highly efficient with battle rams, moving them with increased speed and reduced move cost.'},
                {name: 'Wild Attacks', desc: 'Mountain Trolls will sometimes hit nearby targets with wild attacks when engaged in combat.'},
                {name: 'Troll Efficiency', desc: 'Mountain Trolls can shake trees, push boulders, drag corpses, open doors, and dig with increased speed and reduced move cost. '},
              ],
            },
          ]
        },
        {
          name: 'Númenórean',
          lifespan: 1.5,
          stats: { str: 0, int: 0, wis: -1, dex: 0, con: 0, wil: -2, per: 0 },
          traits: [
            {name: 'Camp Rent', desc: 'Black Númenóreans have no cities in which to rent. However, they can camp outside.'},
            {name: 'Wandering Guilds', desc: 'Black Númenóreans must wander in search of those guild masters of theirs who have made the trip to Eriador. No warrior guild masters have ever been found, so their weapon skills are limited.'},
            {name: 'Depression', desc: 'Black Númenórean can suffer from depression when they die or backfire spells.'},
          ],
          subraces: [
            { 
              name: 'Black', 
              traits: [
                {name: 'Embrace Darkness', desc: 'Black Númenóreans have increased mana regeneration and a decreased chance to backfire spells when under the Necromancer\'s darkness.'},
                {name: 'Beast Rider', desc: 'The Fell Beasts will carry Black Númenóreans further than anyone else.'},
                {name: 'Venomous', desc: 'Carried vials of poison and envenomed weapons will last twice as long for Black Númenóreans.'},
                {name: 'Poison Mixer', desc: 'Black Númenóreans mix herblores that produce vials of poison or their antidotes with an increased proficiency equal to two herbal kit upgrades.'},
              ],
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
          traits: [
            {name: 'Sun Aversion', desc: 'Orcs become very weak under direct Sunlight.'},
            {name: 'Night Vision', desc: 'Orcs can see in the dark without a light source.'},
            {name: 'Fire Resistance', desc: 'Orcs have a natural resistance to fire.'},
            {name: 'Poison Resistance', desc: 'Orcs have a natural resistance to poison.'},
          ],
          subraces: [
            { 
              name: 'Zaugurz', 
              traits: [
                {name: 'Snow Affinity', desc: 'Zaugurz Orcs are able to move through snow more easily.'},
                {name: 'Pain Tolerance', desc: 'Zaugurz Orcs possess heightened pain tolerance. The cold numbs them to injuries, allowing them to fight with reduced hindrance.'},
                {name: 'Fearless Resolve', desc: 'Zaugurz Orcs exhibit fearless resolve, rarely panicking or succumbing to fear effects, showcasing an unwavering determination to crush their enemies.'},
                {name: 'Frenzied Bloodlust', desc: 'Zaugurz Orcs unleash frenzied bloodlust during battle, showcasing heightened agility and speed, allowing them to pivot and dodge through the battlefield with a relentless and predatory grace.'},
              ],
            },
          ],
        },
      ],
    }
  ]
};