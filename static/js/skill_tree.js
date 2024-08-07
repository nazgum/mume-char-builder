import { skillsList } from './data/skills_list.js';

export class SkillTree {
  constructor(statGen) {
    this.skills_div = document.getElementById('skills');
    this.statGen = statGen
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

      avail_skills.forEach(skill => {
        let skill_div           = document.createElement('div');
        let skill_content_div   = document.createElement('div');
        let skill_name_div      = document.createElement('div');
        let skill_pracs_div     = document.createElement('div');
        let skill_knowledge_div = document.createElement('div');

        skill_div.classList.add('skill');
        skill_name_div.classList.add('skill-name');
        skill_pracs_div.classList.add('skill-pracs');
        skill_knowledge_div.classList.add('skill-knowledge');

        skill_div.appendChild(skill_name_div);
        skill_div.appendChild(skill_pracs_div);
        skill_div.appendChild(skill_knowledge_div);


        skill_div.dataset.skillName = skill.name;
        skill_name_div.textContent = skill.name;

        let pracs_input = document.createElement('input');
        pracs_input.type = 'number';
        pracs_input.value = 0;
        pracs_input.min = 0;
        pracs_input.max = skill.pracs[race.name] || skill.pracs.max;
        
        let pracs_label = document.createElement('span');
        pracs_label.textContent = `/ ${pracs_input.max} Pracs`;

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
      });

      this.skills_div.appendChild(group_div);
    }
  }
}