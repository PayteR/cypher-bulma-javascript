let Cookies = require('js-cookie');

/**
 Mobile functionality for navbar
 */
class PrivacyPolicyPanel {

  constructor(options, autorun = true ) {
    this.options = {
      class: 'privacy_policy',
      classButton: 'privacy_policy-button',
      classOpened: 'is-opened',
      cookieKey: 'cypher-cookies-accepted'
    };

    console.log(Cookies);
    this.options = {...this.options, ...options};

    if(autorun) {
      this.run();
    }
  }

  run() {
    if(this.getCookie()) {
      return false;
    }

    // Get all "navbar-burger" elements
    const $privacyPolicyPanels = Array.prototype.slice.call(document.querySelectorAll(`.${this.options.class}`), 0);

    // Check if there are any navbar burgers
    if ($privacyPolicyPanels.length === 0) {
      return false;
    }

    // Add a click event on each of them
    $privacyPolicyPanels.forEach($container => {
      $container.classList.add(this.options.classOpened);
      console.log(323)
      $container.querySelectorAll(`.${this.options.classButton}`).forEach($button => {
        $button.addEventListener('click', () => {
          this.setCookie();
          $container.classList.remove(`${this.options.classOpened}`);
          return false;
        });
      });
    });

    return true;
  }

  getCookie() {
    return Cookies.get(this.options.cookieKey);
  }

  setCookie() {
    return Cookies.set(this.options.cookieKey, true);
  }

}

export default PrivacyPolicyPanel;
