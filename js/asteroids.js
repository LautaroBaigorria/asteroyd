import {Asteroid} from './asteroid.js';
export class Asteroids extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 4,
            key: 'asteroid',
            active: true,
            visible: true,
            classType: Asteroid
        });
    }
    
    resetAsteroidGroup()
    {
        this.createMultiple({
            frameQuantity: 4,
            key: 'asteroid',
            active: true,
            visible: true,
            classType: Asteroid
        });

    }

    addAsteroids(screenWidth,screenHeight)
    {
        this.children.each((asteroid) => {
            asteroid.asteroidLocation(screenWidth,screenHeight)
            asteroid.asteroidMovement()
        }, this);
    }

    asteroidRotation()
    {
            this.children.each((asteroid) => {
            let asteroidAngle = Phaser.Math.Between(0,2.5)
            asteroid.angle += asteroidAngle
            }, this)
    }
}