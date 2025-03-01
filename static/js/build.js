export class Build {
  constructor(character) {
    this.character = character;
    this.statGen   = character.statGen;
    this.skillTree = character.skillTree;
    this.loading   = false;

    this.setupButton();
    this.setupDialog();

    if (window.build_data) {
      this.load(window.build_data);
    }
  }

  setupButton() {
    document.getElementById('save-build').addEventListener('click', async () => {
      let data = {
        name:        this.character.name,
        faction:     this.character.faction,
        race:        this.character.race,
        class:       this.character.class,
        subrace:     this.character.subrace,
        level:       this.character.level,
        pointsSpent: this.statGen.pointsSpent,
        availPoints: this.statGen.availPoints,
        pracsSpent:  this.skillTree.pracsSpent
      };

      let dialog = document.getElementById('copy-dialog');
      dialog.showModal();
    
      try {
        let response = await fetch('/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
    
        if (response.ok) {
          let result = await response.json();
          let link = result.link;

          // Show the link in the dialog
          let dialog = document.getElementById('copy-dialog');

          let copied_link = document.getElementById('copied-link');
          copied_link.setAttribute('href', link);
          copied_link.innerHTML = link;
          copied_link.classList.remove('hidden');
          document.getElementById('close-dialog').classList.remove('hidden');

        } else {
          console.error('Failed to save data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  setupDialog() {
    document.getElementById('close-dialog').addEventListener('click', () => {
      document.getElementById('copy-dialog').close();
    });
  }

  save() {
    let data = {
      name: this.character.name,
      faction: this.character.faction,
      race: this.character.race,
      class: this.character.class,
      subrace: this.character.subrace,
      level: this.character.level,
      pointsSpent: this.statGen.pointsSpent,
      availPoints: this.statGen.availPoints,
      pracsSpent:  this.skillTree.pracsSpent
    };

    // encode the data
    let json = JSON.stringify(data);
    let encoded = this.encodeUrl(json);
    let link = `${window.location.origin}/build/${encoded}`;

    navigator.clipboard.writeText(link)
      .then(() => {
        console.log('Link copied to clipboard!');
        //alert('Link copied to clipboard!');
        const dialog = document.getElementById('copy-dialog');
        document.getElementById('copied-link').textContent = link;
        document.getElementById('copied-link').setAttribute('href', link);
        dialog.showModal(); // Opens the dialog as a modal
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }

  load(build_data) {
    this.loading = true;

    try {
        const buildData = JSON.parse(build_data);

        // Restore build properties
        this.character.name       = buildData.name || "";
        this.character.faction    = buildData.faction;
        this.character.race       = buildData.race;
        this.character.class      = buildData.class;
        this.character.subrace    = buildData.subrace;
        this.character.level      = buildData.level;
        this.statGen.pointsSpent  = buildData.pointsSpent;
        this.statGen.availPoints  = buildData.availPoints;
        this.skillTree.pracsSpent = buildData.pracsSpent;
    } catch (error) {
        console.error('Error loading build data:', error);
    }
  }
}
