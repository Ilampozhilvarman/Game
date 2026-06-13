let sizes = {
    width: 800,
    height: 600
}
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
     physics: {
         default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {

}

function create() {
    this.square = this.add.rectangle(400, 300, 50, 50, 0x00ff00);
    this.physics.add.existing(this.square);
    this.square.body.setCollideWorldBounds(true);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update() {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        this.square.body.setVelocityY(-250);
    }
}