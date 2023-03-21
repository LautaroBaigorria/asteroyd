export class Credits extends Phaser.Scene {

    constructor () {
        super({ key: 'Credits' });
    }

    init() {
        // Used to prepare data
    }

    preload() {
        // Used for preloading assets into your scene, such as
        // • images
        // • sounds
    }

    create(data) {
        // Used to add objects to your game
        this.text = this.add.text(10, 10, 'Coding & Assets: Lautaro Baigorria lautarobaigorria@yahoo.com.ar', { font: '16px Courier', fill: '#00ff00' });
        this.text = this.add.text(10, 30, 'Soundtrack:      Luis Angel Duran angeluthier@hotmail.com', { font: '16px Courier', fill: '#00ff00' });
        this.text = this.add.text(10, 50, 'Sound Effects:   Created/distributed by Kenney (www.kenney.nl)', { font: '16px Courier', fill: '#00ff00' });
        const menuButton = this.add.text(10, 70, 'Return to menu', { fill: '#0f0' });
        menuButton.setInteractive();
        menuButton.on('pointerdown', () => { this.scene.start('Menu'); });
        
    }

    update(time, delta) {
        // Used to update your game. This function runs constantly
    }
}

