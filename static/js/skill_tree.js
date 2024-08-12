import { charInfo } from './data/char_info.js';
import { skillsList } from './data/skills_list.js';

export class SkillTree {
  constructor(character) {
    this.character       = character
    this.statGen         = character.statGen
    this.classFilter     = 'all'
    this.pracsSpent      = {}
    this.skills_div      = document.getElementById('skills');
    this.skills_tabs     = document.getElementById('skills-tabs');

    // faction btns
    document.querySelectorAll('#skills-tabs .tab').forEach(tab => {
      tab.addEventListener('click', (event) => {
        this.classFilter = event.target.getAttribute('data-class');

        // highlight selected tab
        document.querySelectorAll('#skills-tabs .tab').forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');

        if (this.classFilter === 'all') {
          document.querySelectorAll('#skills-list .skill-group').forEach(skillGroup => {
            skillGroup.classList.remove('hidden');
          });
        } else {
          document.querySelectorAll('#skills-list .skill-group').forEach(skillGroup => {
            skillGroup.classList.add('hidden')
            if (skillGroup.getAttribute('data-class') === this.classFilter) {
              skillGroup.classList.remove('hidden');
            }
          });
        }
      });
    });
  }

  resetTabs() {
    this.classFilter = 'all'

    // hide all skill tabs except all by default
    this.skills_tabs.querySelectorAll('.tab').forEach(tab => {
      let tab_class = tab.getAttribute('data-class');
      if (tab_class === 'all') {
        tab.style.display = 'inline-block';
      } else {
        tab.style.display = 'none';
      }
    });
  }

  updateSkills() {
    //this.skills_div.innerHTML = '';  // Clear content
    let old_skills_list = document.getElementById('skills-list');
    this.skills_div.removeChild(old_skills_list);

    let new_skills_list = document.createElement('div');
    new_skills_list.setAttribute('id', 'skills-list');
    this.skills_div.appendChild(new_skills_list);

    // Group skills by class
    let skill_groups = skillsList.reduce((groups, skill) => {
      if (!groups[skill.class]) {
        groups[skill.class] = [];
      }
      groups[skill.class].push(skill);
      return groups;
    }, {});

    // hide all skill tabs except all by default
    this.skills_tabs.querySelectorAll('.tab').forEach(tab => {
      let tab_class = tab.getAttribute('data-class');
      if (tab_class === 'all') {
        tab.style.display = 'inline-block';
        tab.classList.add('active');
      } else {
        tab.style.display = 'none';
        tab.classList.remove('active');
      }
    });

    for (let [skill_class, skillsList] of Object.entries(skill_groups)) {
      let group_div = document.createElement('div');
      group_div.classList.add('skill-group');
      group_div.setAttribute('data-class', skill_class);
  
      let title_div = document.createElement('div');
      title_div.classList.add('skill-group-title');
      title_div.textContent = `${skill_class} Skills`;
      group_div.appendChild(title_div);

      let avail_skills = skillsList.filter(skill => 
        skill.factions.includes(this.character.faction) && !skill.exclude_races.includes(this.character.race)
      );

      if (avail_skills.length === 0) {
        group_div.classList.add('hide');
      } else {
        this.skills_tabs.querySelectorAll('.tab').forEach(tab => {
          let tab_class = tab.getAttribute('data-class');
          if (tab_class === skill_class) {
            tab.style.display = 'inline-block';
          }
        });
      }

      avail_skills.forEach(skill => {
        let skill_div           = document.createElement('div');
        let skill_name_div      = document.createElement('div');
        let skill_stats_div     = document.createElement('div');
        let skill_pracs_div     = document.createElement('div');
        let skill_knowledge_div = document.createElement('div');

        skill_div.classList.add('skill');
        skill_div.setAttribute('data-class', skill.class);

        skill_name_div.classList.add('skill-name');
        skill_stats_div.classList.add('skill-stats');
        skill_pracs_div.classList.add('skill-pracs');
        skill_knowledge_div.classList.add('skill-knowledge');

        skill_div.appendChild(skill_name_div);
        skill_div.appendChild(skill_stats_div);
        skill_div.appendChild(skill_pracs_div);
        skill_div.appendChild(skill_knowledge_div);

        skill_div.dataset.skillName = skill.name;
        skill_name_div.textContent = skill.name;

        skill_stats_div.textContent = this.skillStats(skill);

        let pracs_input = document.createElement('input');
        pracs_input.classList.add('pracs-input');
        pracs_input.setAttribute('data-class', skill.class);
        pracs_input.type = 'number';
        pracs_input.value = 0;
        pracs_input.min = 0;
        pracs_input.max = skill.pracs[this.character.race] || skill.pracs.max;
        
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

        pracs_input.addEventListener('change', () => {
          this.enforcePracLimits(pracs_input);
          this.updatePracsSpent();
          this.updateKnowledge();
          this.character.updateAvailPracs();
        });
    
        pracs_input.addEventListener('blur', () => {
          this.enforcePracLimits(pracs_input);
          this.updatePracsSpent();
          this.updateKnowledge();
          this.character.updateAvailPracs();
        });

        pracs_input.addEventListener('focus', () => {
          pracs_input.select();
        });
      });

      new_skills_list.appendChild(group_div);
    }
  }

