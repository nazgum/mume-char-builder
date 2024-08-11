export class Moon {
  constructor() {
    this.html       = document.querySelector('html');
    this.moon_light = document.getElementById('moon-light');
    this.moon_dark  = document.getElementById('moon-dark');

    this.moon_light.addEventListener('click', () => {
      this.moon_dark.classList.remove('hide');
      this.moon_light.classList.add('hide');
      this.html.setAttribute('data-theme', 'dark');
    });

    this.moon_dark.addEventListener('click', () => {
      this.moon_dark.classList.add('hide');
      this.moon_light.classList.remove('hide');
      this.html.setAttribute('data-theme', 'light');
    });
  }
}