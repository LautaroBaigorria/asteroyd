import {MediumAsteroid} from './mediumAsteroid.js';
export class MediumAsteroidsGroup extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene, { enable: false });
        
        this.createMultiple({
            frameQuantity: 8,
            key: 'asteroid2',
            active: false,
            visible: false,
            classType: MediumAsteroid
        });
    }
    
    resetAsteroidGroup()
    {
        this.createMultiple({
            frameQuantity: 8,
            key: 'asteroid2',
            active: false,
            visible: false,
            classType: MediumAsteroid
        });

    }

    addAsteroids(posX,posY,quantity)
    {
        for (let i=quantity;  i >0  ; i--) 
        {
            let mediumAsteroid = this.getFirstDead(false);
            if (mediumAsteroid)
            {
                mediumAsteroid.spawn(posX, posY);
            }
            
        }
        
    }

    asteroidRotation()
    {
            this.children.each((asteroid) => {
            let asteroidAngle = Phaser.Math.Between(0,2.5)
            asteroid.angle += asteroidAngle
            }, this)
    }
}