  skillStats(skill) {
    let keys = Object.keys(skill.knowledge); // Get all keys from the object
    let statKeys = keys.filter(key => key !== 'base');
    return statKeys.map(key => key.toUpperCase()).join(' + ');
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

  updatePracsSpent() {
    this.pracsSpent = {};

    let pracsInputs = this.skills_div.querySelectorAll('.pracs-input');

    pracsInputs.forEach(input => {
        let skill_class  = input.getAttribute('data-class');
        let pracs_amount = parseInt(input.value) || 0;

        if (!this.pracsSpent[skill_class]) {
            this.pracsSpent[skill_class] = 0;
        }

        this.pracsSpent[skill_class] += pracs_amount;
    });

    console.log(this.pracsSpent);
  }

  calcMultiClass(pracs_input, knowledge_current) {
    //let total_pracs = 0
    let skill_class = pracs_input.getAttribute('data-class');

    // Iterate over pracsSpent object
    /*for (let [class_name, pracs] of Object.entries(this.pracsSpent)) {
      // Exclude pracs for "Ranger" and the current class
      if (class_name !== "Ranger" && class_name !== skill_class) {
          total_pracs += pracs;
      }
    }*/
    // Precompute total pracs outside of the loop
    let total_pracs = Object.entries(this.pracsSpent).reduce((total, [class_name, pracs]) => {
      if (class_name !== "Ranger" && class_name !== skill_class) {
        return total + pracs;
      }
      return total;
    }, 0);

    // Calculate the total drop using a fixed weight of 0.1
    let drop = total_pracs * 0.1;
    
    // Apply the drop and enforce the minimum cap
    let max_drop = 25;
    let min_knowledge = Math.max(0, Math.round(knowledge_current - max_drop));
    let knowledge = Math.round(knowledge_current - drop);

    return Math.max(knowledge, min_knowledge);
  }

  updateKnowledge() {
    console.log("update knowledge");

    let skillElements = document.querySelectorAll('.skill');
    skillElements.forEach(skillElement => {
      let pracs_input = skillElement.querySelector('.pracs-input');
      let knowledge_span = skillElement.querySelector('.knowledge-value');
      let knowledge_max_span = skillElement.querySelector('.knowledge-max');

      let pracs_spent   = parseInt(pracs_input.value);
      let pracs_max     = parseInt(pracs_input.max);
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

      if (pracs_input.getAttribute('data-class') !== 'Ranger') {
        knowledge_current = this.calcMultiClass(pracs_input, knowledge_current);
      }

      let faction = charInfo.factions.find(f => f.name === this.character.faction);
      let race = faction.races.find(r => r.name === this.character.race);
      let subrace = race.subraces.find(sr => sr.name === this.character.subrace);

      let skill_name = skillElement.getAttribute('data-skill-name');
      let subrace_trait = subrace.traits.find(trait => trait.skill === skill_name);

      if (subrace_trait) {
        console.log("adding trait amount: ", subrace_trait.amount);
        knowledge_current += subrace_trait.amount;
      }

      knowledge_span.textContent = `${knowledge_current}%`;
    });
  }
}