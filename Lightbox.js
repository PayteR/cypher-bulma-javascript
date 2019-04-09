import $ from 'jquery';

/**
 Lightbox Gallery based on bulma
 */
class Lightbox {

  constructor(options, autorun = true ) {
    this.options = {
      selectors: 'a[rel][href$=".jpg"], a[rel][href$=".png"], a[rel][href$=".jpeg"], a[rel][href$=".gif"]' +
        ', .woocommerce-product-gallery__image a',
      id: 'cypher-lightbox',
      prev: 'cypher-lightbox-prev',
      next: 'cypher-lightbox-next',
      img: 'cypher-lightbox-img',
      close: 'cypher-lightbox-close',
      background: 'cypher-lightbox-background',
    };

    this.options = Object.assign(this.options, options);

    if(autorun) {
      this.run();
    }
  }

  run() {

    // Get all "navbar-burger" elements
    const $imagesLinks = $(this.options.selectors);

    // Check if there are any navbar burgers
    if ($imagesLinks.length === 0) {
      return false;
    }

    this.$imageLinks = $imagesLinks;
    this.generateModal();
    this.$close.click(() => this.modalClose());
    this.$background.click(() => this.modalClose());

    this.$imageLinks.click(event => {
      let $a = $(event.currentTarget);
      let href = $a.attr('href');

      this.initValues($a);
      this.setModalImage(href);
      this.modalOpen();
      return false;
    });

    this.$next.click(event => {
      this.modalNext();
      return false;
    });

    this.$prev.click(event => {
      this.modalPrev();
      return false;
    });

    return true;
  }

  initValues($a) {
    this.imagesCount = this.$imageLinks.length
    this.currentImage = 0;
    this.$imageLinks.each((i, $item) => {
      if($item !== $a.get(0)) return;
      this.currentImage = i
    })
  }

  modalOpen() {
    this.$modal.addClass('is-active');
  }

  modalClose() {
    this.$modal.removeClass('is-active');
  }

  modalNext() {
    this.currentImage++;
    if(this.currentImage > this.imagesCount - 1) {
      this.currentImage = 0;
    }
    this.updateModalImage();
  }

  modalPrev() {
    this.currentImage--;
    if(this.currentImage < 0) {
      this.currentImage = this.imagesCount - 1;
    }
    this.updateModalImage();
  }

  updateModalImage(){
    let src = this.$imageLinks[this.currentImage];
    this.setModalImage(src);
  }

  setModalImage(src) {
    this.$img.attr('src', src);
  }

  generateModal() {
    this.$modal = $(
      '<div class="modal is-lightbox" id="' + this.options.id + '">\n' +
      '  <div class="modal-background" id="' + this.options.background + '"></div>\n' +
      '  <div class="modal-content">\n' +
      '    <div class="modal-slide">\n' +
      '      <img id="' + this.options.img + '" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=">\n' +
      '    </div>\n' +
      '  </div>\n' +
      '  <a class="modal-prev" id="' + this.options.prev + '"></a>\n' +
      '  <a class="modal-next" id="' + this.options.next + '"></a>\n' +
      '  <button id="' + this.options.close + '" class="modal-close is-large" aria-label="close"></button>\n' +
      '</div>')

    $('body').append(this.$modal);
    this.$img = $('#' + this.options.img);
    this.$prev = $('#' + this.options.prev);
    this.$next = $('#' + this.options.next);
    this.$close = $('#' + this.options.close);
    this.$background = $('#' + this.options.background);
  }



}

export default Lightbox;
