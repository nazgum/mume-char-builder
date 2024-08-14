export class Build {
  constructor(character) {
    this.character = character;
    this.statGen   = character.statGen;
    this.skillTree = character.skillTree;
    this.loading   = false

    let btn = document.getElementById('save-build')
    btn.addEventListener('click', () => {
      this.save();
    });

    document.getElementById('close-dialog').addEventListener('click', () => {
      document.getElementById('copy-dialog').close();
    });

    // Check for URL parameters and load data if present
    let path = window.location.pathname;
    let segments = path.split('/');
    let encodedData = segments[segments.length - 1];

    console.log("encoded data: ", encodedData);

    if (encodedData) {
      this.load(decodeURIComponent(encodedData));
    }
  }

  encodeUrl(str) {
    return btoa(str)
        .replace(/\+/g, '-') // Convert + to -
        .replace(/\//g, '_') // Convert / to _
        .replace(/=+$/, ''); // Remove ending '='
  }

  decodeUrl(str) {
    str = str
        .replace(/-/g, '+') // Convert - to +
        .replace(/_/g, '/'); // Convert _ to /
    let padding = str.length % 4;
    if (padding > 0) {
        str += '='.repeat(4 - padding); // Add padding if necessary
    }
    return atob(str);
  }

  save() {
    let data = {
      faction: this.character.faction,
      race: this.character.race,
      class: this.character.class,
      subclass: this.character.subclass,
      level: this.character.level,
      pointsSpent: this.statGen.pointsSpent,
      availPoints: this.statGen.availPoints,
      pracsSpent:  this.skillTree.pracsSpent
    };

    // encode the data
    let json = JSON.stringify(data);
    let encoded = this.encodeUrl(json);
    let link = `${window.location.origin}/build/${encoded}`;

    console.log("url: ", link);

    //return `${window.location.origin}/build/${encoded}`;

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

  load(encoded) {
    this.loading = true;

    // Decode the data from the URL
    let data = JSON.parse(atob(encoded));

    // Restore build properties
    this.character.faction    = data.faction;
    this.character.race       = data.race;
    this.character.class      = data.class;
    this.character.subclass   = data.subclass;
    this.character.level      = data.level;
    this.statGen.pointsSpent  = data.pointsSpent;
    this.statGen.availPoints  = data.availPoints;
    this.skillTree.pracsSpent = data.pracsSpent;

    console.log("build data: ", data);
  }
}