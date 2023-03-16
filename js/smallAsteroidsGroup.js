import { SmallAsteroid } from "./smallAsteroid.js";
export class SmallAsteroidsGroup extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene, { enable: false });

        this.createMultiple({
            frameQuantity: 32,
            key: 'asteroid3',
            active: false,
            visible: false,
            classType: SmallAsteroid
        });
    }
    
    resetAsteroidGroup()
    {
        this.createMultiple({
            frameQuantity: 32,
            key: 'asteroid3',
            active: false,
            visible: false,
            classType: SmallAsteroid
        });

    }

    addAsteroids(posX,posY,quantity)
    {
        
        for (let i=quantity;  i >0  ; i--) 
        {
            let smallAsteroid = this.getFirstDead(false);
            if (smallAsteroid)
            {
                smallAsteroid.spawn(posX, posY);
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