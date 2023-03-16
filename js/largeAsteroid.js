export class LargeAsteroid extends Phaser.Physics.Arcade.Sprite 
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'asteroid');
        this.enable = true
        this.setActive(true);
        this.setVisible(true);
    }

    asteroidLocation(screenWidth,screenHeight)
    {
        
            this.x = Phaser.Math.Between(0,screenWidth)
            this.y = Phaser.Math.Between(0,screenHeight)
            const body = this.body
            body.updateFromGameObject()     
        
    }

    asteroidMovement()
    {
            const vec = new Phaser.Math.Vector2()
            vec.setToPolar(Phaser.Math.Between(0,6.28)-(90*Math.PI/180), 10)
            const asteroidSpeed = Phaser.Math.Between(5,20)
            const vx = vec.x * asteroidSpeed 
            const vy = vec.y * asteroidSpeed
            this.setVelocity(vx,vy)
       
    }
}