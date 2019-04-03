/**
 * This class will add a extended controls for Woocommerce cart 
 * quantity input
 */
import $ from 'jquery';

class ProductQuantityInput {
  constructor() {
    ProductQuantityInput.appendButtons();
    ProductQuantityInput.setEvents();
    ProductQuantityInput.parseValues();
    $( document.body ).on( 'updated_cart_totals', function() {
      ProductQuantityInput.appendButtons();
      ProductQuantityInput.parseValues();
    });
  }

  static appendButtons() {
    $( '.quantity:not(.field.has-addons)' ).each(function (i, el) {
      let $container = $(el);
      let $input = $container.find('.qty');

      $input.wrap('<span class="control"></span>').attr('type', 'text');

      $container.addClass( 'field has-addons' )
        .append( '<span class="control"><button type="button" class="plus button is-primary">+</button></span>' )
        .prepend( '<span class="control"><button type="button" class="minus button is-primary">-</button></span>' );
    })

  }

  static parseValues() {
    $( 'input.qty:not(.product-quantity input.qty)' ).each( function() {
      var min = parseFloat( $( this ).attr( 'min' ) );

      if ( min && min > 0 && parseFloat( $( this ).val() ) < min ) {
        $( this ).val( min );
      }
    });
  }

  static setEvents() {
    $( document ).on( 'click', '.plus, .minus', function() {

      // Get values
      var $qty		= $( this ).closest( '.quantity' ).find( '.qty' ),
        currentVal	= parseFloat( $qty.val() ),
        max			= parseFloat( $qty.attr( 'max' ) ),
        min			= parseFloat( $qty.attr( 'min' ) ),
        step		= $qty.attr( 'step' );

      // Format values
      if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
      if ( max === '' || max === 'NaN' ) max = '';
      if ( min === '' || min === 'NaN' ) min = 0;
      if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

      // Change the value
      if ( $( this ).is( '.plus' ) ) {
        if ( max && ( max == currentVal || currentVal > max ) ) {
          $qty.val( max );
        } else {
          $qty.val( currentVal + parseFloat( step ) );
        }
      } else {
        if ( min && ( min == currentVal || currentVal < min ) ) {
          $qty.val( min );
        } else if ( currentVal > 0 ) {
          $qty.val( currentVal - parseFloat( step ) );
        }
      }

      // Trigger change event
      $qty.trigger( 'change' );
    });
  }
}

export default ProductQuantityInput;
