
export class Interface extends Phaser.Scene {

    constructor () {
        super({ key: 'Interface' });
    }

    init(data) {
        // Used to prepare data
    }

    preload() {
        // Used for preloading assets into your scene, such as
        // • images
        // • sounds
    }

    create(data) {
        // Used to add objects to your game
        this.text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });
        this.text2 = this.add.text(10, 30, '', { font: '16px Courier', fill: '#00ff00' });
        this.text3 = this.add.text(10, 50, '', { font: '16px Courier', fill: '#00ff00' });
        this.text4 = this.add.text(10, 70, '', { font: '16px Courier', fill: '#00ff00' });
        this.text5 = this.add.text(10, 90, '', { font: '16px Courier', fill: '#00ff00' });
        this.text6 = this.add.text(10, 110, '', { font: '16px Courier', fill: '#00ff00' });
        this.text7 = this.add.text(10, 130, '', { font: '16px Courier', fill: '#00ff00' });
        this.text8 = this.add.text(10, 150, '', { font: '16px Courier', fill: '#00ff00' });
        this.text9 = this.add.text(10, 170, 'Pause', { font: '16px Courier', fill: '#00ff00' });
        this.text9.setInteractive();
        this.text9.on('pointerdown', () => { if (this.scene.isPaused('Game')){ this.scene.resume('Game'); console.log('pausa desactivada')}
                                            else {this.scene.pause('Game');  console.log('pausa activada') } 
        });
        
        this.scene.get('Game').events.on('updateUI', (data)=>{this.bodySpeed = data.bodySpeed  
            this.text.setText('Speed: '+ data.bodySpeed)
            this.text2.setText('Angle: ' + data.playerAngle);
            this.text3.setText('this.player.rotation: ' + data.playerRotation);
            this.text4.setText('Lives: ' + data.playerLives);
            this.text5.setText('Asteroids: ' + data.totalAsteroids )
            this.text6.setText('Bullets: ' + data.bullets)
            this.text7.setText('Score: ' + data.score)
            this.text8.setText('Wave: ' + data.wave)
        });

        }

    update(time, delta) {
        // Used to update your game. This function runs constantly
        
    }

    
}

