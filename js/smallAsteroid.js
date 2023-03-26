export class SmallAsteroid extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'asteroid3');
        this.enable = false
        this.setActive(false);
        this.setVisible(false);
        this.x = 0
        this.y = 200
    }

    spawn(x,y)
    {
        this.body.enable = true;
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.asteroidMovement();
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