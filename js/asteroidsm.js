import {AsteroidM} from './asteroidm.js';
export class AsteroidsM extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 8,
            key: 'asteroid2',
            active: false,
            visible: false,
            classType: AsteroidM
        });
    }
    
    resetAsteroidGroup()
    {
        this.createMultiple({
            frameQuantity: 8,
            key: 'asteroid2',
            active: false,
            visible: false,
            classType: AsteroidM
        });

    }

    addAsteroids(posX,posY,quantity)
    {
        
        
        for (let i=quantity;  i >0  ; i--) 
        {
            let asteroidm = this.getFirstDead(false);
            if (asteroidm)
            {
                asteroidm.spawn(posX, posY);
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