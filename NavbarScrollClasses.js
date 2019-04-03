/**
 Mobile functionality for navbar
 */

class NavbarScrollClasses {

  constructor(options, autorun = true) {
    this.options = {
      scrollStartOffset: 0,
      scrollDebounceDelay: false,
      classIsScroll: 'is-scroll',
      classIsScrollUp: 'is-scroll-up',
      classIsScrollDown: 'is-scroll-down'
    };

    this.options = {...this.options, ...options};

    if (autorun) {
      this.run();
    }
  }

  run() {
    // Get the header
    var body = document.getElementsByTagName('body')[0];

    // Get the offset position of the navbar
    var scrollStartOffset = this.options.scrollStartOffset;

    let positionNow = window.pageYOffset;
    let positionBefore = window.pageYOffset;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    let headerSticky = () => {
      positionNow = window.pageYOffset;

      if (window.pageYOffset > scrollStartOffset) {
        body.classList.add(this.options.classIsScroll);
        if(positionNow > positionBefore) {
          body.classList.add(this.options.classIsScrollDown);
          body.classList.remove(this.options.classIsScrollUp);
        } else {
          body.classList.remove(this.options.classIsScrollDown);
          body.classList.add(this.options.classIsScrollUp);
        }
      } else {
        body.classList.remove(this.options.classIsScroll);
        body.classList.remove(this.options.classIsScrollUp);
        body.classList.remove(this.options.classIsScrollDown);
      }

      positionBefore = window.pageYOffset;
    };

    if(this.options.scrollDebounceDelay) {
      let debounce = require("debounce");
      window.addEventListener('scroll', debounce(headerSticky, this.options.scrollDebounceDelay));
    } else {
      window.addEventListener('scroll', headerSticky);
    }

  }
}

export default NavbarScrollClasses;
