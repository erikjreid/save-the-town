// Copyright 2018, University of Colorado Boulder

/* eslint-disable */

/**
 * View for the "Waves" screen

 run these in git bash
 cd /C/Users/erik/github/
 node node_modules/http-server/bin/http-server

 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Erik Reid
 */

import Vector2 from '../../dot/js/Vector2.js';
import ScreenView from '../../joist/js/ScreenView.js';
import Shape from '../../kite/js/Shape.js';
import ButtonListener from '../../scenery/js/input/ButtonListener.js';
import PressListener from '../../scenery/js/listeners/PressListener.js';
import Circle from '../../scenery/js/nodes/Circle.js';
import Rectangle from '../../scenery/js/nodes/Rectangle.js';
import Node from '../../scenery/js/nodes/Node.js';
import RectangularPushButton from '../../sun/js/buttons/RectangularPushButton.js';
import Image from '../../scenery/js/nodes/Image.js';
import Path from '../../scenery/js/nodes/Path.js';
import Plane from '../../scenery/js/nodes/Plane.js';
import Text from '../../scenery/js/nodes/Text.js';
import SoundClip from '../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../tambo/js/soundManager.js';
import armySoldierImage from '../images/armedSoldier_png.js';
import missileImage from '../images/missile_png.js';
import tankImage from '../images/tank_png.js';
import wallImage from '../images/wall_png.js';
import zombieImage from '../images/zombie_png.js';
import saveTheTown from './saveTheTown.js';
import toxictankImage from '../images/toxictank_jpg.js';
import toxicTankBattleImage from '../images/toxicTankBattleImage_png.js';
import grenadebotImage from '../images/grenadebot_jpg.js';
import HBox from '../../scenery/js/nodes/HBox.js';
import grenadetankbattleImage from '../images/grenadetankbattleimage_jpg.js';
import grenadebotbombImage from '../images/grenadebotbomb_jpg.js';
import toxicTankMissileImage from '../images/toxic-tank-missile_png.js';
import explosionImage from '../images/explosion_jpg.js';
import toxicTankExplosionImage from '../images/toxic-tank-explosion_png.js';

import dingSound from '../sounds/ding_mp3.js';
import missileExplodeSound from '../sounds/missile-explode_mp3.js';
import missileLaunchSound from '../sounds/missile-launch_mp3.js';
import noSound from '../sounds/no_mp3.js';
import tankExplodeSound from '../sounds/tank-explode_mp3.js';
import wallCollapseSound from '../sounds/wall-collapse_mp3.js';
import zombieDeathSound from '../sounds/zombiedeath_mp3.js';
import zombieHitsWallSound from '../sounds/zombie-hits-wall_mp3.js';

import bulletSound from '../sounds/bullet_mp3.js';

var ZOMBIE_SPEED = 2;

class SaveTheTownScreenView extends ScreenView {

