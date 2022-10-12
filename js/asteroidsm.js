import {AsteroidM} from './asteroidm.js';
export class AsteroidsM extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 2,
            key: 'asteroid2',
            active: true,
            visible: true,
            classType: AsteroidM
        });
    }
    
    resetAsteroidGroup()
    {
        this.createMultiple({
            frameQuantity: 2,
            key: 'asteroid2',
            active: true,
            visible: true,
            classType: AsteroidM
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