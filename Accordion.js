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
    };

    this.options = Object.assign(this.options, options);


    if(autorun) {
      this.run();
    }
  }

  run() {

    this.$Accordions = $(`.${this.options.class}`);

    // Check if there are any navbar burgers
    if (this.$Accordions.length === 0) {
      return false;
    }

    // Add a click event on each of them
    this.$Accordions.click((event) => {
      let $accordion = $(event.currentTarget);
      let id = $accordion
        .find(`.${this.options.classHeading}`)
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
    this.$Accordions.find(`.${this.options.classBody}`).slideUp();
    this.$Accordions.removeClass(this.options.classOpened);
    $accordion.find(`.${this.options.classBody}`).slideDown();
    $accordion.toggleClass(this.options.classOpened);
    history.pushState({}, '', hash);
    // window.location.hash = hash
  }

}

export default Accordion;
