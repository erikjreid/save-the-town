// Copyright 2017-2018, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import AlignGroup from '../../scenery/js/nodes/AlignGroup.js';
import SaveTheTownScreen from './SaveTheTownScreen.js';

const saveTheTownTitleString = 'Defeat the Zombies';

const simOptions = {
  credits: {
    leadDesign: 'Erik Reid',
    softwareDevelopment: 'Erik & Sam Reid',
    team: 'Erik & Sam Reid',
    qualityAssurance: 'Erik Reid, Ingrid Reid, Sam Reid',
    graphicArts: 'Erik Reid'
  },
  showSmallHomeScreenIconFrame: true,
  supportsSound: true
};

SimLauncher.launch( () => {

  // Panels on the right side of the lattice (in the first three screens) have matching widths, within each screen and
  // across screens.
  const alignGroup = new AlignGroup( {

    // Elements should have the same widths but not constrained to have the same heights
    matchVertical: false
  } );
  const sim = new Sim( saveTheTownTitleString, [
    new SaveTheTownScreen( alignGroup )
  ], simOptions );
  sim.start();
} );