import { charInfo } from './data/char_info.js';
import { StatGen } from './stat_gen.js';
import { SkillTree } from './skill_tree.js';
import { Traits } from './traits.js';

export class Character {
  constructor() {
    this.statGen        = new StatGen(this);
    this.skillTree      = new SkillTree(this);
    this.traits         = new Traits();
    this.pracs_avail    = 0;
    this.pracs_max      = 0;
    this.pracs_spent    = {};
    this.faction        = "Free Folk";
    this.race           = "Dwarf";
    this.subrace        = "Broadbeam";

    // refs to html elements
    this.faction_btns     = document.getElementById('faction-btns');
    this.race_select      = document.getElementById('race');
    this.subrace_select   = document.getElementById('subrace');
    this.level_input      = document.getElementById('level');
    this.pracs_span       = document.getElementById('pracs');
    this.pracs_avail_span = document.getElementById('pracs-avail');
    this.pracs_max_span   = document.getElementById('pracs-max');

    this.setupListeners();
    this.populateRaces();
    this.statGen.resetStats();
    this.updateMaxPracs();
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
    this.faction = this.faction_select.value;
    this.populateRaces();
  }

  populateRaces() {
    this.race_select.innerHTML = '';
    let faction = charInfo.factions.find(f => f.name === this.faction);
    faction.races.forEach(race => {
      let option = document.createElement('option');
      option.value = race.name;
      option.textContent = race.name;
      this.race_select.appendChild(option);
    });

    // Set the first race as selected and populate subraces
    this.race_select.selectedIndex = 0;
    this.race = this.race_select.value;
    this.populateSubraces();
  }

  populateSubraces() {
    let faction = charInfo.factions.find(f => f.name === this.faction);
    let race = faction.races.find(r => r.name === this.race);

    this.subrace_select.innerHTML = '';

    race.subraces.forEach(subrace => {
      let option = document.createElement('option');
      option.value = subrace.name;
      option.textContent = subrace.name;
      this.subrace_select.appendChild(option);
    });

    // Set the first subrace as selected and update traits
    this.subrace_select.selectedIndex = 0;
    this.subrace = this.subrace_select.value;

    this.skillTree.updateSkills(faction, race);
    this.statGen.updateSkillsKnowledge();
    this.traits.updateTraits(race, race.subraces[0]);

    this.statGen.updateStats(race.stats); // Update stats based on the selected race
    this.statGen.addStatInputListeners(race.stats); // Add listeners for stat inputs
    this.updateMaxPracs();
  }

  calculateMaxPracs(level, race) {
    let pracs;
    if (this.faction === 'Free Folk' || race === 'Númenórean') {
      if (level <= 25) {
        pracs = 11 * level;
      } else {
        pracs = (11 * 25) + Math.floor((level - 25) / 2);
      }
    } else {
      if (level <= 25) {
        pracs = 10 * level;
      } else {
        pracs = (10 * 25) + Math.floor((level - 25) / 2);
      }
    }
    return pracs;
  }

  updateMaxPracs() {
    let level = parseInt(this.level_input.value);
    let race = this.race_select.value;
    
    if (isNaN(level) || level <= 0 || level > 100) {
      level = 1;
      this.level_input.value = level;
    }

    this.pracs_max = this.calculateMaxPracs(level, race);
    this.updateAvailPracs();
  }

  updateAvailPracs() {
    this.pracs_avail = this.calculateAvailPracs();
    this.pracs_span.textContent = `${this.pracs_avail}/${this.pracs_max}`;
  }

  calculateAvailPracs() {
    let skill_inputs = document.querySelectorAll('.pracs-input');
    let total_spent = Array.from(skill_inputs).reduce((sum, input) => sum + parseInt(input.value), 0);
    return (this.pracs_max - total_spent);
  }

  setupListeners() {

    // faction btns
    document.querySelectorAll('#faction-btns button').forEach(button => {
      button.addEventListener('click', (event) => {
        this.faction = event.target.getAttribute('data-faction');
        this.populateRaces();
        
        // Optionally, you can add some visual feedback for the selected button
        document.querySelectorAll('#faction-btns button').forEach(btn => btn.classList.remove('selected'));
        event.target.classList.add('selected');
      });
    });

    this.race_select.addEventListener('change', () => {
      this.race = this.race_select.value;
      this.populateSubraces();
    });

    this.subrace_select.addEventListener('change', () => {
      this.subrace = this.subrace_select.value;

      let faction = charInfo.factions.find(f => f.name === this.faction);
      let race = faction.races.find(r => r.name === this.race);
      let subrace = race.subraces.find(sr => sr.name === this.subrace);

      if (faction && race && subrace) {
        this.skillTree.updateSkills();
        this.traits.updateTraits(race, subrace);
        this.statGen.updateStats(race.stats);
      }
    });

    this.level_input.addEventListener('change', (event) => {
      this.updateMaxPracs();
    });

    this.level_input.addEventListener('blur', () => {
      this.updateMaxPracs();
    });
  }
}