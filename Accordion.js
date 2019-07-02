import $ from 'jquery';

/**
 Mobile functionality for navbar
 */
class Accordion {

  constructor(options, autorun = true ) {
    this.options = {
      class: 'accordion',
      classHeading: 'accordion-heading',
      classBody: 'accordion-body',
      classOpened: 'is-opened',
      scrollToEnabled: true,
    };

    this.options = Object.assign(this.options, options);


    if(autorun) {
      this.run();
    }
  }

  run() {

    this.$Accordions = $(`.${this.options.class}`);
    this.$AccordionHeadings = $(`.${this.options.classHeading}`);

    // Check if there are any navbar burgers
    if (this.$Accordions.length === 0) {
      return false;
    }

    // Add a click event on each of them
    this.$AccordionHeadings.click((event) => {
      let $accordion = $(event.currentTarget);
      let id = $accordion
        .attr("href");
      this.openAccordion(id);
      event.preventDefault();
      return false;
    })

    this.openAccordion(window.location.hash)

    return true;
  }

  openAccordion(hash) {
    if(!hash){
      return false;
    }

    let $accordion = $(hash)
    let scrollToEnabled = this.options.scrollToEnabled;
    this.$Accordions.find(`.${this.options.classBody}`).slideUp();
    this.$Accordions.removeClass(this.options.classOpened);
    $accordion.find(`.${this.options.classBody}`).slideDown(500, function () {
      if(!scrollToEnabled) {
        return false;
      }

      $([document.documentElement, document.body]).animate({
        scrollTop: $accordion.offset().top - 100
      }, 500);
    });
    $accordion.toggleClass(this.options.classOpened);
    history.pushState({}, '', hash);
    // window.location.hash = hash
  }

}

export default Accordion;
