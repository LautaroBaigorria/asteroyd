import { AsteroidSmall } from "./asteroidSmall.js";
export class AsteroidsSmall extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 32,
            key: 'asteroid3',
            active: false,
            visible: false,
            classType: AsteroidSmall
        });
    }
    
    resetAsteroidGroup()
    {
        this.createMultiple({
            frameQuantity: 32,
            key: 'asteroid3',
            active: false,
            visible: false,
            classType: AsteroidSmall
        });

    }

    addAsteroids(posX,posY,quantity)
    {
        
        
        for (let i=quantity;  i >0  ; i--) 
        {
            let asteroidSmall = this.getFirstDead(false);
            if (asteroidSmall)
            {
                asteroidSmall.spawn(posX, posY);
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