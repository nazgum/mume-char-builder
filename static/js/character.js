import { charInfo } from './data/char_info.js';
import { StatGen } from './stat_gen.js';
import { SkillTree } from './skill_tree.js';
import { Traits } from './traits.js';

export class Character {
  constructor() {
    this.statGen        = new StatGen();
    this.skillTree      = new SkillTree(this.statGen);
    this.traits         = new Traits();

    // refs to html elements
    this.faction_select = document.getElementById('faction');
    this.race_select    = document.getElementById('race');
    this.subrace_select = document.getElementById('subrace');
    this.level_input    = document.getElementById('level');
    this.pracs_span     = document.getElementById('pracs');

    this.setupListeners();
    this.populateFactions();
    this.statGen.resetStats();
  }

  populateFactions() {
    charInfo.factions.forEach(faction => {
      let option = document.createElement('option');
      option.value = faction.name;
      option.textContent = faction.name;
      this.faction_select.appendChild(option);
    });

    // Set the first faction as selected and populate races
    this.faction_select.selectedIndex = 0;
    this.populateRaces(charInfo.factions[0].name);
  }

  populateRaces(faction_name) {
    this.race_select.innerHTML = '';
    let faction = charInfo.factions.find(f => f.name === faction_name);
    faction.races.forEach(race => {
      let option = document.createElement('option');
      option.value = race.name;
      option.textContent = race.name;
      this.race_select.appendChild(option);
    });

    // Set the first race as selected and populate subraces
    this.race_select.selectedIndex = 0;
    this.populateSubraces(faction.races[0].name);
  }

  populateSubraces(race_name) {
    this.subrace_select.innerHTML = '';

    let faction_name = this.faction_select.value;
    let faction = charInfo.factions.find(f => f.name === faction_name);
    let race = faction.races.find(r => r.name === race_name);

    race.subraces.forEach(subrace => {
      const option = document.createElement('option');
      option.value = subrace.name;
      option.textContent = subrace.name;
      this.subrace_select.appendChild(option);
    });

    // Set the first subrace as selected and update traits
    this.subrace_select.selectedIndex = 0;

    this.skillTree.updateSkills(faction, race, race.subraces[0]);
    this.statGen.updateSkillsKnowledge();
    this.traits.updateTraits(race, race.subraces[0]);

    this.statGen.updateStats(race.stats); // Update stats based on the selected race
    this.statGen.addStatInputListeners(race.stats); // Add listeners for stat inputs
  }

  setupListeners() {
    this.faction_select.addEventListener('change', () => {
      let selected_faction = this.faction_select.value;
      this.populateRaces(selected_faction);
      this.statGen.resetStats();
    });

    this.race_select.addEventListener('change', () => {
      let selected_race = this.race_select.value;
      this.populateSubraces(selected_race);
      this.statGen.resetStats();
    });

    this.subrace_select.addEventListener('change', () => {
      let selected_faction = this.faction_select.value;
      let selected_race    = this.race_select.value;
      let selected_subrace = this.subrace_select.value;

      let faction = charInfo.factions.find(f => f.name === selected_faction);
      let race = faction.races.find(r => r.name === selected_race);
      let subrace = race.subraces.find(sr => sr.name === selected_subrace);

      if (faction && race && subrace) {
        this.skillTree.updateSkills(faction, race, subrace);
        this.statGen.updateSkillsKnowledge();
        this.traits.updateTraits(race, subrace);
        this.statGen.resetStats();
      }
    });
  }
}