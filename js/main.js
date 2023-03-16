
import { LargeAsteroidsGroup } from './largeAsteroidsGroup.js';
import { MediumAsteroidsGroup } from './mediumAsteroidsGroup.js';
import { SmallAsteroidsGroup } from './smallAsteroidsGroup.js';
import {Bullets} from './bullets.js';

class Game extends Phaser.Scene
{
    constructor() {
		super();
		this.player
        this.bullet
        this.bullets
        this.bulletsFired = 0
        this.lives = 4
        this.keyA,this.keyD,this.space,this.shift
        this.gameOver = false
        this.lastFired = 0
        this.score = 0
        this.screenWidth = 1024
        this.screenHeight = 768 
        this.wave = 1
        this.largeAsteroidsGroup

	}

preload ()
{

    this.loadImages()
    this.loadKeys()
    this.loadAudio()
    this.load.spritesheet('explosion', 'assets/explosion-spritesheet.png', {
        frameWidth: 64,
        frameHeight: 64
      });

}

create ()
{
    
    this.add.image(this.screenWidth/2,this.screenHeight/2,'nightsky')
    this.largeAsteroidsGroup = new LargeAsteroidsGroup(this)
    this.mediumAsteroidsGroup = new MediumAsteroidsGroup(this)
    this.smallAsteroidGroup = new SmallAsteroidsGroup(this)
    this.largeAsteroidsGroup.addAsteroids(this.screenWidth,this.screenHeight)
    this.addPlayer()
    this.bullets = new Bullets(this);
    this.addColliders()
    this.addTexts()
    this.addAnimations()
    let soundtrack = this.sound.add('soundtrack');
    this.laserSmall = this.sound.add('laserSmall')

        soundtrack.play({
            loop: true
        });

    
    
}

update (time)
{

    this.updateKeys(time)
    this.updateTexts()
    this.physics.world.wrap(this.player, 16);
    this.physics.world.wrap(this.largeAsteroidsGroup, 16);
    this.physics.world.wrap(this.mediumAsteroidsGroup, 16);
    this.physics.world.wrap(this.smallAsteroidGroup, 16);
    this.largeAsteroidsGroup.asteroidRotation()
    this.mediumAsteroidsGroup.asteroidRotation()
    this.smallAsteroidGroup.asteroidRotation()

}




loadImages()
    {
    this.load.image('nightsky','assets/sky.png')
    this.load.image('asteroid','assets/asteroid.png')
    this.load.image('asteroid2','assets/asteroid2.png')
    this.load.image('asteroid3','assets/asteroid3.png')
    this.load.image('bullet','assets/bullet.png')
    this.load.spritesheet('ship', 'assets/ship_animation2.png',{ frameWidth: 48, frameHeight: 48 })
    }

loadKeys()
    {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    }

loadAudio()
    {
        this.load.audio('soundtrack',['assets/estees.ogg','assets/estees.mp3'])
        this.load.audio('laserSmall', 'assets/laserSmall_002.ogg');
    }

addPlayer()
    {
        this.player = this.physics.add.sprite(this.screenWidth/2,this.screenHeight/2,'ship');
        this.player.setDamping(true);
        this.player.setDrag(0.99);
        this.player.setMaxVelocity(200);
    }

addColliders()
    {
        this.physics.add.collider(this.player, this.largeAsteroidsGroup, (player)=> {
            player.setActive(false).setVisible(false)
            this.lives -= 1
            if (this.lives==0) {
                this.gameOver = true
            }
            setTimeout(()=>{
                player.angle = 0
                player.setVelocity(0, 0);
                player.setX(this.screenWidth/2);
                player.setY(this.screenHeight/2);
                player.setActive(true).setVisible(true)
            }, 1000)
        },null,this)
    
        this.physics.add.collider(this.player, this.mediumAsteroidsGroup, (player)=> {
            player.setActive(false).setVisible(false)
            this.lives -= 1
            if (this.lives==0) {
                this.gameOver = true
            }
            setTimeout(()=>{
                player.angle = 0
                player.setVelocity(0, 0);
                player.setX(this.screenWidth/2);
                player.setY(this.screenHeight/2);
                player.setActive(true).setVisible(true)
            }, 1000)
        },null,this)

        this.physics.add.collider(this.player, this.smallAsteroidGroup, (player)=> {
            player.setActive(false).setVisible(false)
            this.lives -= 1
            if (this.lives==0) {
                this.gameOver = true
            }
            setTimeout(()=>{
                player.angle = 0
                player.setVelocity(0, 0);
                player.setX(this.screenWidth/2);
                player.setY(this.screenHeight/2);
                player.setActive(true).setVisible(true)
            }, 1000)
        },null,this)

        this.physics.add.collider(this.largeAsteroidsGroup, this.largeAsteroidsGroup)
        this.physics.add.collider(this.mediumAsteroidsGroup, this.largeAsteroidsGroup)
        this.physics.add.collider(this.mediumAsteroidsGroup, this.mediumAsteroidsGroup)
        this.physics.add.collider(this.smallAsteroidGroup, this.smallAsteroidGroup)
        this.physics.add.collider(this.smallAsteroidGroup, this.mediumAsteroidsGroup)
        this.physics.add.collider(this.smallAsteroidGroup, this.largeAsteroidsGroup)

        this.physics.add.collider(this.largeAsteroidsGroup, this.bullets, (asteroid,bullet)=>{
            asteroid.destroy()
            this.boom.setPosition(asteroid.x, asteroid.y);
            this.boom.setVisible(true);
            this.boom.play('explosion-start');
            this.mediumAsteroidsGroup.addAsteroids(asteroid.x, asteroid.y,2);
            bullet.setActive(false);
            bullet.setVisible(false);
            bullet.body.enable = false
            console.log(asteroid.x)
            console.log(asteroid.y)
            this.score+=50
            this.checkIfAllAsteroidsDestroyed()
        },null,this)

        this.physics.add.collider(this.mediumAsteroidsGroup, this.bullets, (asteroidm,bullet)=>{
            asteroidm.destroy()
            this.boom.setPosition(asteroidm.x, asteroidm.y);
            this.boom.setVisible(true);
            this.boom.play('explosion-start');
            this.smallAsteroidGroup.addAsteroids(asteroidm.x, asteroidm.y,4);
            bullet.setActive(false);
            bullet.setVisible(false);
            bullet.body.enable = false
            console.log(asteroidm.x)
            console.log(asteroidm.y)
            this.score+=25
            this.checkIfAllAsteroidsDestroyed()
            },null,this)

        this.physics.add.collider(this.smallAsteroidGroup, this.bullets, (asteroidSmall,bullet)=>{
            asteroidSmall.destroy()
            this.boom.setPosition(asteroidSmall.x, asteroidSmall.y);
            this.boom.setVisible(true);
            this.boom.play('explosion-start');
            bullet.setActive(false);
            bullet.setVisible(false);
            bullet.body.enable = false
            console.log(asteroidSmall.x)
            console.log(asteroidSmall.y)
            this.score+=12.5
            this.checkIfAllAsteroidsDestroyed()
            },null,this)
        
    }

addTexts()
    {
        this.text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });
        this.text2 = this.add.text(10, 30, '', { font: '16px Courier', fill: '#00ff00' });
        this.text3 = this.add.text(10, 50, '', { font: '16px Courier', fill: '#00ff00' });
        this.text4 = this.add.text(10, 70, '', { font: '16px Courier', fill: '#00ff00' });
        this.text5 = this.add.text(10, 90, '', { font: '16px Courier', fill: '#00ff00' });
        this.text6 = this.add.text(10, 110, '', { font: '16px Courier', fill: '#00ff00' });
        this.text7 = this.add.text(10, 130, '', { font: '16px Courier', fill: '#00ff00' });
        this.text8 = this.add.text(10, 150, '', { font: '16px Courier', fill: '#00ff00' });

    }

