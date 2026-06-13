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
            gravity: { y: 300 },
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
    let square = this.add.rectangle(400, 300, 50, 50, 0x00ff00);
    this.physics.add.existing(square);
    square.body.setCollideWorldBounds(true);
    square.body.setBounce(0.2);
    square.body.setVelocity(200, 150);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update() {
    if (this.spacebar.isDown) {
        square.body.setVelocityY(-300);
    }
}