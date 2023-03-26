import {Bullet} from './bullet.js'
export class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene, { enable: false });

        this.createMultiple({
            frameQuantity: 10,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet,

        });
    }

    fireBullet (x, y, rotation)
    {   
        // console.log('Bullets.fire')
        let bullet = this.getFirstDead(false);
        // console.log(bullet)
        if (bullet)
        {
            bullet.fire(x, y, rotation);
        }
    }
}