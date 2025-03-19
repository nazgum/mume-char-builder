import { charInfo } from './data/char_info.js';
import { skillsList } from './data/skills_list.js';

export class SkillTree {
  constructor(character) {
    this.character       = character
    this.statGen         = character.statGen
    this.classFilter     = 'all'
    this.pracsPerClass   = {"Ranger": 0, "Thief": 0, "Warrior": 0, "Mage": 0, "Priest": 0, "Shaman": 0}
    this.pracsSpent      = {}
    this.skills_div      = document.getElementById('skills');
    this.skills_tabs     = document.getElementById('skills-tabs');

    this.setupTabs();
    this.setupSkillFilter();
  }

  setupTabs() {
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

  // filter icon at top
  setupSkillFilter() {
    document.querySelector('.filter-pracs').addEventListener('click', function() {
      let skills_list = document.getElementById('skills-list');
      
      this.classList.toggle('enabled');
      skills_list.classList.toggle('show-learned');
      
      // Toggle visibility of .skill elements
      skills_list.querySelectorAll('.skill').forEach(skill => {
        if (!skill.classList.contains('learned')) {
          skill.style.display = skills_list.classList.contains('show-learned') ? 'none' : '';
        }
      });
    });
  }

  startFiltered() {
    const skills_list = document.getElementById('skills-list');

    document.querySelector('.filter-pracs').classList.add('enabled');
    skills_list.classList.add('show-learned');

    skills_list.querySelectorAll('.skill').forEach(skill => {
      if (!skill.classList.contains('learned')) {
        skill.style.display = skills_list.classList.contains('show-learned') ? 'none' : '';
      }
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

    // clear enabled from filter
    document.querySelector('.filter-pracs').classList.remove('enabled');

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

    let pracs_total = Object.values(this.pracsSpent).reduce((sum, value) => sum + value, 0);

    for (let [skill_class, skillsList] of Object.entries(skill_groups)) {
      let group_div = document.createElement('div');
      group_div.classList.add('skill-group');
      group_div.setAttribute('data-class', skill_class);

      let pracs_spent = this.pracsPerClass[skill_class];

      let pracs_percent = Number(pracs_spent) / Number(pracs_total);
      if (pracs_total === 0) { pracs_percent = 0; }
      pracs_percent = Math.round(pracs_percent * 100);
  
      let title_div = document.createElement('div');
      title_div.classList.add('skill-group-title');
      group_div.appendChild(title_div);

      let name_div = document.createElement('strong');
      name_div.classList.add('skill-group-name');
      name_div.textContent = `${skill_class} Skills`;
      title_div.appendChild(name_div);

      let pracs_div = document.createElement('span');
      pracs_div.classList.add('skill-group-pracs');
      title_div.appendChild(pracs_div);

      let pracs_text = document.createElement('span');
      pracs_text.classList.add('skill-group-pracs-text');
      pracs_text.textContent = `${pracs_spent} Pracs (${pracs_percent}%)`;
      pracs_div.appendChild(pracs_text);

      let pie_chart = document.createElement('span')
      pie_chart.classList.add('pie')
      pie_chart.textContent = `${pracs_spent}/${pracs_total}`; 
      pie_chart.setAttribute('data-peity', '{"radius": 8}');
      pracs_div.appendChild(pie_chart);

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
        skill_div.dataset.class = skill.class;

        skill_name_div.classList.add('skill-name');
        skill_stats_div.classList.add('skill-stats');
        skill_pracs_div.classList.add('skill-pracs');
        skill_knowledge_div.classList.add('skill-knowledge');

        skill_div.appendChild(skill_name_div);
        skill_div.appendChild(skill_stats_div);
        skill_div.appendChild(skill_pracs_div);
        skill_div.appendChild(skill_knowledge_div);

        skill_div.dataset.skill    = skill.name;
        skill_name_div.textContent = skill.name;

        skill_stats_div.textContent = this.skillStats(skill);

        let pracs_input = document.createElement('input');
        pracs_input.classList.add('pracs-input');
        pracs_input.setAttribute('data-class', skill.class);
        pracs_input.setAttribute('data-skill', skill.name);
        pracs_input.type = 'number';
        pracs_input.value = 0;
        pracs_input.min = 0;
        pracs_input.max = skill.pracs[this.character.race] || skill.pracs.max;

        if (this.character.build.loading) {
          pracs_input.value = this.pracsSpent[skill.name];
        }
        
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
    $(".pie").peity("pie");
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
    this.pracsPerClass = {};
    this.pracsSpent    = {};

    let pracsInputs = this.skills_div.querySelectorAll('.pracs-input');

    pracsInputs.forEach(input => {
        let skill_class  = input.dataset.class;
        let skill_name   = input.dataset.skill;
        let pracs_amount = parseInt(input.value) || 0;

        if (!this.pracsPerClass[skill_class]) {
            this.pracsPerClass[skill_class] = 0;
        }

        this.pracsPerClass[skill_class] += pracs_amount;
        
        if (!this.pracsSpent[skill_name]) {
          this.pracsSpent[skill_name] = 0;
        }
        this.pracsSpent[skill_name] += pracs_amount;
    });

    console.log("pracs per class: ", this.pracsPerClass);
    console.log("pracs spent: ", this.pracsSpent);

    this.updatePracCharts()
    this.updateSkillHeaders()
  }

  updatePracCharts() {
    let total = Object.values(this.pracsSpent).reduce((sum, value) => sum + value, 0);

    for (const [className, value] of Object.entries(this.pracsPerClass)) {

      let pie_chart = this.skills_tabs.querySelector(`[data-class="${className}"] .pie`)
      pie_chart.textContent = `${value}/${total}`; 

      let pie_chart2 = this.skills_div.querySelector(`.skill-group[data-class="${className}"] .pie`)
      pie_chart2.textContent = `${value}/${total}`; 
    }

    $(".pie").peity("pie");
  }

  updateSkillHeaders() {
    let pracs_total = Object.values(this.pracsSpent).reduce((sum, value) => sum + value, 0);

    console.log("pracs: ", this.pracsPerClass)
    console.log("priest pracs: ", this.pracsPerClass['Priest'])

    for (const [className, value] of Object.entries(this.pracsPerClass)) {

      console.log("class name: ", className)

      let pracs_spent = this.pracsPerClass[className];
 
      let pracs_percent = Number(pracs_spent) / Number(pracs_total);
      if (pracs_total === 0) { pracs_percent = 0; }
      pracs_percent = Math.round(pracs_percent * 100);

      let pracs_span = this.skills_div.querySelector(`.skill-group[data-class="${className}"] .skill-group-pracs-text`)

      pracs_span.textContent = `${pracs_spent} Pracs (${pracs_percent}%)`;
    }

    $(".pie").peity("pie");
  }

  calcMultiClass(pracs_input, knowledge_current, knowledge_max) {
    //let total_pracs = 0
    let skill_class = pracs_input.getAttribute('data-class');

    // Define class relationships and scaling factors
    let class_modifiers = {
      "Thief": { "Priest": 1.3, "Shaman": 1.3 },
      "Priest": { "Thief": 1.3 },
      "Warrior": { "Mage": 1.3, "Shaman": 1.15 },
      "Mage": { "Warrior": 1.3 },
      "Shaman": { "Warrior": 1.15, "Thief": 1.3}
    };

    // Precompute total pracs outside of the loop
    let total_pracs = Object.entries(this.pracsPerClass).reduce((total, [class_name, pracs]) => {
      if (class_name !== "Ranger" && class_name !== skill_class) {

        let modifier = 1; // Default multiplier is 1

        // Apply the scaling modifier if the class relationship exists
        if (class_modifiers[skill_class] && class_modifiers[skill_class][class_name]) {
          modifier = class_modifiers[skill_class][class_name];
        }

        return total + (pracs * modifier);
      }
      return total;
    }, 0);

    // Calculate the proportional drop based on how close current knowledge is to max
    let base_drop = total_pracs * 0.1;
    let max_drop = 25;
    let proportion = knowledge_current / knowledge_max;
    let drop = Math.min(base_drop, proportion * max_drop);

    let min_knowledge = Math.max(0, Math.round(knowledge_current - drop));
    let knowledge = Math.round(knowledge_current - drop);

    return Math.max(knowledge, min_knowledge);
  }

  updateKnowledge() {
    console.log("update knowledge");

    const difficultyModifiers = {
      "Very Easy": 1.1,
      "Easy": 1.05,
      "Normal": 1.0,
      "Hard": 0.95,
      "Very Hard": 0.9
  };

    let skillElements = document.querySelectorAll('.skill');
    skillElements.forEach(skillElement => {
      let pracs_input = skillElement.querySelector('.pracs-input');
      let knowledge_span = skillElement.querySelector('.knowledge-value');
      let knowledge_max_span = skillElement.querySelector('.knowledge-max');

      let pracs_spent   = parseInt(pracs_input.value);
      let pracs_max     = parseInt(pracs_input.max);
  
      let skill_name = skillElement.getAttribute('data-skill');

      let skill_data = skillsList.find(skill =>
        skill.name === skill_name &&
        skill.factions.includes(this.character.faction) &&
        !skill.exclude_races.includes(this.character.race)
      );

      let k_max = parseInt(knowledge_max_span.textContent);
      let k_diffmod = difficultyModifiers[skill_data.difficulty];
      let k_scale = 2.8 * k_diffmod; 
      if (pracs_input.getAttribute('data-class') == "Ranger") { k_scale = 1.4 * k_diffmod; }

      let k_increase = k_max * Math.pow(pracs_spent / pracs_max, 1 / k_scale);
      let k_current = Math.round(k_increase);

      if (pracs_input.getAttribute('data-class') !== 'Ranger') {
        k_current = this.calcMultiClass(pracs_input, k_current, k_max);
      }

      let faction = charInfo.factions.find(f => f.name === this.character.faction);
      let race = faction.races.find(r => r.name === this.character.race);
      let subrace = race.subraces.find(sr => sr.name === this.character.subrace);
      let subrace_trait = subrace.traits.find(trait => trait.skill === skill_name);

      if (subrace_trait) {
        console.log("adding trait amount: ", subrace_trait.amount);
        k_current += subrace_trait.amount;
      }

      if (pracs_spent > 0 || k_current > 0) {
        skillElement.classList.add('learned');
      } else {
        skillElement.classList.remove('learned');
      }

      knowledge_span.textContent = `${k_current}%`;
    });
  }
}