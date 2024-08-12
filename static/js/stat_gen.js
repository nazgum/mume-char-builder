import { skillsList } from './data/skills_list.js';

export class StatGen {
  constructor(character) {
    this.character  = character
    this.initialStats = { str: 8, int: 8, wis: 8, dex: 8, con: 8, wil: 8, per: 8 };
    this.availablePoints = 175;
    this.raceModifiers = { str: 0, int: 0, wis: 0, dex: 0, con: 0, wil: 0, per: 0 };
    this.pointsSpent = { str: 0, int: 0, wis: 0, dex: 0, con: 0, wil: 0, per: 0 };

    this.addResetButtonListener();
    this.addStatInputListeners();
  }

  getStatCost(baseValue, currentValue) {
    let cost = 0;
    let count = 0;
    for (let i = baseValue; i < currentValue; i++) {
      count += 1
      cost += count;
    }
    return cost;
  }

  getStatNextCost(baseValue, currentValue) {
    console.log("base value: ", baseValue);
    console.log("current value: ", currentValue);
    let cost = 0;
    for (let i = baseValue; i < currentValue; i++) {
      cost += 1;
    }
    console.log("cost: ", cost)
    return cost;
  }

  updateStats(raceStats) {
    this.raceModifiers = raceStats;

    for (let stat in this.initialStats) {
      let baseValue = this.initialStats[stat] + this.raceModifiers[stat];
      let statInput = document.getElementById(stat);
      statInput.min = baseValue;
      statInput.max = baseValue + 10;
      statInput.value = baseValue + this.pointsSpent[stat];

      document.getElementById(`${stat}-min`).textContent = statInput.min;
      document.getElementById(`${stat}-max`).textContent = statInput.max;
      document.getElementById(`${stat}-current`).textContent = statInput.value;

    }
    this.updateAvailablePoints();
    this.updateSkillsKnowledge();
  }

  updateAvailablePoints() {
    let usedPoints = 0;
    for (let stat in this.initialStats) {
      let baseValue = this.initialStats[stat] + this.raceModifiers[stat];
      let currentValue = parseInt(document.getElementById(stat).value) || baseValue;
      usedPoints += this.getStatCost(baseValue, currentValue);
    }
    this.availablePoints = 175 - usedPoints; // Update available points
    document.getElementById('availablePoints').textContent = `Available points: ${this.availablePoints}`;
  }

  calculateKnowledge(skill) {
    let knowledge = skill.knowledge.base;
    if (skill.knowledge.per) {
      const perValue = parseInt(document.getElementById('per').value);
      knowledge += skill.knowledge.per * perValue;
    }
    if (skill.knowledge.int) {
      const intValue = parseInt(document.getElementById('int').value);
      knowledge += skill.knowledge.int * intValue;
    }
    if (skill.knowledge.str) {
      const strValue = parseInt(document.getElementById('str').value);
      knowledge += skill.knowledge.str * strValue;
    }
    if (skill.knowledge.wis) {
      const wisValue = parseInt(document.getElementById('wis').value);
      knowledge += skill.knowledge.wis * wisValue;
    }
    if (skill.knowledge.dex) {
      const dexValue = parseInt(document.getElementById('dex').value);
      knowledge += skill.knowledge.dex * dexValue;
    }
    if (skill.knowledge.con) {
      const conValue = parseInt(document.getElementById('con').value);
      knowledge += skill.knowledge.con * conValue;
    }
    if (skill.knowledge.wil) {
      const wilValue = parseInt(document.getElementById('wil').value);
      knowledge += skill.knowledge.wil * wilValue;
    }

    let race_max = skill.pracs[this.character.race] || skill.pracs.max;

    return Math.round(knowledge * race_max / skill.pracs.max);
  }

  updateSkillsKnowledge() {
    let skillElements = document.querySelectorAll('.skill');

    let avail_skills = skillsList.filter(skill => 
      skill.factions.includes(this.character.faction) && !skill.exclude_races.includes(this.character.race)
    );

    skillElements.forEach(skillElement => {
      let skillName = skillElement.dataset.skillName;
      let skillClass = skillElement.getAttribute('data-class')
      let skill = avail_skills.find(s => s.name === skillName && s.class === skillClass);
      let knowledgeMax = Math.round(this.calculateKnowledge(skill));

      if (knowledgeMax > skill.knowledge_cap) {
        knowledgeMax = skill.knowledge_cap;
      }
      skillElement.querySelector('.knowledge-max').textContent = `${knowledgeMax}%`;

      // update the practiced knowledge of the skill
      let pracs_input = skillElement.querySelector('.pracs-input');
      let knowledge_span = skillElement.querySelector('.knowledge-value');
      let knowledge_max_span = skillElement.querySelector('.knowledge-max');

      this.character.skillTree.updateKnowledge(pracs_input, knowledge_span, knowledge_max_span);
    });
  }

  addStatInputListeners() {
    for (let stat in this.initialStats) {
      let statInput = document.getElementById(stat);

      statInput.addEventListener('input', () => {
        let baseValue = this.initialStats[stat] + this.raceModifiers[stat];
        let maxValue = baseValue + 10;
        let value = parseInt(statInput.value) || baseValue;

        // Clamp value within min and max
        value = Math.max(baseValue, Math.min(value, maxValue));

        // Calculate the cost to raise the stat
        let cost = this.getStatNextCost(baseValue, value);

        statInput.value = value;
        this.updateAvailablePoints();

        // if cannot afford stat, reduce stat til have enough points to get it
        while (this.availablePoints < 0) {
          value -= 1
          statInput.value = value; 
          this.updateAvailablePoints();
        }

        this.pointsSpent[stat] = value - baseValue;

        this.updateSkillsKnowledge();

        document.getElementById(`${stat}-current`).textContent = value;
      });
    }
  }

  resetStats() {
    console.log("reset stats");
    
    this.pointsSpent = { str: 0, int: 0, wis: 0, dex: 0, con: 0, wil: 0, per: 0 };

    for (let stat in this.initialStats) {
      const baseValue = this.initialStats[stat] + this.raceModifiers[stat];
      const statInput = document.getElementById(stat);
      statInput.value = baseValue;
    }

    this.updateAvailablePoints();
    this.updateSkillsKnowledge();
  }

  addResetButtonListener() {
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
      resetButton.addEventListener('click', () => this.resetStats());
    }
  }
}