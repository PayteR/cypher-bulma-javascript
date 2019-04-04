/**
 Mobile functionality for navbar
 */

class NavbarMobileMenu {

  constructor(options, autorun = true ) {
    this.options = {
      class: 'navbar-burger',
      classActive: 'is-active'
    };

    this.options = Object.assign(this.options, options);

    if(autorun) {
      this.run();
    }
  }

  run() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(`.${this.options.class}`), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {

          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle(this.options.classActive);
          $target.classList.toggle(this.options.classActive);

        });
      });
    }
  }
}

export default NavbarMobileMenu;
