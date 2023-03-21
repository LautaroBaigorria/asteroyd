export class Menu extends Phaser.Scene {

    constructor () {
        super({ key: 'Menu' });
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

        const startButton = this.add.text(100, 100, 'Start Game', { fill: '#0f0' });
        startButton.setInteractive();
        startButton.on('pointerdown', () => { this.scene.start('Game'); this.scene.start('Interface');  });
        const creditsButton = this.add.text(100, 120, 'Credits', { fill: '#0f0' });
        creditsButton.setInteractive();
        creditsButton.on('pointerdown', () => { this.scene.start('Credits'); });
    }

    update(time, delta) {
        // Used to update your game. This function runs constantly
    }
}

