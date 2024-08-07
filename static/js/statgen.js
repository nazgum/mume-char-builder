export class StatGen {
  constructor() {
    this.initialStats = { str: 8, int: 8, wis: 8, dex: 8, con: 8, wil: 8, per: 8 };
    this.availablePoints = 175;
    this.raceModifiers = { str: 0, int: 0, wis: 0, dex: 0, con: 0, wil: 0, per: 0 };

    this.addResetButtonListener();
  }

  getStatCost(baseValue, currentValue) {
    console.log("base value: ", baseValue);
    console.log("current value: ", currentValue);
    let cost = 0;
    let count = 0;
    for (let i = baseValue; i < currentValue; i++) {
      count += 1
      cost += count;
    }
    console.log("cost: ", cost)
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
    this.raceModifiers = raceStats; // Update the race modifiers
    for (let stat in this.initialStats) {
      const baseValue = this.initialStats[stat] + this.raceModifiers[stat];
      const statInput = document.getElementById(stat);
      statInput.value = baseValue;
      statInput.min = baseValue;
      statInput.max = baseValue + 10;

      document.getElementById(`${stat}-current`).textContent = baseValue;
      document.getElementById(`${stat}-min`).textContent = baseValue;
      document.getElementById(`${stat}-max`).textContent = baseValue + 10;

    }
    this.updateAvailablePoints();
  }

  updateAvailablePoints() {
    let usedPoints = 0;
    for (let stat in this.initialStats) {
      const baseValue = this.initialStats[stat] + this.raceModifiers[stat];
      const currentValue = parseInt(document.getElementById(stat).value) || baseValue;
      usedPoints += this.getStatCost(baseValue, currentValue);
    }
    this.availablePoints = 175 - usedPoints; // Update available points
    document.getElementById('availablePoints').textContent = `Available points: ${this.availablePoints}`;
  }

  addStatInputListeners() {
    for (let stat in this.initialStats) {
      const statInput = document.getElementById(stat);

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

        console.log("avail points: ", this.availablePoints);

        while (this.availablePoints < 0) {
          console.log("reducing stat til points >= 0")
          value -= 1
          statInput.value = value; 
          this.updateAvailablePoints();
        }

        document.getElementById(`${stat}-current`).textContent = value;
      });
    }
  }

  resetStats() {
    for (let stat in this.initialStats) {
      const baseValue = this.initialStats[stat] + this.raceModifiers[stat];
      const statInput = document.getElementById(stat);
      statInput.value = baseValue;
    }
    this.updateAvailablePoints();
  }

  addResetButtonListener() {
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
      resetButton.addEventListener('click', () => this.resetStats());
    }
  }
}