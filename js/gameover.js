export class GameOver extends Phaser.Scene {

    constructor () {
        super({ key: 'GameOver' });
    }

    init() {
        
        this.gameScene = this.scene.get('Game')
        this.uiScene = this.scene.get('Interface')

    }

    preload() {
        // Used for preloading assets into your scene, such as
        // • images
        // • sounds

    }

    create(data) {
        // Used to add objects to your game
        this.text = this.add.text(512, 384, 'GAME OVER', { font: '16px Courier', fill: '#00ff00' });
        this.text1 = this.add.text(512, 344, `Score:  ${data.score}`, { font: '16px Courier', fill: '#00ff00' });
        this.text2 = this.add.text(512, 364, `Wave: ${data.wave}`, { font: '16px Courier', fill: '#00ff00' });        
        
        const restartButton = this.add.text(512, 404, 'Restart Game', { fill: '#0f0' });
        restartButton.setInteractive();
        restartButton.on('pointerdown', () => { this.scene.stop(), this.gameScene.scene.restart() ; this.uiScene.scene.restart()  });
        
    
    }

    update(time, delta) {
        // Used to update your game. This function runs constantly
    }
}

