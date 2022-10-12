//  TODO
//  animaciones destruccion de nave y asteroides
//  nuevos sprites para asteroides L, M, S y plato volador
//  colisiones con asteroides > asteroides mas chicos (grande-mediano-chico)
//  wraparound para bullets <---HECHO--->
//  sonidos
//  musica
//  puntaje <---HECHO--->
//  reseteo de la escena tras destruir todos los asteroides <---HECHO--->
//  intervalo entre disparos <---HECHO--->
//  plato volador aleatorio que dispara
//  resetear player tras perder una vida con invulnerabilidad temporaria
//  evento de gameover y reseteo de escena
//  vectores aleatorios para los asteroides <---HECHO--->
//  class Asteroid extend Phaser.Physics.Arcade.Sprite
//  class AsteroidS extend Phaser.Physics.Arcade.Group
//  disparo con problemas : consultar en internet <---HECHO--->
//  multiples escenas (creditos, menu principal, juego)
//  resolver modelo de colision para asteroidM << IMPORTANTE >>
//  el tama;o de ventana debe ser tama;o del dispositivo - 5px (window.innerHeight -5)
//  separar el codigo en archivos <---HECHO--->
//  version para escritorio  
//  version para moviles 
//  despliegue en un sitio web 

import {Asteroids} from './asteroids.js';
import {AsteroidsM} from './asteroidsm.js';
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
        this.asteroids

	}

preload ()
{

    this.loadImages()
    this.loadKeys()


}

create ()
{
    
    this.add.image(this.screenWidth/2,this.screenHeight/2,'nightsky')
    this.asteroids = new Asteroids(this)
    this.asteroidsm = new AsteroidsM(this)
    this.asteroids.addAsteroids(this.screenWidth,this.screenHeight)
    this.addPlayer()
    this.bullets = new Bullets(this);
    this.addColliders()
    this.addTexts()
    this.addAnimations()

    
}

update (time)
{

    this.updateKeys(time)
    this.updateTexts()
    this.physics.world.wrap(this.player, 32);
    this.physics.world.wrap(this.asteroids, 32);
    this.asteroids.asteroidRotation()
    // this.physics.world.wrap(this.bullets, 32) //regular duracion

}




loadImages()
    {
    this.load.image('nightsky','assets/sky.png')
    // this.load.image('ship','assets/ship.png')
    this.load.image('asteroid','assets/asteroid.png')
    this.load.image('asteroid2','assets/asteroid2.png')
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


addPlayer()
    {
        this.player = this.physics.add.sprite(this.screenWidth/2,this.screenHeight/2,'ship');
        this.player.setDamping(true);
        this.player.setDrag(0.99);
        this.player.setMaxVelocity(200);
    }

addColliders()
    {
        this.physics.add.collider(this.player, this.asteroids, (player)=> {
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
    
        this.physics.add.collider(this.asteroids, this.asteroids)

        this.physics.add.collider(this.asteroids, this.bullets, (asteroid,bullet)=>{
            asteroid.destroy()
            bullet.setActive(false);
            bullet.setVisible(false);
            bullet.body.enable = false
            console.log(asteroid.x)
            console.log(asteroid.y)

            this.asteroidsm.addAsteroids(asteroid.x,asteroid.y)
            this.score+=50
            if (this.asteroids.getLength()==0) {
                setTimeout(() => {
                    this.asteroids.resetAsteroidGroup()
                    this.asteroids.addAsteroids(this.screenWidth,this.screenHeight)
                    this.addColliders()
                    this.wave++
                }, 1500);
            }
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
       
    //    if (this.space.isDown) //if no funciona como deberia chequear statement
       if(Phaser.Input.Keyboard.JustDown(this.space)) 
       {
        this.bullets.fireBullet(this.player.x,this.player.y,this.player.rotation)
        this.bulletsFired ++
        // console.log(`this.bulletsFired: ${this.bulletsFired}`)
        // console.log(`bullets fired: ${this.bulletsFired}`)
        }
        
        // if (this.shift.isDown)
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
        this.text5.setText('Asteroids: ' + this.asteroids.getLength())
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
        debug: true
    },
    scene: Game
}

const game = new Phaser.Game(config)