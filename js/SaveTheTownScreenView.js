// Copyright 2018, University of Colorado Boulder

/* eslint-disable */

/**
 * View for the "Waves" screen
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  const ButtonListener = require( 'SCENERY/input/ButtonListener' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const Image = require( 'SCENERY/nodes/Image' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Plane = require( 'SCENERY/nodes/Plane' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Shape = require( 'KITE/Shape' );
  const SoundClip = require( 'TAMBO/sound-generators/SoundClip' );
  const soundManager = require( 'TAMBO/soundManager' );
  const Vector2 = require( 'DOT/Vector2' );
  const saveTheTown = require( 'SAVE_THE_TOWN/saveTheTown' );

  const armySoldierImage = require( 'image!SAVE_THE_TOWN/armedSoldier.png' );
  const missileImage = require( 'image!SAVE_THE_TOWN/missile.png' );
  const tankImage = require( 'image!SAVE_THE_TOWN/tank.png' );
  const wallImage = require( 'image!SAVE_THE_TOWN/wall.png' );
  const zombieImage = require( 'image!SAVE_THE_TOWN/zombie.png' );

  var dingSound = require( 'sound!SAVE_THE_TOWN/ding.mp3' );
  var missileExplodeSound = require( 'sound!SAVE_THE_TOWN/missile-explode.mp3' );
  var missileLaunchSound = require( 'sound!SAVE_THE_TOWN/missile-launch.mp3' );
  var noSound = require( 'sound!SAVE_THE_TOWN/no.mp3' );
  var tankExplodeSound = require( 'sound!SAVE_THE_TOWN/tank-explode.mp3' );
  var wallCollapseSound = require( 'sound!SAVE_THE_TOWN/wall-collapse.mp3' );
  var zombieHitsWallSound = require( 'sound!SAVE_THE_TOWN/zombie-hits-wall.mp3' );
  var zombieDeathSound = require( 'sound!SAVE_THE_TOWN/zombiedeath.mp3' );

  class SaveTheTownScreenView extends ScreenView {

    /**
     * @param {WavesScreenModel} model
     * @param {AlignGroup} alignGroup - for aligning the control panels on the right side of the lattice
     * @param {Object} [options]
     */
    constructor( model, alignGroup, options ) {
      super();

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

      var missileList = [];
      var bulletList = [];

      var background = new Plane( {
        fill: 'white'
      } );
      this.addChild( background );
      background.addInputListener( new ButtonListener( {
        fire: event => {

          // Fire missiles from the tanks
          for ( let i = 0; i < tankList.length; i++ ) {
            const selectedTank = tankList[ i ];
            if ( selectedTank.selected ) {
              var missile = new Image( missileImage, {
                center: selectedTank.center
              } );
              this.addChild( missile );
              missile.target = this.globalToLocalPoint( event.pointer.point );
              missileList.push( missile );
              missileLaunchClip.play();
            }
          }

          // Fire bullets from the soldiers
          for ( let i = 0; i < soldierList.length; i++ ) {
            const selectedSoldier = soldierList[ i ];
            if ( selectedSoldier.selected ) {

              for ( var k = 0; k < 5; k++ ) {

                var bullet = new Circle( 7.5, {
                    fill: 'black',
                    center: selectedSoldier.center.plusXY( Math.random() * 200 - 100, Math.random() * 20 )
                  } )
                ;
                this.addChild( bullet );
                bullet.target = this.globalToLocalPoint( event.pointer.point );
                bulletList.push( bullet );
              }


            }
          }
        }
      } ) );

      var zombieList = [];

      var createAllZombies = () => {
        for ( var k = 0; k < 20; k++ ) {
          for ( var i = 0; i < 6; i++ ) {
            var zombie = new Image( zombieImage, {
              scale: 0.3,
              y: i * 100 + Math.random() * 50,
              x: ( k - 19 ) * 100
            } );
            zombie.row = k;
            zombie.life = 20;
            this.addChild( zombie );
            zombieList.push( zombie );
          }
        }
      };
      createAllZombies();

      var wall = new Image( wallImage, {
        scale: 2,
        x: 500,
        y: -100

      } );
      this.addChild( wall );

      var tankList = [];
      wall.moveToBack();
      for ( var i = 0; i < 6; i++ ) {
        var tank = new Image( tankImage, {
          scale: new Vector2( -0.25, 0.25 ),
          left: wall.right,
          y: i * 100
        } );

        var addTank = ( tank ) => {
          const rectangle = new Path( Shape.bounds( tank.localBounds ), {
            stroke: 'green',
            lineWidth: 20,
            visible: false
          } );
          tank.addChild( rectangle );
          tank.addInputListener( new ButtonListener( {
            fire: function() {

              // THIS IS THE CODE THAT HAPPENS WHEN THE TANK IS PRESSED

              tank.selected = !tank.selected;
              rectangle.visible = tank.selected;
              console.log( 'dingSound.play' );
              dingSoundClip.play();
            }
          } ) );
          tank.lifePoints = 30;
          this.addChild( tank );
          tank.moveToBack();
          tankList.push( tank );
        };
        addTank( tank );

      }

      var soldierList = [];
      for ( var k = 0; k < 3; k++ ) {
        for ( var i = 0; i < 8; i++ ) {

          var soldier = new Image( armySoldierImage, {
            scale: 0.7,
            left: tank.right + k * 50,
            top: i * 75
          } );
          var addSoldier = soldier => {
            const rectangle = new Path( Shape.bounds( soldier.localBounds ), {
              stroke: 'black',
              lineWidth: 6,
              visible: false
            } );
            soldier.addChild( rectangle );
            soldier.addInputListener( new ButtonListener( {
              fire: function() {
                console.log( 'hello' );

                // THIS IS THE CODE THAT HAPPENS WHEN THE TANK IS PRESSED

                soldier.selected = !soldier.selected;
                rectangle.visible = soldier.selected;
                dingSoundClip.play();
              }
            } ) );
            soldier.life = 25;
            this.addChild( soldier );
            soldierList.push( soldier );
          };
          addSoldier( soldier );
        }
      }

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

      this.stepTown = dt => {
        for ( let i = 0; i < zombieList.length; i++ ) {
          const zombie = zombieList[ i ];
          if ( zombie.life <= 0 ) {
            this.removeChild( zombie );
            zombieList.splice( i, 1 );
            zombieDeathClip.play();

            if ( zombieList.length <= 5 ) {
              createAllZombies();
            }
            break;
          }

          for ( let j = 0; j < tankList.length; j++ ) {
            const tank = tankList[ j ];
            if ( tank.bounds.intersectsBounds( zombie.bounds ) ) {
              tank.lifePoints = tank.lifePoints - dt * 2;
            }
            if ( tank.lifePoints < 0 ) {
              tank.visible = false;
              tankList.splice( j, 1 );
              j--;
              tankExplodeClip.play();
            }
          }

          var deadSoldiers = [];
          for ( let j = 0; j < soldierList.length; j++ ) {
            const soldier = soldierList[ j ];
            if ( soldier.bounds.intersectsBounds( zombie.bounds ) ) {
              soldier.life = soldier.life - Math.random() * 3 * dt;

              if ( soldier.life <= 0 ) {
                deadSoldiers.push( soldier );
              }

            }
          }
          for ( let j = 0; j < deadSoldiers.length; j++ ) {
            const deadSoldier = deadSoldiers[ j ];
            this.removeChild( deadSoldier );
            var index = soldierList.indexOf( deadSoldier );
            if ( index >= 0 ) {
              soldierList.splice( index, 1 );
              noClip.play();
            }
            var newZombie = new Image( zombieImage, {
              center: deadSoldier.center,
              scale: 0.3
            } );
            this.addChild( newZombie );
            zombieList.push( newZombie );
          }

          if ( wall.visible ) {
            if ( zombie.right < wall.left + 30 && !overlapsNextRow( zombie ) ) {
              zombie.translate( 4 * Math.random(), 0 );
            }
            if ( zombie.right >= wall.left + 30 ) {
              timeWallHasBeenEaten += dt;

              if ( !zombieHitsWallClip.isPlaying ) {
                zombieHitsWallClip.play();
              }
            }
          }
          else {
            zombie.translate( 2 * Math.random(), 0 );
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
          let vector = missile.target.minus( missile.center ).normalized().times( 10 );

          for ( let i = 0; i < zombieList.length; i++ ) {
            const zombie = zombieList[ i ];
            if ( zombie.bounds.intersectsBounds( missile.bounds ) ) {
              zombie.life = zombie.life - 1;
            }
          }

          missile.center = missile.center.plus( vector );

          if ( missile.center.distance( missile.target ) < 10 ) {
            this.removeChild( missile );
            missileList.splice( y, 1 );
            missileExplodeClip.play();
            y--;
          }
        }

        ///BULLETS
        for ( let y = 0; y < bulletList.length; y++ ) {
          var bullet = bulletList[ y ];
          let vector = bullet.target.minus( bullet.center ).normalized().times( 20 );

          for ( let i = 0; i < zombieList.length; i++ ) {
            const zombie = zombieList[ i ];
            if ( zombie.bounds.intersectsBounds( bullet.bounds ) ) {
              zombie.life = zombie.life - 2 / 5;
            }
          }

          bullet.center = bullet.center.plus( vector );

          if ( bullet.center.distance( bullet.target ) < 10 ) {
            this.removeChild( bullet );
            bulletList.splice( y, 1 );
            y--;
          }
        }
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

  return saveTheTown.register( 'SaveTheTownScreenView', SaveTheTownScreenView );
} );