updateKeys(time)
    {
        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.player.rotation-(90*Math.PI/180),100, this.player.body.acceleration)
            this.player.play('thrust',true)
            this.player.anims.stopAfterRepeat(3);

        }
        else{
            this.player.setAcceleration(0)
        }
    
        if (this.cursors.down.isDown) {
            this.physics.velocityFromRotation(this.player.rotation-(270*Math.PI/180),100, this.player.body.acceleration)
            
        }
        
    
        if (this.cursors.left.isDown)
        {
            this.player.angle -= 4
        }
        else if (this.cursors.right.isDown)
        {
            this.player.angle += 4
        }
    
       if (this.keyA.isDown) {
        this.physics.velocityFromRotation(this.player.rotation-(180*Math.PI/180),100, this.player.body.acceleration)
       }
       
       if (this.keyD.isDown) {
        this.physics.velocityFromRotation(this.player.rotation-(0*Math.PI/180),100, this.player.body.acceleration)
       }
       
       if(Phaser.Input.Keyboard.JustDown(this.space)) 
       {
        this.laserSmall.play()
        this.bullets.fireBullet(this.player.x,this.player.y,this.player.rotation)
        this.bulletsFired ++

        }
        
        if(Phaser.Input.Keyboard.JustDown(this.shift)) 
        {
        this.warp()
        }
    
    }

updateTexts()
    {
        this.text.setText('Speed: ' + this.player.body.speed);
        this.text2.setText('Angle: ' + this.player.angle);
        this.text3.setText('this.player.rotation: ' + this.player.rotation);
        this.text4.setText('Lives: ' + this.lives);
        let totalAsteroids = this.largeAsteroidsGroup.getLength() + this.mediumAsteroidsGroup.getLength() + this.smallAsteroidGroup.getLength()
        this.text5.setText('Asteroids: ' + totalAsteroids )
        this.text6.setText('Bullets: ' + this.bullets.getLength())
        this.text7.setText('Score: ' + this.score)
        this.text8.setText('Wave: ' + this.wave)
    }

warp()
    {
        this.player.x = Phaser.Math.Between(0,this.screenWidth)
        this.player.y = Phaser.Math.Between(0,this.screenHeight)
    }

addAnimations()
    {
        this.anims.create({
            key: 'thrust',
            frames: this.anims.generateFrameNumbers('ship', { frames: [2, 1, 0] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('ship', { frames: [ 1, 2] }),
            frameRate: 8,
            repeat: 1
        });

        this.boom = this.physics.add.sprite(100, 100, 'explosion');
        this.boom.setScale(1);
        this.boom.setVisible(false);
        this.boom.on('animationcomplete', () => {
        this.boom.setVisible(false);
      })
        
        this.anims.create({
            key: 'explosion-start',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 4
            }),
            repeat: 0,
            frameRate: 16
            });

    } 
    
checkIfAllAsteroidsDestroyed(){
    if (this.largeAsteroidsGroup.getLength()==0 && this.mediumAsteroidsGroup.getLength()==0 && this.smallAsteroidGroup.getLength()==0) {
        setTimeout(() => {
            this.largeAsteroidsGroup.resetAsteroidGroup()
            this.mediumAsteroidsGroup.resetAsteroidGroup()
            this.smallAsteroidGroup.resetAsteroidGroup()
            this.largeAsteroidsGroup.addAsteroids(this.screenWidth,this.screenHeight)
            this.addColliders()
            this.wave++
        }, 1500);
    }
}

}

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity:
            {y: 0}
        },
    },
    scene: [Game]
}

const game = new Phaser.Game(config)