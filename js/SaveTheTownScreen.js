// Copyright 2017-2018, University of Colorado Boulder

/**
 * "Waves" screen in the Wave Interference simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../axon/js/Property.js';
import Screen from '../../joist/js/Screen.js';
import saveTheTown from './saveTheTown.js';
import SaveTheTownScreenView from './SaveTheTownScreenView.js';

class SaveTheTownScreen extends Screen {

  /**
   * @param {AlignGroup} alignGroup - for aligning the control panels on the right side of the lattice
   */
  constructor( alignGroup ) {
    const options = {
      backgroundColorProperty: new Property( 'white' ),
      name: 'screenWavesString'
    };
    super(
      function(){
        return {step:function(){}};
      },
      model => new SaveTheTownScreenView( model, {
      } ),
      options
    );
  }
}

saveTheTown.register( 'SaveTheTownScreen', SaveTheTownScreen );
export default SaveTheTownScreen;