  /**
   * @param {WavesScreenModel} model
   * @param {AlignGroup} alignGroup - for aligning the control panels on the right side of the lattice
   * @param {Object} [options]
   */
  constructor( model, alignGroup, options ) {
    super();

    var waveText = new Text( 'Wave  ', {
      fontSize: 20
    } );
    this.addChild( waveText );
    waveText.centerX = this.layoutBounds.centerX - 200;
    waveText.top = this.layoutBounds.top;

    var hiscoreText = new Text( 'hiscore  ', {
      fontSize: 20
    } );
    this.addChild( hiscoreText );
    hiscoreText.centerX = this.layoutBounds.centerX - 200;
    hiscoreText.top = waveText.bottom;

    let paused = false;
    let upgradepaused = false;
    const zombieLayer = new Node();
    this.addChild( zombieLayer );

    const menuButton = new RectangularPushButton( {
      content: new Text( 'Menu', {} ),
      scale: 3,
      bottom: this.layoutBounds.bottom,
      listener: () => {
        paused = true;
        const rect = new Rectangle( 0, 0, this.layoutBounds.width, this.layoutBounds.height, {
          fill: 'blue',
          center: this.layoutBounds.center
        } );
        this.addChild( rect );

        const returnToGameButton = new RectangularPushButton( {
          centerX: rect.centerX,
          content: new Text( 'Return to Game' ),
          scale: 2,
          listener: () => {
            this.removeChild( rect );
            paused = false;
          }
        } );
        rect.addChild( returnToGameButton );

      }
    } );
    this.addChild( menuButton );


    var dingSoundClip = new SoundClip( dingSound, { initialOutputLevel: 0.7 } );
    soundManager.addSoundGenerator( dingSoundClip );

    var missileExplodeClip = new SoundClip( missileExplodeSound, { initialOutputLevel: 0.7 } );
    soundManager.addSoundGenerator( missileExplodeClip );

    var missileLaunchClip = new SoundClip( missileLaunchSound, { initialOutputLevel: 0.7 } );
    soundManager.addSoundGenerator( missileLaunchClip );

    var noClip = new SoundClip( noSound, { initialOutputLevel: 0.7 } );
    soundManager.addSoundGenerator( noClip );

    var tankExplodeClip = new SoundClip( tankExplodeSound, { initialOutputLevel: 0.7 } );
    soundManager.addSoundGenerator( tankExplodeClip );

    var wallCollapseClip = new SoundClip( wallCollapseSound, { initialOutputLevel: 0.7 } );
    soundManager.addSoundGenerator( wallCollapseClip );

    var zombieHitsWallClip = new SoundClip( zombieHitsWallSound, { initialOutputLevel: 0.7 } );
    soundManager.addSoundGenerator( zombieHitsWallClip );

    var zombieDeathClip = new SoundClip( zombieDeathSound, { initialOutputLevel: 0.7 } );
    soundManager.addSoundGenerator( zombieDeathClip );


    var bulletSoundClip = new SoundClip( bulletSound, { initialOutputLevel: 0.4 } );
    soundManager.addSoundGenerator( bulletSoundClip );

    var missileList = [];
    var bulletList = [];
    var explosionList = [];

    var background = new Plane( {
      fill: 'white'
    } );
    this.addChild( background );
    let mousePressEvent = null;
    background.addInputListener( new PressListener( {
      press: event => {
        mousePressEvent = event;
      },
      release: event => {
        mousePressEvent = null;
      }
    } ) );
    let tankType = 'normal';
    const grenadePowerUpButton = new Image( grenadebotImage, { maxHeight: 650 } )
    grenadePowerUpButton.addInputListener( new PressListener( {
      press: event => {
        tankType = 'grenade';
        this.removeChild( tankPowerUpScreen );
        upgradepaused = false;

        tankList.forEach( tank => {
          tank.setImage( grenadetankbattleImage );
          tank.scale( -1, 1 )
          tank.translate( -750, 0 )
        } );
      }
    } ) );
    const toxicPowerUpButton = new Image( toxictankImage, { maxHeight: 650 } );
    toxicPowerUpButton.addInputListener( new PressListener( {
      press: event => {
        tankType = 'toxic';
        this.removeChild( tankPowerUpScreen );
        upgradepaused = false;

        tankList.forEach( tank => {
          tank.setImage( toxicTankBattleImage );
          tank.scale( -1, 1 )
          tank.translate( -750, 0 )
        } );
      }
    } ) );
    const tankPowerUpScreen = new HBox( {
      children: [ grenadePowerUpButton, toxicPowerUpButton ]
    } );

    var zombieList = [];

    var wave = 0;

    var highScore = 0;

    let loadedHighScore = localStorage.getItem( 'highestWave' );
    if ( loadedHighScore ) {
      loadedHighScore = Number.parseInt( loadedHighScore );
    }

    const createSoldier = ( x, y ) => {
      var soldier = new Image( armySoldierImage, {
        scale: 0.7,
        x: x,
        y: y
      } );

      soldier.ammo = 50;

      var addSoldier = soldier => {
        const rectangle = new Path( Shape.bounds( soldier.localBounds ), {
          stroke: 'black',
          lineWidth: 6,
          visible: false
        } );
        soldier.addChild( rectangle );
        soldier.addInputListener( new ButtonListener( {
          fire: function() {
            // THIS IS THE CODE THAT HAPPENS WHEN THE TANK IS PRESSED
            // dingSoundClip.play();
          }
        } ) );
        soldier.life = 25;
        this.addChild( soldier );
        soldierList.push( soldier );

        // life bar
        const experienceBarBorder = new Rectangle( 0, 0, 100, 20, {
          centerX: soldier.width / 0.3 / 2 - 50,
          centerY: 150,
          stroke: 'black', fill: 'gray'
        } );
        soldier.addChild( experienceBarBorder );

        // life bar
        const experienceBar = new Rectangle( 0, 0, 0, 20, {
          left: experienceBarBorder.left,
          centerY: 150,
          stroke: 'black', fill: 'rgb(100,229,229)'
        } );
        soldier.addChild( experienceBar );
        soldier.experienceBar = experienceBar;
      };
      addSoldier( soldier );
    };

    const createTank = ( x, y ) => {
      var tank = new Image( tankImage, {
        scale: new Vector2( -0.25, 0.25 ),
        centerX: x,
        centerY: y
      } );

      const rectangle = new Path( Shape.bounds( tank.localBounds ), {
        stroke: 'green',
        lineWidth: 20,
        visible: false
      } );
      tank.addChild( rectangle );
      tank.addInputListener( new ButtonListener( {
        fire: function() {

          // THIS IS THE CODE THAT HAPPENS WHEN THE TANK IS PRESSED
          // dingSoundClip.play();
        }
      } ) );
      tank.lifePoints = 30;
      this.addChild( tank );
      tankList.push( tank );

      console.log( 'added tank at ' + tank.center + ', to this=' + this );
    };

    const startNextWave = () => {
      wave++;

      if ( wave === 2 ) {
        // TODO: add 5 tanks and 10 soldiers

        createTank( wall.right + wall.width, wall.centerY - 100 );
        createTank( wall.right + wall.width, wall.centerY + 100 );
        createTank( wall.right + wall.width, wall.centerY + 200 );

        createSoldier( soldierX, tankList[ 0 ].y - 95 * 2 );
        createSoldier( soldierX, tankList[ 0 ].y + 95 * 2 );
      }
      if ( wave === 3 ) {

      }

      if ( wave === 4 ) {
        upgradepaused = true;
        this.addChild( tankPowerUpScreen )
      }

      if ( loadedHighScore && wave > loadedHighScore ) {
        localStorage.setItem( 'highestWave', '' + wave )
      }
      if ( !loadedHighScore ) {
        localStorage.setItem( 'highestWave', '' + wave )
      }

      waveText.text = 'wave' + wave;

      const max = Math.max( loadedHighScore, wave );

      hiscoreText.text = 'High Score: ' + max;

      var r = Math.random();
      var giants = [ -1,
        r < 0.5 ? 0 : 1,
        r < 0.25 ? 1 : r < 0.75 ? 2 : 3,
        r < 0.25 ? 3 : r < 0.75 ? 4 : 5,
        10
      ];
      for ( var k = 0; k < 20; k++ ) {
        for ( var i = 0; i < 6; i++ ) {
          var zombie = new Image( zombieImage, {
            scale: 0.3,
            y: i * 100 + Math.random() * 50,
            x: ( k - 19 ) * 100,
            pickable: false
          } );
          zombie.row = k;
          zombie.life = 20;
          zombie.maxLife = zombie.life;
          zombie.attack = 20;
          zombie.scaleFactor = 1;

          // life bar
          zombie.addChild( new Rectangle( 0, 0, 100, 20, {
            centerX: zombie.width / 0.3 / 2 - 50,
            centerY: 150,
            stroke: 'black', fill: 'black'
          } ) );

          // life bar
          const lifebar = new Rectangle( 0, 0, 100, 20, {
            centerX: zombie.width / 0.3 / 2 - 50,
            centerY: 150,
            stroke: 'black', fill: 'rgb(100,255,100)'
          } );
          zombie.addChild( lifebar );
          zombie.lifebar = lifebar;

          zombieLayer.addChild( zombie );
          zombieList.push( zombie );
        }
      }

      var numberGiants = giants[ wave ];
      if ( wave >= 4 ) {
        numberGiants = 10 + wave * 2;
      }
      console.log( numberGiants );

      for ( let i = 0; i < numberGiants; i++ ) {
        var index = Math.round( Math.random() * zombieList.length );
        var giant = zombieList[ index ];
        var c = giant.center;
        giant.scale( 2 );
        giant.scaleFactor *= 2;
        giant.center = c;
        giant.attack *= 10;
        giant.life *= 100;


        if ( wave >= 5 ) {
          giant.scale( 2 );
          giant.scaleFactor *= 2;
          giant.center = c;
          giant.attack *= 2;
          giant.life *= 5;
        }

        if ( wave >= 10 ) {
          giant.scale( 2 );
          giant.scaleFactor *= 2;
          giant.center = c;
          giant.attack *= 3;
          giant.life *= 5;
        }
        giant.maxLife = giant.life;
      }
    };

    // start the first wave
    startNextWave();

    var wall = new Image( wallImage, {
      scale: 2,
      x: 500,
      y: -100,
      pickable: false
    } );
    this.addChild( wall );

    var tankList = [];
    wall.moveToBack();


    // create the initial tank
    createTank( wall.right + wall.width, wall.centerY );
    // createTank( wall.right + wall.width, wall.centerY+100 );

    var soldierList = [];
    const soldierX = tankList[ 0 ].x + 30;
    createSoldier( soldierX, tankList[ 0 ].y - 95 );
    createSoldier( soldierX, tankList[ 0 ].y );
    createSoldier( soldierX, tankList[ 0 ].y + 95 );

    var overlapsNextRow = function( zombie ) {
      for ( let i = 0; i < zombieList.length; i++ ) {
        const z = zombieList[ i ];
        if ( z.row === zombie.row + 1 ) {
          if ( zombie.right > z.left ) {
            return true;
          }
        }
      }
      return false;
    };

    var timeWallHasBeenEaten = 0;

    var isGameOver = false;

    this.stepTown = dt => {


      if ( isGameOver || paused || upgradepaused ) {
        return;
      }


      if ( mousePressEvent ) {
        // Fire missiles from the tanks
        for ( let i = 0; i < tankList.length; i++ ) {
          const selectedTank = tankList[ i ];

          // Simulate a cooldown.  No bullet chains
          if ( Math.random() < 0.1 ) {
            var missile = new Image(
              tankType === 'grenade' ? grenadebotbombImage :
              tankType === 'toxic' ? toxicTankMissileImage :
              missileImage, {
                center: selectedTank.center,
                scale: tankType === 'normal' ? 1 : 0.27
              } );
            this.addChild( missile );
            const target = this.globalToLocalPoint( mousePressEvent.pointer.point );

            const vector = target.minus( missile.center ).normalized().times( 30 )
            missile.velocityVector = vector;
            missile.strength = 75;// goes through about 3-4 zombies
            missile.rotation = vector.getAngle() + ( tankType === 'normal' ? Math.PI / 2 : Math.PI );
            missileList.push( missile );
            missileLaunchClip.play();
          }
        }

        // Fire bullets from the soldiers
        for ( let i = 0; i < soldierList.length; i++ ) {
          const selectedSoldier = soldierList[ i ];
          if ( Math.random() < 0.1 && selectedSoldier.ammo >= 2 ) {

            // Each soldier has 2 guns, so 2 bullets come out at the same time
            for ( var k = 0; k < 2; k++ ) {

              var bullet = new Circle( 7.5, {
                fill: 'black',
                center: selectedSoldier.center.plusXY( Math.random() * 200 - 100, Math.random() * 20 )
              } );
              this.addChild( bullet );
              const target = this.globalToLocalPoint( mousePressEvent.pointer.point );
              const vector = target.minus( bullet.center ).normalized().times( 20 )
              bullet.velocityVector = vector;
              bullet.strength = 25; // should be absorbed when hitting one small zombie
              bulletList.push( bullet );

              bulletSoundClip.play();

              selectedSoldier.ammo = selectedSoldier.ammo - 2;

              if ( selectedSoldier.ammo <= 0 ) {
                selectedSoldier.reloadTime = 5; // reload in 5 seconds
              }
            }
          }
        }
      }

      for ( let i = 0; i < zombieList.length; i++ ) {
        const zombie = zombieList[ i ];
        if ( zombie.life <= 0 ) {
          zombieLayer.removeChild( zombie );
          zombieList.splice( i, 1 );
          zombieDeathClip.play();

          // the next wave starts even while there are zombies from the previous wave
          if ( zombieList.length <= 5 ) {
            startNextWave();
          }
          break;
        }

        for ( let j = 0; j < tankList.length; j++ ) {
          const tank = tankList[ j ];
          if ( tank.bounds.intersectsBounds( zombie.bounds ) ) {
            tank.lifePoints = tank.lifePoints - dt * 2 * zombie.attack / 20;
          }
          if ( tank.lifePoints < 0 ) {
            tank.visible = false;
            tankList.splice( j, 1 );
            j--;
            tankExplodeClip.play();
          }
        }

        for ( let j = 0; j < soldierList.length; j++ ) {
          const soldier = soldierList[ j ];
          if ( soldier.bounds.intersectsBounds( zombie.bounds ) ) {
            soldier.life = soldier.life - 3 * dt * ( zombie.attack + 1 ) / 20;

            if ( soldier.life <= 0 ) {
              this.removeChild( soldier );
              soldierList.splice( j, 1 );
              j--;
              noClip.play();

              var newZombie = new Image( zombieImage, {
                center: soldier.center,
                scale: 0.3
              } );
              newZombie.scaleFactor = 1;
              newZombie.life = 20;
              newZombie.attack = 20;
              this.addChild( newZombie );
              zombieList.push( newZombie );
            }

          }
        }
        // console.log(soldierList.map(s => s.life));

        if ( wall.visible ) {
          if ( zombie.right < wall.left + 30 ) {
            zombie.translate( ZOMBIE_SPEED * 2 * Math.random() / zombie.scaleFactor, 0 );
          }
          if ( zombie.right >= wall.left + 30 ) {
            timeWallHasBeenEaten += dt * zombie.attack / 20;

            if ( !zombieHitsWallClip.isPlaying ) {
              zombieHitsWallClip.play();
            }
          }
        }
        else {
          zombie.translate( ZOMBIE_SPEED * 2 * Math.random() / zombie.scaleFactor, 0 );


          if ( zombie.left >= this.layoutBounds.right ) {
            const gameOverText = new Text( 'GAME OVER', {
              fontSize: 602,
              maxWidth: this.layoutBounds.width,
              center: this.layoutBounds.center
            } );
            this.addChild( gameOverText );
            isGameOver = true;
          }
        }
      }

      for ( let j = 0; j < soldierList.length; j++ ) {
        const soldier = soldierList[ j ];
        if ( soldier.ammo <= 0 && soldier.reloadTime > 0 ) {
          soldier.reloadTime = soldier.reloadTime - dt;

          if ( soldier.reloadTime <= 0 ) {
            soldier.ammo = 50
          }
        }
        soldier.experienceBar.setRectWidth( soldier.experienceBar.width + 0.001 );
        if ( soldier.experienceBar.width >= 100 ) {
          soldier.experienceBar.setRectWidth( 0 )
        }
      }

      if ( timeWallHasBeenEaten > 40 ) {
        if ( wall.visible ) {
          wallCollapseClip.play();
        }
        wall.visible = false;
      }


      ///MISSILES
      for ( let y = 0; y < missileList.length; y++ ) {
        var missile = missileList[ y ];
        // let vector = missile.target.minus( missile.center ).normalized().times( 10 );

        for ( let i = 0; i < zombieList.length; i++ ) {
          const zombie = zombieList[ i ];
          if ( zombie.bounds.intersectsBounds( missile.bounds ) ) {
            zombie.life = zombie.life - 0.7;
            if ( zombie.life < 0 ) {
              zombie.life = 0;
            }
            zombie.lifebar.setRectWidth( 100 * zombie.life / zombie.maxLife );

            if ( tankType === 'toxic' || tankType === 'grenade' ) {
              missile.strength = 0;
            }
          }
        }

        missile.center = missile.center.plus( missile.velocityVector );

        // Missile explodes
        if ( missile.strength <= 0 ) {
          this.removeChild( missile );
          missileList.splice( y, 1 );

          missileExplodeClip.play();
          y--;

          if ( tankType === 'grenade' || tankType === 'toxic' ) {
            const explosion = new Image( tankType === 'grenade' ? explosionImage :
                                         tankType === 'toxic' ? toxicTankExplosionImage :
                                         explosionImage, {
              center: missile.center,
              scale: 0.25
            } )
            if ( tankType === 'grenade' ) {
              explosion.remainingTime = 0.1;
            }
            else if ( tankType === 'toxic' ) {
              explosion.remainingTime = 5;
            }
            else {
              explosion.remainingTime = 1;
            }

            explosionList.push( explosion );
            this.addChild( explosion );
          }


        }
      }

      // EXPLOSIONS

      const explosionsToRemove = [];

      explosionList.forEach( explosion => {

        for ( let i = 0; i < zombieList.length; i++ ) {
          const zombie = zombieList[ i ];
          if ( zombie.bounds.intersectsBounds( explosion.bounds ) ) {

            let damage = 0;
            if ( tankType === 'grenade' ) {
              damage = 4;
            }
            else if ( tankType === 'toxic' ) {
              damage = 0.3;
            }
            else {
              damage = 0.8;
            }

            zombie.life = zombie.life - damage; // 0.5 seconds alive in explosion. 0.8 damage per second * 1 second = 20 damage
            if ( zombie.life < 0 ) {
              zombie.life = 0;
            }
            zombie.lifebar.setRectWidth( 100 * zombie.life / zombie.maxLife );
          }
        }

        explosion.remainingTime = explosion.remainingTime - dt;
        if ( explosion.remainingTime <= 0 ) {
          explosionsToRemove.push( explosion );
        }
      } );

      explosionsToRemove.forEach( explosion => {
        this.removeChild( explosion );
        explosionList.splice( explosionList.indexOf( explosion ), 1 );
      } );

      ///BULLETS
      for ( let y = 0; y < bulletList.length; y++ ) {
        var bullet = bulletList[ y ];
        //let vector = bullet.target.minus( bullet.center ).normalized().times( 20 );
        const vector = bullet.velocityVector;


        for ( let i = 0; i < zombieList.length; i++ ) {
          const zombie = zombieList[ i ];
          if ( zombie.bounds.intersectsBounds( bullet.bounds ) ) {
            zombie.life = zombie.life - bullet.strength;
            bullet.strength = bullet.strength - 25;

            console.log( bullet.strength );
          }
        }

        bullet.center = bullet.center.plus( vector );

        if ( bullet.strength <= 0 ) {
          this.removeChild( bullet );
          bulletList.splice( y, 1 );
          y--;
        }
      }

      // All the zombies must pass the 800 mark before we can go to the next wave
      // var allRight = true;
      // var minX = Number.MAX_VALUE;
      // zombieList.forEach( function( zombie ) {
      //   if ( zombie.center.x < minX ) {
      //     minX = zombie.center.x;
      //   }
      //   if ( zombie.center.x < 800 ) {
      //     allRight = false;
      //   }
      // } );
      // if ( allRight ) {
      //   startNextWave();
      // }
    };


    background.moveToBack();
  }

  /**
   * Notify listeners of the step phase.
   * @param {number} dt - in seconds
   * @public
   */
  step( dt ) {
    // this.steppedEmitter.emit();
    this.stepTown( dt );
  }
}

saveTheTown.register( 'SaveTheTownScreenView', SaveTheTownScreenView );
export default SaveTheTownScreenView;