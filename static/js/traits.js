export class Traits {
  constructor() {
    this.traits_div = document.getElementById('traits');
  }

  updateTraits(race, subrace) {
    this.traits_div.innerHTML = '';  // Clear content

    race.traits.forEach(trait => {
      let card = document.createElement('div');
      card.className = 'trait'

      let h4 = document.createElement('h4');
      h4.textContent = trait.name;
      let p = document.createElement('p');
      p.textContent = trait.desc;
      card.appendChild(h4);
      card.appendChild(p);

      this.traits_div.appendChild(card);
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

      this.traits_div.appendChild(card);
    });
  }
}