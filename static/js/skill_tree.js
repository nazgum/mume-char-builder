import { skillsList } from './data/skills_list.js';

export class SkillTree {
  constructor(character) {
    this.character  = character
    this.statGen    = character.statGen
    this.skills_div = document.getElementById('skills');
  }

  updateSkills(faction, race, subrace) {
    this.skills_div.innerHTML = '';  // Clear content

    // Group skills by class
    let skill_groups = skillsList.reduce((groups, skill) => {
      if (!groups[skill.class]) {
        groups[skill.class] = [];
      }
      groups[skill.class].push(skill);
      return groups;
    }, {});

    for (let [skill_class, skillsList] of Object.entries(skill_groups)) {
      let group_div = document.createElement('div');
      group_div.classList.add('skill-group');
  
      let title_div = document.createElement('div');
      title_div.classList.add('skill-group-title');
      title_div.textContent = `${skill_class} Skills`;
      group_div.appendChild(title_div);

      let avail_skills = skillsList.filter(skill => 
        skill.factions.includes(faction.name) && !skill.exclude_races.includes(race.name)
      );

      if (avail_skills.length === 0) {
        group_div.classList.add('hide');
      }

      avail_skills.forEach(skill => {
        let skill_div           = document.createElement('div');
        let skill_content_div   = document.createElement('div');
        let skill_name_div      = document.createElement('div');
        let skill_pracs_div     = document.createElement('div');
        let skill_knowledge_div = document.createElement('div');

        skill_div.classList.add('skill');
        skill_div.setAttribute('data-class', skill.class);
        skill_name_div.classList.add('skill-name');
        skill_pracs_div.classList.add('skill-pracs');
        skill_knowledge_div.classList.add('skill-knowledge');

        skill_div.appendChild(skill_name_div);
        skill_div.appendChild(skill_pracs_div);
        skill_div.appendChild(skill_knowledge_div);


        skill_div.dataset.skillName = skill.name;
        skill_name_div.textContent = skill.name;

        let pracs_input = document.createElement('input');
        pracs_input.classList.add('pracs-input');
        pracs_input.type = 'number';
        pracs_input.value = 0;
        pracs_input.min = 0;
        pracs_input.max = skill.pracs[race.name] || skill.pracs.max;
        
        let pracs_label = document.createElement('span');
        pracs_label.textContent = `/ ${pracs_input.max}`;

        skill_pracs_div.appendChild(pracs_input);
        skill_pracs_div.appendChild(pracs_label);

        let knowledge_span = document.createElement('span');
        knowledge_span.classList.add('knowledge-value');
        knowledge_span.textContent = '0%';
        let knowledge_divider = document.createElement('span');
        knowledge_divider.textContent = ' / ';
        let knowledge_max_span = document.createElement('span');
        knowledge_max_span.classList.add('knowledge-max');
        let knowledge_max = Math.round(this.statGen.calculateKnowledge(skill));
        knowledge_max_span.textContent = `/${knowledge_max}%`;

        skill_knowledge_div.appendChild(knowledge_span);
        skill_knowledge_div.appendChild(knowledge_divider);
        skill_knowledge_div.appendChild(knowledge_max_span);

        group_div.appendChild(skill_div);

        pracs_input.addEventListener('input', () => {
          this.enforcePracLimits(pracs_input);
          this.updateKnowledge(pracs_input.value, pracs_input.max, knowledge_span, knowledge_max_span);
          this.character.updateAvailPracs();
        });

        pracs_input.addEventListener('focus', () => {
          pracs_input.select();
        });
      });

      this.skills_div.appendChild(group_div);
    }
  }

  enforcePracLimits(pracs_input) {
    let pracs_spent = parseInt(pracs_input.value)
    let pracs_max   = parseInt(pracs_input.max);
    if (pracs_spent < 0 || isNaN(pracs_spent)) {
      pracs_input.value = 0;
    } else if (pracs_spent > pracs_max) {
      pracs_input.value = pracs_max
    }
  }

  updateKnowledge(pracs_spent, pracs_max, knowledge_span, knowledge_max_span) {
    pracs_spent   = parseInt(pracs_spent);
    pracs_max     = parseInt(pracs_max);
    let knowledge_max = parseInt(knowledge_max_span.textContent);
    let knowledge_current = knowledge_max/pracs_max * pracs_spent;

    // Weights: first prac worth 3x, last prac worth 1/3x
    let start_weight = 3;
    let end_weight = 1 / 3;
    let weight_decrement = (start_weight - end_weight) / (pracs_max - 1);

    let total_weight = 0;
    let current_weight = start_weight;

    for (let i = 1; i <= pracs_spent; i++) {
      total_weight += current_weight;
      current_weight -= weight_decrement;
    }

    let max_total_weight = 0;
    current_weight = start_weight;
    for (let i = 1; i <= pracs_max; i++) {
      max_total_weight += current_weight;
      current_weight -= weight_decrement;
    }

    knowledge_current = (total_weight / max_total_weight) * knowledge_max;
    knowledge_current = Math.round(knowledge_current);

    knowledge_span.textContent = `${knowledge_current}%`;
  }
}