import { Menu } from './menu.js'
import { Game } from './game.js'
import { Credits } from './credits.js'
import { Interface } from './interface.js';
import { GameOver } from './gameover.js';

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
    scene: [Menu, Game, Interface, Credits, GameOver ]
}

const game = new Phaser.Game(config)