export class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
        this.x = 1024/2
        this.y = 768/2
    }

    fire (x, y, rotation)
    {
        this.body.reset(x, y);
        this.body.enable = true
        this.setActive(true);
        this.setVisible(true);
        const vec = new Phaser.Math.Vector2()
        // update vector from rotation; not angle
        vec.setToPolar(rotation-(90*Math.PI/180), 10)
        const vx = vec.x * 100
        const vy = vec.y * 100
        this.setVelocity(vx,vy)
        // console.log('Bullet.fire')
    }

    preUpdate (time,delta)
    {
        super.preUpdate(time, delta);
        if (this.x < 1 || this.x > 1024 || this.y < 1 || this.y > 768){
            this.setActive(false);
            this.setVisible(false);
             }
        // this.state -= delta
        // if (this.state <= 0)
        // {
        //     this.disableBody(true,true)
        // } 
    }
}