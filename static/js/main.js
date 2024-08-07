import { data } from './data.js';
import { skills } from './skills.js';
import { StatGen } from './statgen.js';

document.addEventListener('DOMContentLoaded', () => {
  let faction_select = document.getElementById('faction');
  let race_select    = document.getElementById('race');
  let subrace_select = document.getElementById('subrace');
  let skills_div     = document.getElementById('skills');
  let traits_div     = document.getElementById('traits');

  let statGen = new StatGen();

  function populateFactions() {
    data.factions.forEach(faction => {
      let option = document.createElement('option');
      option.value = faction.name;
      option.textContent = faction.name;
      faction_select.appendChild(option);
    });

    // Set the first faction as selected and populate races
    faction_select.selectedIndex = 0;
    populateRaces(data.factions[0].name);
  }

  function populateRaces(faction_name) {
    race_select.innerHTML = '';
    let faction = data.factions.find(f => f.name === faction_name);
    faction.races.forEach(race => {
      let option = document.createElement('option');
      option.value = race.name;
      option.textContent = race.name;
      race_select.appendChild(option);
    });

    // Set the first race as selected and populate subraces
    race_select.selectedIndex = 0;
    populateSubraces(faction.races[0].name);
  }

  function populateSubraces(race_name) {
    subrace_select.innerHTML = '';

    let faction_name = faction_select.value;
    let faction = data.factions.find(f => f.name === faction_name);
    let race = faction.races.find(r => r.name === race_name);

    race.subraces.forEach(subrace => {
      const option = document.createElement('option');
      option.value = subrace.name;
      option.textContent = subrace.name;
      subrace_select.appendChild(option);
    });

    // Set the first subrace as selected and update traits
    subrace_select.selectedIndex = 0;

    updateSkills(faction, race, race.subraces[0]);
    updateTraits(race, race.subraces[0]);

    statGen.updateStats(race.stats); // Update stats based on the selected race
    statGen.addStatInputListeners(race.stats); // Add listeners for stat inputs
  }

  function updateSkills(faction, race, subrace) {
    skills_div.innerHTML = '<h4>Skills</h4>';

    let avail_skills = skills.filter(skill => 
      skill.factions.includes(faction.name) &&
      !skill.exclude_races.includes(race.name)
    );

    avail_skills.forEach(skill => {
      let card = document.createElement('div');
      card.className = 'skill'

      const h4 = document.createElement('h4');
      h4.textContent = skill.name;
      const p = document.createElement('p');
      p.textContent = `Class: ${skill.class}, Max Pracs: ${skill.pracs.max}, Percent Cap: ${skill.percent_cap}, Base: ${skill.base}, Per: ${skill.per}, Int: ${skill.int}`;
      card.appendChild(h4);
      card.appendChild(p);
      skills_div.appendChild(card);
    });

    subrace.traits.forEach(trait => {
      let card = document.createElement('div');
      card.className = 'trait'


      let h4 = document.createElement('h4');
      h4.textContent = trait.name;
      let p = document.createElement('p');
      p.textContent = trait.desc;
      card.appendChild(h4);
      card.appendChild(p);
      traits_div.appendChild(card);
    });
  }

  function updateTraits(race, subrace) {
    race.traits.forEach(trait => {
      let card = document.createElement('div');
      card.className = 'trait'

      let h4 = document.createElement('h4');
      h4.textContent = trait.name;
      let p = document.createElement('p');
      p.textContent = trait.desc;
      card.appendChild(h4);
      card.appendChild(p);
      traits_div.appendChild(card);
    });

    subrace.traits.forEach(trait => {
      let card = document.createElement('div');
      card.className = 'trait'


      let h4 = document.createElement('h4');
      h4.textContent = trait.name;
      let p = document.createElement('p');
      p.textContent = trait.desc;
      card.appendChild(h4);
      card.appendChild(p);
      traits_div.appendChild(card);
    });
  }

  faction_select.addEventListener('change', () => {
    let selected_faction = faction_select.value;
    populateRaces(selected_faction);
    statGen.resetStats();
  });

  race_select.addEventListener('change', () => {
    let selected_race = race_select.value;
    populateSubraces(selected_race);
    statGen.resetStats();
  });

  subrace_select.addEventListener('change', () => {
    let selected_faction = faction_select.value;
    let selected_race    = race_select.value;
    let selected_subrace = subrace_select.value;

    let faction = data.factions.find(f => f.name === selected_faction);
    let race = faction.races.find(r => r.name === selected_race);
    let subrace = race.subraces.find(sr => sr.name === selected_subrace);

    if (faction && race && subrace) {
      updateSkills(faction, race, subrace);
      updateTraits(race, subrace);
      statGen.resetStats();
    }
  });

  populateFactions();
  statGen.resetStats();
});